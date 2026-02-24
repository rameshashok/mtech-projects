# Personal Finance Education Assistant

React frontend for the FastAPI backend.

## Deployment

- Backend: https://domain-llm-assistant-assignment-backend.onrender.com
- Frontend: Deployed on Vercel

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on http://localhost:3000 and connect to the backend at http://localhost:8000.

## Usage

1. Start the backend server first
2. Start the frontend development server
3. Open http://localhost:3000 in your browser
4. Ask questions about budgeting, saving, debt management, and financial literacy
