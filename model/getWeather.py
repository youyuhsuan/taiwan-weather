import urllib.request as req
from urllib.parse import quote
import json

def getWeather(CWB_API_KEY,location):

    url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=" + CWB_API_KEY + "&locationName=" + quote(location)

    request = req.Request(url)

    with req.urlopen(request) as response:
        response_body = response.read().decode('utf-8')

    my_data = json.loads(response_body)

    data = []

    for i in range(11):
        elementName = my_data["records"]["locations"][0]["location"][0]["weatherElement"][i]["description"]
        value = my_data["records"]["locations"][0]["location"][0]["weatherElement"][i]["time"][0]["elementValue"][0]
        data.append({elementName:value})

    return data