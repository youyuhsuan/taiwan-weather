import urllib.request as req
from urllib.parse import quote
import json
from datetime import datetime

def getTemperature(CWB_API_KEY,temperatureTimeCache):

    day = datetime.now().day
    hour = datetime.now().hour
    
    cacheResult = temperatureTimeCache.getData(day,hour)
    
    if cacheResult != None:
        return cacheResult

    element = "T"

    url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=" + CWB_API_KEY + "&elementName=" + element

    request = req.Request(url)

    with req.urlopen(request) as response:
        response_body = response.read().decode('utf-8')

    my_data = json.loads(response_body)

    data = []

    for i in range(22):
        localName = my_data["records"]["locations"][0]["location"][i]["locationName"]
        localValue = my_data["records"]["locations"][0]["location"][i]["weatherElement"][0]["time"][0]["elementValue"][0]["value"]
        localData = {localName:localValue}
        data.append(localData)

    temperatureTimeCache.setData(day,hour,data)

    return data