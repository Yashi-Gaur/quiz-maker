# # Quiz Maker
# Making a quizmaker using the scraper. This is a test environment where i make and see if it works. Then I'll make it a proper python file.
# imports
import os
from dotenv import load_dotenv
from web_scraper import smart_fetch
from openai import OpenAI

# Load environment variables in a file called .env

load_dotenv(override=True)
api_key = os.getenv('OPENAI_API_KEY')
openai = OpenAI()

# Check the key
if not api_key:
    print("No API key was found - please head over to the troubleshooting notebook in this folder to identify & fix!")
elif not api_key.startswith("sk-proj-"):
    print("An API key was found, but it doesn't start sk-proj-; please check you're using the right key - see troubleshooting notebook")
elif api_key.strip() != api_key:
    print("An API key was found, but it looks like it might have space or tab characters at the start or end - please remove them - see troubleshooting notebook")
else:
    print("API key found and looks good so far!")

# system prompt
quiz_system_prompt = """ 
    You are a quiz maker. You are given the url and contents of a site and a topic. The topic is an optional filed. 
    If the topic is given the quiz has to be based on the topic other wise it should be on the entire contents of the page.
    If the title is not relevent to the contents of the page, make the quiz on the entire content of the page.
    The quiz should be 10 questions long with 4 options with 1 correct answer. The difficulty should be divided as 3 easy, 5 medium and 2 hard.
    You will return the following- the quiz title, the source url, the each question with its option and correct ans in the following format:
    {
        "quiz_title": "Example Quiz Title",
        "url": "https://example.com/source",
        "questions": [
            {
                "id": 1,
                "question": "Which planet is known as the Red Planet?",
                "options": [
                    { "id": 1, "content": "Venus" },
                    { "id": 2, "content": "Mars" },
                    { "id": 3, "content": "Jupiter" },
                    { "id": 4, "content": "Mercury" }
                ],
                "answer": 2
                },
                {
                "id": 2,
                "question": "What is the largest ocean on Earth?",
                "options": [
                    { "id": 1, "content": "Atlantic Ocean" },
                    { "id": 2, "content": "Indian Ocean" },
                    { "id": 3, "content": "Arctic Ocean" },
                    { "id": 4, "content": "Pacific Ocean" }
                ],
                "answer": 4
            }
        ]
    }
"""

# user prompt
async def build_user_prompt(url, topic):
    website_contents = await smart_fetch(url)
    user_prompt = f"""
        For the website {url}, having contents {website_contents},
        Please make a quiz on the topic {topic}. 
        If the topic is not given, make a quiz on the entire contents of the page, not incuding irrelevent things such as Terms of Service, Privacy, email links, etc.
        The quiz should returned in JSON format.
    """
    return user_prompt


async def generate_quiz(url, topic):
    user_prompt = await build_user_prompt(url, topic)
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": quiz_system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        response_format={"type": "json_object"}
    )
    return response.choices[0].message.content
