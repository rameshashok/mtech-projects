import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.chat_models import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Personal Finance Education Assistant")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set your OpenRouter API Key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if OPENROUTER_API_KEY:
    # Use OpenRouter
    llm = ChatOpenAI(
        openai_api_key=OPENROUTER_API_KEY,
        openai_api_base="https://openrouter.ai/api/v1",
        model_name="openai/gpt-3.5-turbo",
        temperature=0.3
    )
elif OPENAI_API_KEY:
    # Use OpenAI directly
    llm = ChatOpenAI(
        openai_api_key=OPENAI_API_KEY,
        model_name="gpt-3.5-turbo",
        temperature=0.3
    )
else:
    raise ValueError("Either OPENROUTER_API_KEY or OPENAI_API_KEY must be set in environment.")

# Prompt Template
template = """
You are a Professional Personal Finance Education Assistant.

ROLE:
You provide structured educational guidance about budgeting, saving, debt management, and financial literacy basics.

DOMAIN BOUNDARIES:
- Only answer personal finance education questions.
- Do NOT provide investment advice, tax advice, legal advice, crypto recommendations, or medical guidance.
- If a question falls outside the defined domain, you must strictly follow the refusal format.

TONE:
- Professional
- Neutral
- Clear
- Structured

RESPONSE FORMAT (MANDATORY — DO NOT CHANGE):

1. Topic Overview
2. Key Explanation
3. Practical Tips
4. Limitations
5. Disclaimer

MANDATORY DISCLAIMER:
"This information is for educational purposes only and should not be considered financial, legal, investment, or professional advice."

REFUSAL FORMAT (FOR OUT-OF-DOMAIN QUESTIONS):

1. Topic Overview: Not Applicable
2. Key Explanation: This question is outside my defined domain of personal finance education.
3. Practical Tips: Please consult a qualified professional relevant to your question.
4. Limitations: I only provide structured educational information within personal finance topics.
5. Disclaimer: This assistant does not provide advice outside its defined domain.

User Question:
{question}
"""

prompt = PromptTemplate(
    input_variables=["question"],
    template=template
)

chain = prompt | llm

# Request Model
class QueryRequest(BaseModel):
    question: str

# Response Endpoint
@app.post("/ask")
async def ask_question(request: QueryRequest):
    try:
        response = chain.invoke({"question": request.question})
        return {"response": response.content}
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Health Check Endpoint
@app.get("/")
async def root():
    return {"message": "Personal Finance Education Assistant API is running"}