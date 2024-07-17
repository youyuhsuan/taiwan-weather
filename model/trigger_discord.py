import urllib.request
import json


def triggerDiscord():
    url = "https://discord.com/api/webhooks/1162404320399085690/y6pNTIyURc4-ftZIicqF49uzwNTF70bRw_9D1QyVrmxzbwagnXXX-HNW2E6QvzUJVUVS"

    headers = {
        "Content-Type": "application/json",
        "User-Agent": "PostmanRuntime/7.40.0",
    }
    data = json.dumps({
        "username": "台灣縣市氣象資訊 BOT",
        "avatar_url": "https://cdn.icon-icons.com/icons2/665/PNG/512/robot_icon-icons.com_60269.png",
        "embeds": [{
            "title": "今天天氣好嗎",
            "description": "天氣這麼好 拒當 EMO 人",
            "url": "https://www.youtube.com/watch?v=7Xdfi3qkPEw",
            "color": 15258703,
            "fields": [
                {
                "name": "日期",
                "value": "2024-07-17",
                "inline": True
                },
                {
                "name": "地點",
                "value": "臺北市",
                "inline": True
                },
                {
                "name": "天氣",
                "value": "熱死啦 :sunny:",
                },
                {
                "name": "氣溫",
                "value": "36˚C :thermometer:",
                "inline": True
                },
                {
                "name": "降雨機率",
                "value": "50% :white_sun_rain_cloud:",
                "inline": True
                },
                {
                "name": "溫馨提醒",
                "value": "易有午後雷陣雨，出門記得帶把傘呦 :umbrella2: :wink:"
                }
            ],
            "thumbnail": {
                "url": "https://img.tw.my-best.com/product_images/32e16cee60e272d62224e90724d5ea4f.png?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=bd25ac302c81eb102a0a60e6e1e042cf"
            },
            "image": {
                "url": "https://cdntwrunning.biji.co/600_f258233d1dd5908866918439f7960e47.jpg"
            },
        }]
    }).encode()

    request = urllib.request.Request(url=url, headers=headers, data=data)

    with urllib.request.urlopen(request) as response:
        pass

    return