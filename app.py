from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai
from IPython.display import Markdown as md
import textwrap

# Load environment variables from .env file
load_dotenv()

# Get the Gemini API key from the environment variable
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

app = Flask(__name__)
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

def to_markdown(text):
    text = text.replace('*', '')
    return md(textwrap.indent(text, '> ', predicate=lambda _: True))

# Function to process text using the chatbot
def chatbot_process(text):
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(model_name="gemini-pro")
    prompt = [
    f"""Patient: "I've been experiencing some symptoms lately. {text}."
    Based on these symptoms, could you provide a brief explanation of what I might be going through? Also, please suggest some helpful steps or ways to manage and improve my well-being. 
    You are a Mental Health Professional. Give answer accordingly.
    """,
    ]
    response = model.generate_content(prompt)
    result = to_markdown(response.text)
    return result.data.replace('> ', '')

# Endpoint to receive text and process it through the chatbot
@app.route('/predict/chatbot', methods=['POST'])
def predict_chatbot():
    if 'text' not in request.json:
        print('no text')
        return jsonify({'error': 'No text provided'})

    text = request.json['text']
    print(text)

    # Process text using the chatbot
    response = chatbot_process(text)
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
