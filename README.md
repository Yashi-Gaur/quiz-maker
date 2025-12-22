# Quiz Whiz

Turn any webpage into an interactive quiz using AI.

**Live Demo:** https://quizwhizllm.netlify.app/

---

## What is QuizWhiz?

QuizWhiz is a full-stack web app that generates quizzes from any public webpage.
Just paste a URL, optionally choose a topic, and QuizWhiz creates a 10-question
multiple-choice quiz using AI — complete with scoring and results visualization.

This project was built end-to-end to explore:
- AI-assisted content generation
- Web scraping (static + JS-rendered pages)
- Modern frontend UX
- Real-world deployment challenges (CORS, env vars, cloud hosting)

---

## Features

- Generate quizzes from **any URL**
- Optional topic-based quiz focus
- AI-generated questions & answers
- Progress bar and score donut chart
- Clean dark UI with Material UI
- Fast, responsive UX

---

## Tech Stack

### Frontend
- React + TypeScript
- Vite
- Material UI (MUI)
- MUI X Charts
- React Router

### Backend
- Python
- FastAPI
- Uvicorn
- OpenAI API
- BeautifulSoup + Requests
- Playwright (for JS-rendered pages)

### Deployment
- Frontend: Netlify
- Backend: Render

---

## How it works

1. User enters a webpage URL and optional topic
2. Backend scrapes the webpage:
   - Tries static HTML first
   - Falls back to Playwright for JS-rendered pages
3. Cleaned content is sent to the OpenAI API
4. AI returns a structured quiz in JSON format
5. Frontend renders the quiz, tracks answers, and calculates score

---

# Installation 
## Backend
### First install uv
curl -LsSf https://astral.sh/uv/install.sh | sh
### Check if it exists 
uv --version

### Create virtual environment
uv venv
### Activate virtual environment
source .venv/bin/activate

### Install dependencies
cd quiz-maker-backend
uv pip install -r requirements.txt

### Run Backend
uvicorn main:app --reload

## Frontend
### Install dependencies
npm install

### Run frontend
npm run dev