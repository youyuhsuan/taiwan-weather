import urllib.request as req
from urllib.parse import quote
import json

def getWeatherWeek(CWB_API_KEY,location,weekLocationCache):

    cacheResult = weekLocationCache.getData(location)

    if cacheResult != None:
        return cacheResult

    url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY + "&locationName=" + quote(location)

    request = req.Request(url)

    with req.urlopen(request) as response:
        response_body = response.read().decode('utf-8')

    my_data = json.loads(response_body)

    data = []

    for i in range(15):
        dataItem=[]
        elementName = my_data["records"]["locations"][0]["location"][0]["weatherElement"][i]["description"]
        if i == 9:
            try:
                for j in range(7):
                    value = my_data["records"]["locations"][0]["location"][0]["weatherElement"][i]["time"][j]
                    localData = {"data":value}
                    dataItem.append(localData)
            except:
                localData = {"data": {}}
                dataItem.append(localData)
        else:
            for j in range(14):
                value = my_data["records"]["locations"][0]["location"][0]["weatherElement"][i]["time"][j]
                localData = {"data":value}
                dataItem.append(localData)
        data.append({elementName:dataItem})

    weekLocationCache.setData(location,data)

    return data