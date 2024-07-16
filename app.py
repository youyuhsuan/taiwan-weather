from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from model.getWeatherWeek import getWeatherWeek
from dotenv import load_dotenv
import os

app = FastAPI()

app.mount('/static', StaticFiles(directory='static', html=True))

# load_dotenv()
# print(os.getenv("CWB_API_KEY"))

@app.get("/")
async def index():
    return FileResponse("./static/index.html", media_type="text/html")

@app.get("/weather/week/{location}")
async def get_weather_week(location: str):
    result = getWeatherWeek(location)
    return result