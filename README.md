# Quiz Whiz
Takes a URL and makes a quiz!

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