from fastapi import FastAPI
from pydantic import BaseModel
from quiz_maker import generate_quiz, normalize_quiz
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://quizwhizllm.netlify.app/"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 
 
class QuizRequest(BaseModel):
    url: str
    topic: str
     
@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/generate-quiz")
async def create_quiz(data: QuizRequest):
    quiz_json = await generate_quiz(data.url, data.topic)
    return normalize_quiz(quiz_json)