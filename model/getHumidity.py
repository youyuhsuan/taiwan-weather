import urllib.request
import urllib.parse
import json

def getHumidity(CWB_API_KEY):

    element = "RH"

    url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=" + CWB_API_KEY + "&elementName=" + element

    request = urllib.request.Request(url, method="GET")
    with urllib.request.urlopen(request) as response:
        response_body = response.read().decode("utf-8")

    my_data = json.loads(response_body)

    data = []

    for i in range(22):
        localName = my_data["records"]["locations"][0]["location"][i]["locationName"]
        localValue = my_data["records"]["locations"][0]["location"][i]["weatherElement"][0]["time"][0]["elementValue"][0]["value"]
        localData = {localName:localValue}
        data.append(localData)

    return data