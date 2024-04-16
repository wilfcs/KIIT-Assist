# from flask import Flask, request, jsonify
# from kiit_model import KiitModel  

# app = Flask(__name__)
# kiit_model = KiitModel()  # Initialize your model

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get user input message from the request
#     user_input = request.json.get('message')

#     # Use your model to make predictions
#     predicted_label = kiit_model.predict(user_input)

#     # Return the predicted label
#     return jsonify({'predicted_label': predicted_label})

# if __name__ == '__main__':
#     app.run(debug=True)

# from flask import Flask, request, jsonify
# from kiit_model import KiitModel  

# app = Flask(__name__)
# kiit_model = KiitModel()  # Initialize your model

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get user input message from the request
#     user_input = request.json.get('message')

#     # Use your model to make predictions
#     predicted_label = kiit_model.predict(user_input)

#     # Return the predicted label
#     return jsonify({'predicted_label': predicted_label})

# if __name__ == '__main__':
#     app.run(debug=True)



# from flask import Flask, request, jsonify
# from kiit_model import KiitModel  
# import joblib

# app = Flask(__name__)
# kiit_model = KiitModel()  # Initialize your model

# # Load LabelEncoder
# label_encoder = joblib.load('label_encoder.pkl')

# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get user input message from the request
#     user_input = request.json.get('message')

#     # Use your model to make predictions
#     predicted_label = kiit_model.predict(user_input)

#     # Return the predicted label
#     return jsonify({'predicted_label': predicted_label})

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, request, jsonify
from kiit_model import KiitModel

app = Flask(__name__)
kiit_model = KiitModel()

@app.route('/predict', methods=['POST'])
def predict():
    # Get user input message from the request
    user_input = request.json.get('message')

    # Use your model to make predictions and get the answer
    answer = kiit_model.predict(user_input)

    # Return the answer
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)