from flask import Flask, request, jsonify
from flask_cors import CORS
from kiit_model import KiitModel

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
kiit_model = KiitModel()

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        # Get user input message from the request
        user_input = request.json.get('message')

        # Use your model to make predictions and get the answer
        answer = kiit_model.predict(user_input)

        # Return the answer
        return jsonify({'answer': answer})
    else:
        # Return a response indicating that the method is not allowed
        return jsonify({'message': 'Method Not Allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)
