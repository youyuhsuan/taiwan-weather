import urllib.request
import json, re
from pydantic import BaseModel
from datetime import datetime

class DiscordData(BaseModel):
    location: str
    wx: str
    t: str
    pop12h: str

async def triggerDiscord(discord_data):
    return
    date = datetime.today().date().isoformat()
    location = discord_data.location
    wx = discord_data.wx
    nowWx = wx.split(",")[0]
    nowWxNum = wx.split(",")[1]
    t = discord_data.t
    pop12h = discord_data.pop12h

    if re.match(r"^01$", nowWxNum):
        description = "天氣這麼好 拒當 EMO 人"
        imgUrl = "https://i.imgur.com/7hdQ9ag.jpeg"
    elif re.match(r"^(0[2-7]|2[4-8])$", nowWxNum):
        description = "天氣這麼陰 我是 EMO 人"
        imgUrl = "https://i.imgur.com/CtXPLip.jpeg"
    elif re.match(r"^(23|42)$", nowWxNum):
        description = "天空下雪啦 浪漫 EMO 人"
        imgUrl = "https://i.imgur.com/kA5MC52.jpeg"
    elif re.match(r"^(0[8-9]|1[0-9]|2[0-2]|29|3[0-9]|41)$", nowWxNum):
        description = "下雨怎麼辦 想當 EMO 人"
        imgUrl = "https://i.imgur.com/GqI3uKf.jpeg"
    else:
        description = "天氣怎麼樣 讓我告訴你"
        imgUrl = "https://cdntwrunning.biji.co/600_f258233d1dd5908866918439f7960e47.jpg"

    url = "https://discord.com/api/webhooks/1162404320399085690/y6pNTIyURc4-ftZIicqF49uzwNTF70bRw_9D1QyVrmxzbwagnXXX-HNW2E6QvzUJVUVS"

    headers = {
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.40.0",
    }

    data = {
        "username": "台灣縣市氣象資訊 BOT",
        "avatar_url": "https://cdn.icon-icons.com/icons2/665/PNG/512/robot_icon-icons.com_60269.png",
        "embeds": [
            {
                "title": "今天天氣好嗎",
                "description": description,
                "url": "http://13.213.240.133:8001/",
                "color": 15258703,
                "fields": [
                    {"name": "日期", "value": date, "inline": True},
                    {"name": "地點", "value": location, "inline": True},
                    {"name": "天氣", "value": nowWx},
                    {"name": "氣溫", "value": t + ":thermometer:", "inline": True},
                    {"name": "降雨機率", "value": pop12h, "inline": True},
                    {"name": "溫馨提醒", "value": "易有午後雷陣雨，出門記得帶把傘呦 :umbrella2: :wink:"},
                ],
                "thumbnail": {
                    "url": "https://img.tw.my-best.com/product_images/32e16cee60e272d62224e90724d5ea4f.png?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=bd25ac302c81eb102a0a60e6e1e042cf"
                },
                "image": {"url": imgUrl},
            }
        ],
    }

    # 將 data 轉換為 JSON 字符串並編碼
    encoded_data = json.dumps(data).encode("utf-8")

    # 創建請求
    request = urllib.request.Request(
        url=url, headers=headers, data=encoded_data, method="POST"
    )

    try:
        with urllib.request.urlopen(request) as response:
            print(f"Request sent successfully. Status code: {response.getcode()}")
    except urllib.error.URLError as e:
        print(f"Failed to send request. Error: {e}")