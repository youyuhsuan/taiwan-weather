import urllib.request as req
from urllib.parse import quote
import json
from dotenv import load_dotenv
import os

load_dotenv()

def getWeatherWeek(CWB_API_KEY,location):

    url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY + "&locationName=" + quote(location)

    request = req.Request(url)

    with req.urlopen(request) as response:
        response_body = response.read().decode('utf-8')

    my_data = json.loads(response_body)

    return my_data