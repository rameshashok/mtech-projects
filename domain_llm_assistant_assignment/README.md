# Personal Finance Education Assistant

A domain-specific LLM assistant that provides educational guidance on personal finance topics including budgeting, saving, debt management, and financial literacy basics.

## Live Demo

- **Frontend**: https://rameshashok-mtech-projects.vercel.app
- **Backend API**: https://domain-llm-assistant-assignment-backend.onrender.com

## Features

- Strict domain boundaries - only answers personal finance education questions
- Refuses out-of-domain queries (investments, crypto, tax, legal advice)
- Clean, modern UI built with React and shadcn/ui
- FastAPI backend with LangChain integration
- Deployed on Vercel (frontend) and Render (backend)

## Tech Stack

### Backend
- FastAPI
- LangChain
- OpenAI/OpenRouter API
- Python 3.x

### Frontend
- React
- Vite
- shadcn/ui
- Tailwind CSS

## Local Development

### Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Create .env file with your API key
echo "OPENAI_API_KEY=your-key-here" > .env
# OR
echo "OPENROUTER_API_KEY=your-key-here" > .env

# Run the server
uvicorn main:app --reload
```

Backend runs on http://localhost:8000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:3000

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set root directory: `domain_llm_assistant_assignment/backend`
4. Add environment variable: `OPENAI_API_KEY` or `OPENROUTER_API_KEY`
5. Deploy

### Frontend (Vercel)
1. Import GitHub repository
2. Set root directory: `domain_llm_assistant_assignment/frontend`
3. Framework: Vite
4. Deploy

## Project Structure

```
domain_llm_assistant_assignment/
├── backend/
│   ├── main.py              # FastAPI app with LangChain
│   ├── requirements.txt     # Python dependencies
│   ├── render.yaml          # Render deployment config
│   └── DEPLOY.md           # Deployment instructions
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── components/ui/  # shadcn/ui components
│   │   └── lib/            # Utilities
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json         # Vercel deployment config
└── README.md
```

## Domain Boundaries

**In-Domain Topics:**
- Budgeting
- Saving strategies
- Debt management
- Emergency funds
- Financial goal setting
- Expense tracking
- Basic financial literacy

**Out-of-Domain (Refused):**
- Investment advice
- Stock market recommendations
- Cryptocurrency
- Tax advice
- Legal advice
- Insurance recommendations
- Real estate investment

## License

MIT
