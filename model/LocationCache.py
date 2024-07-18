# data -> [ {"location":台北市, "data":資料}, ... ]
class LocationCache():
    def __init__(self):
        self.data = []
        self.max = 20
    def getData(self,location):
        for i in range(len(self.data)-1,-1,-1):
            if self.data[i]["location"] == location:
                found_data = self.data[i]
                del self.data[i]
                self.data.append(found_data)
                return found_data["data"]
        return None
    def setData(self,location,data):
        if (len(self.data)>=self.max):
            self.data = self.data[self.max//2:]
        self.data.append({"location":location, "data":data})