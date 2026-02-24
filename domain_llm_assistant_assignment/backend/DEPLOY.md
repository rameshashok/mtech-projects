# Deploy to Render

## Steps:

1. Push your code to GitHub (already done)

2. Go to https://render.com and sign in

3. Click "New +" → "Web Service"

4. Connect your GitHub repository: `rameshashok/mtech-projects`

5. Configure:
   - Name: `finance-assistant-api`
   - Root Directory: `domain_llm_assistant_assignment/backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

6. Add Environment Variables:
   - `OPENROUTER_API_KEY` or `OPENAI_API_KEY` with your API key

7. Click "Create Web Service"

Your API will be available at: `https://finance-assistant-api.onrender.com`
