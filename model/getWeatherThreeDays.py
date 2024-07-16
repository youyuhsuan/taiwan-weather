from dotenv import load_dotenv
import os
import urllib.request
import urllib.parse
import json

load_dotenv()

# 鄉鎮天氣預報 - 臺灣未來 3 天天氣預報
def getWeatherTwoDays(api_code, api_key, location = None):
    try:
        base_url = "https://opendata.cwa.gov.tw/api/v1/rest/datastore"
        api_url = f"{base_url}/{api_code}"

        params = {
            "Authorization": api_key,
        }

        if location:
            params["locationName"] = location

        query_string = urllib.parse.urlencode(params)
        url = f"{api_url}?{query_string}"

        request = urllib.request.Request(url, method="GET")
        with urllib.request.urlopen(request) as response:
            if response.status == 200:
                data = response.read().decode("utf-8")
                weather_data = json.loads(data)
                locationResult = weather_data["records"]["locations"][0]["location"]

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

# 使用範例
api_code = "F-D0047-089"
api_key = os.getenv("CWB_API_KEY")
location = "臺北市"