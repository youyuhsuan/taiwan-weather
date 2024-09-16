import urllib.request
import urllib.parse
import json

def getWeatherThreeDays(CWB_API_KEY, location,threeDaysLocationCache):

    cacheResult = threeDaysLocationCache.getData(location)

    if cacheResult != None:
        return cacheResult

    try:
        api_url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-089"

        params = {
            "Authorization": CWB_API_KEY,
            "locationName": location
        }

        query_string = urllib.parse.urlencode(params)
        url = f"{api_url}?{query_string}"

        request = urllib.request.Request(url, method="GET")
        with urllib.request.urlopen(request) as response:
            if response.status == 200:
                data = response.read().decode("utf-8")
                weather_data = json.loads(data)
                locationResult = weather_data["records"]["locations"][0]["location"]

                threeDaysLocationCache.setData(location,locationResult)

                return locationResult
            else:
                print(f"HTTP錯誤碼: {response.status}")
                return None
    except urllib.error.URLError as e:
        print(f"URL錯誤: {e.reason}")
        return None
    except urllib.error.HTTPError as e:
        print(f"HTTP錯誤: {e.code} - {e.reason}")
        return None
    except Exception as e:
        print(f"其他錯誤: {e}")
        return None