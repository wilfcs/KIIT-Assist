import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification, AdamW
from torch.utils.data import DataLoader, Dataset
import torch
from tqdm import tqdm
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
import joblib

class KiitModel:
    def __init__(self):
        # Load your dataset
        merged_df = pd.read_csv('Custom GPT for KIIT - Sheet1 (1).csv')

        text_column = 'User_Input'
        label_column = 'Label'

        # Split the data into training and testing sets
        train_df, test_df = train_test_split(merged_df, test_size=0.2, random_state=42)

        class CustomDataset(Dataset):
            def __init__(self, texts, labels):
                self.texts = texts
                self.labels = labels

            def __len__(self):
                return len(self.texts)

            def __getitem__(self, idx):
                return {'text': self.texts[idx], 'label': torch.LongTensor([self.labels[idx]])}

        # Tokenize and encode the text data using DistilBERT tokenizer
        tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
        train_encodings = tokenizer(train_df[text_column].tolist(), return_tensors='pt', padding=True, truncation=True, max_length=512)
        test_encodings = tokenizer(test_df[text_column].tolist(), return_tensors='pt', padding=True, truncation=True, max_length=512)

        # Create DataLoader for training and testing
        self.label_encoder = LabelEncoder()
        all_labels = train_df[label_column].tolist() + test_df[label_column].tolist()
        self.label_encoder.fit(all_labels)

        train_labels = self.label_encoder.transform(train_df[label_column].tolist())
        test_labels = self.label_encoder.transform(test_df[label_column].tolist())

        train_dataset = CustomDataset(train_encodings['input_ids'], torch.tensor(train_labels))
        test_dataset = CustomDataset(test_encodings['input_ids'], torch.tensor(test_labels))

        train_loader = DataLoader(train_dataset, batch_size=8, shuffle=True)
        test_loader = DataLoader(test_dataset, batch_size=8, shuffle=False)

        # Load pre-trained DistilBERT model for sequence classification
        self.model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=len(self.label_encoder.classes_))
        optimizer = AdamW(self.model.parameters(), lr=5e-5)  # Experiment with learning rate

        # Fine-tune the model with early stopping
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(device)

        num_epochs = 10
        patience = 3  # early stopping patience
        accuracy_history = []

        for epoch in range(num_epochs):
            self.model.train()
            for batch in tqdm(train_loader, desc=f'Epoch {epoch}'):
                inputs = batch['text'].to(device)
                labels = batch['label'].to(device)
                optimizer.zero_grad()

                outputs = self.model(inputs, labels=labels)

                loss = outputs.loss
                loss.backward()
                optimizer.step()

            # Evaluate the model
            self.model.eval()
            all_preds = []
            all_labels = []
            for batch in tqdm(test_loader, desc='Evaluating'):
                inputs = batch['text'].to(device)
                labels = batch['label'].to(device)
                with torch.no_grad():
                    outputs = self.model(inputs, labels=labels)

                logits = outputs.logits
                preds = torch.argmax(logits, dim=1).cpu().numpy()
                all_preds.extend(preds)
                all_labels.extend(labels.cpu().numpy())

            # Calculate accuracy
            accuracy = accuracy_score(all_labels, all_preds)
            print(f'Accuracy after Epoch {epoch + 1}: {accuracy}')

        # Save LabelEncoder
        self.save_label_encoder(self.label_encoder, 'label_encoder.pkl')

        # Load the label to answer mapping
        self.label_to_answer = self.load_label_to_answer('Custom GPT for KIIT - Sheet1 (1).csv')

    def predict(self, text):
        # Tokenize and encode the user input
        tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
        inputs = tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=512)

        # Forward pass through the model
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        inputs = inputs.to(device)
        self.model.eval()
        with torch.no_grad():
            outputs = self.model(**inputs)

        # Get predicted label
        predicted_label_index = torch.argmax(outputs.logits, dim=1).item()

        # Convert predicted label index back to original label
        predicted_label = self.label_encoder.inverse_transform([predicted_label_index])[0]

        # Get the answer corresponding to the predicted label
        answer = self.label_to_answer.get(predicted_label, 'Sorry, I could not understand your query.')

        return answer

    @staticmethod
    def save_label_encoder(label_encoder, filepath):
        joblib.dump(label_encoder, filepath)

    def load_label_to_answer(self, filepath):
        label_to_answer = {}
        df = pd.read_csv(filepath)
        for _, row in df.iterrows():
            label_to_answer[row['Label']] = row['Desired_Model_Response']
        return label_to_answer