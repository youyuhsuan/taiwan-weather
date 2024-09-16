from datetime import datetime
# data -> [ {"location":台北市, "data":資料}, ... ]
class LocationCache():
    def __init__(self):
        self.data = []
        self.max = 20
        self.renewHours = 3
    def getData(self,location):
        queryTime = datetime.now()
        for i in range(len(self.data)-1,-1,-1):
            if self.data[i]["location"] == location:
                difference = queryTime - self.data[i]["dataTime"]
                if (difference.seconds >= 3600 * self.renewHours):
                    return None
                found_data = self.data[i]
                del self.data[i]
                self.data.append(found_data)
                return found_data["data"]
        return None
    def setData(self,location,data):
        dataTime = datetime.now()
        if (len(self.data)>=self.max):
            self.data = self.data[self.max//2:]
        self.data.append({"location":location, "data":data, "dataTime":dataTime})