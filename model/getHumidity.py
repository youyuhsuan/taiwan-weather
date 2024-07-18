import urllib.request
import urllib.parse
import json
from datetime import datetime


def getHumidity(CWB_API_KEY, humidityTimeCache):

    day = datetime.now().day
    hour = datetime.now().hour

    cacheResult = humidityTimeCache.getData(day, hour)

    if cacheResult != None:
        return cacheResult

    element = "RH"

    url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=" + \
        CWB_API_KEY + "&elementName=" + element

    request = urllib.request.Request(url, method="GET")
    with urllib.request.urlopen(request) as response:
        response_body = response.read().decode("utf-8")

    my_data = json.loads(response_body)

    data = []

    dataTime = my_data["records"]["locations"][0]["location"][0]["weatherElement"][0]["time"][0]["dataTime"]
    dateTimeObject = datetime.strptime(dataTime, "%Y-%m-%d %H:%M:%S")
    dataHour = dateTimeObject.hour

    for i in range(22):
        localName = my_data["records"]["locations"][0]["location"][i]["locationName"]
        if (hour % 6 < 3) or (hour - dataHour) < 0:
            localValue = my_data["records"]["locations"][0]["location"][i][
                "weatherElement"][0]["time"][0]["elementValue"][0]["value"]
        else:
            localValue = my_data["records"]["locations"][0]["location"][i][
                "weatherElement"][0]["time"][1]["elementValue"][0]["value"]
        localData = {localName: localValue}
        data.append(localData)

    humidityTimeCache.setData(day, hour, data)

    return data
