****DroneDeploy Drone Data Application****

This is a web app that displays drone data and lets users ask questions about it using AI.

**How to Run the App Locally**


Make sure you have the following installed:

 - Python 3.x
 - Node.js (for the frontend)
 - npm
 - OpenApi API Key

**Backend (Flask)**
1. Navigate to the backend folder (where server.py is).
2. Create a virtual environment (optional but recommended):
   
`python3 -m venv venv
source venv/bin/activate   # On macOS/Linux`

`venv\Scripts\activate      # On Windows`

3. Install dependencies:
   
`pip install -r requirements.txt`

4. Start the backend:

   `OPENAI_API_KEY="your-openai-api-key" python server.py`


**Frontend (React)**
1. Navigate to the frontend folder.
2. Install dependencies:

   `npm install`

3. Start the frontend:

   `npm start`








