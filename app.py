from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from model.getWeatherWeek import getWeatherWeek

app = FastAPI()

app.mount('/static', StaticFiles(directory='static', html=True))

@app.get("/")
async def index():
    return FileResponse("./static/index.html", media_type="text/html")

@app.get("/weather/week")
async def get_weather_week():
    result = getWeatherWeek()
    return result