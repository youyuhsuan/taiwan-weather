
# data -> [{"time":{"day":18,"hour":12},"data":data},...]
class TimeCache():
    def __init__(self):
        self.day = None
        self.hour = None
        self.data = None
    def getData(self,day,hour):
        if day != self.day:
            return None
        if abs(hour-self.hour) > 3:
            return None
        return self.data
    def setData(self,day,hour,data):
        self.day = day
        self.hour = hour
        self.data = data