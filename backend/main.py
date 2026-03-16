from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from calculations import cnc_calculations

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (good for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/calculate")
def calculate(diameter: float, rpm: float, feed: float, length: float, doc: float, nose_radius: float):

    result = cnc_calculations(diameter, rpm, feed, length, doc, nose_radius)

    return result