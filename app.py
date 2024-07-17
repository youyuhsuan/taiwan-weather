from fastapi import FastAPI, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from model.getWeatherWeek import getWeatherWeek
from model.getWeatherThreeDays import getWeatherThreeDays
from model.getTemperature import getTemperature
from model.getHumidity import getHumidity
from model.trigger_discord import triggerDiscord
from dotenv import load_dotenv
import os

app = FastAPI()

app.mount("/static", StaticFiles(directory="static", html=True))

load_dotenv()
CWB_API_KEY = os.getenv("CWB_API_KEY")


@app.get("/")
async def index():
    return FileResponse("./static/index.html", media_type="text/html")


@app.get("/weather/week/{location}")
async def get_weather_week(location: str):
    result = getWeatherWeek(CWB_API_KEY, location)
    return result


@app.get("/weather/threeDays/{location}")
async def get_weather_threeDays(location: str):
    result = getWeatherThreeDays(CWB_API_KEY, location)
    return result


@app.get("/weather/temperature")
async def get_temperature():
    result = getTemperature(CWB_API_KEY)
    return result


@app.get("/weather/humidity")
async def get_humidity():
    result = getHumidity(CWB_API_KEY)
    return result


@app.get("/trigger/discord")
async def trigger_discord():
    result = triggerDiscord()
    return result

@app.get("/weather/{location}")
async def get_weather(location:str):
    result = getWeather(CWB_API_KEY, location)
    return result