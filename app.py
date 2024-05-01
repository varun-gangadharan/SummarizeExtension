from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


app = Flask(__name__)
CORS(app)

tokenizer = AutoTokenizer.from_pretrained('model/tokenizer')
model = AutoModelForSeq2SeqLM.from_pretrained('model/summary_model')

@app.route('/summarize', methods=['POST'])
def get_data():
    url = request.get_json()['url']

    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        summary = getSummary(response)
        return jsonify({'summary': summary})
    
    return jsonify({'summary': "Fail to retrieve article"})

def getSummary(response):
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract all text from the body of the page
    text = soup.get_text(separator=' ', strip=True)
    f = open('article_text.txt', 'w', encoding='utf-8')
    f.write(text)
    f.close()

    # generate summary
    inputs = tokenizer.encode(text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs, max_length=200, min_length=50, length_penalty=2.0, num_beams=10, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    
    return summary
if __name__ == '__main__':
    app.run(port=5000)  # Runs the server on localhost:5000
