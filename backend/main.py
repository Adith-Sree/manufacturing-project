from fastapi import FastAPI
from calculations import machining_time
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow frontend requests
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Manufacturing API is running"}

@app.post("/calculate")
def calculate(speed: float, feed: float, length: float):

    result = machining_time(speed, feed, length)

    return result