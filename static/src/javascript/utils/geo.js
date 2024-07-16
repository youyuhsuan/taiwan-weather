function geoFindMe(){
  const locationName = document.querySelector(".locationName");
  const ctyName = "新竹市"

  // 定位成功
  function success(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // 將經緯度轉換成縣市名
    fetch(`https://api.nlsc.gov.tw/other/TownVillagePointQuery/${longitude}/${latitude}/`)
    .then(function(response){
      return response.text();
    }).then(function(data){
      if(data){
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "application/xml");
        const ctyName = doc.getElementsByTagName("ctyName")[0].textContent;
        locationName.textContent = ctyName;
      }
      else{
        locationName.textContent = "新竹市";
      }
    }) 
  }

  // 定位失敗
  function error(){
    locationName.textContent = "新竹市";
  }

  // 確認是否可以啟用定位服務
  if(!navigator.geolocation){
    locationName.textContent = "新竹市";
  }else{
    locationName.textContent = "新竹市";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
  
geoFindMe();
