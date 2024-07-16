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
        "embeds": [{
            "fields": None
        }
        ]
    }).encode()

    request = urllib.request.Request(url=url, headers=headers, data=data)

    with urllib.request.urlopen(request) as response:
        pass

    return
