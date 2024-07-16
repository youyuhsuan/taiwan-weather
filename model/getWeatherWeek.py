import urllib.request as req
from urllib.parse import quote
import json

def getWeatherWeek(location):

    CWB_API_KEY = "CWA-A84BBFA9-3657-4814-BB70-63523EA7AA40"

    url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY + "&locationName=" + quote(location)

    request = req.Request(url)

    with req.urlopen(request) as response:
        response_body = response.read().decode('utf-8')

    my_data = json.loads(response_body)

    return my_data