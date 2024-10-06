from jinja2 import StrictUndefined
from flask import Flask, jsonify, request 
from openai import OpenAI

import os
from drone_data import drone_data

app = Flask(__name__)
client = OpenAI()

app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route("/api/query", methods=["POST"])
def query():
    data = request.json
    query = data.get("query", "")
    
    if not query:
        return jsonify({"error": "Query not provided"}), 400

    try:
        prompt = f"""
        Here is some drone data from multiple images:
        
        {drone_data}

        Based on this data, answer the following question: {query}
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
              {"role": "user", "content": prompt},   
            ],
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0
        )
        ai_response = response.choices[0].message.content
        return jsonify({"response": ai_response})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
    
 


if __name__ == "__main__":
    app.run(debug=True)