const locationName = document.querySelector(".location-name");

let ctyName = "新竹市";
let locationIcon = document.getElementById("location-icon");
let currentLocationLabel = document.getElementById("current-location-label");

// 定位成功
function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // 將經緯度轉換成縣市名
  fetch(
    `https://api.nlsc.gov.tw/other/TownVillagePointQuery/${longitude}/${latitude}/`
  )
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data) {
        locationIcon.style.fill = "white";
        currentLocationLabel.style.display = "block";
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "application/xml");
        ctyName = doc.getElementsByTagName("ctyName")[0].textContent;
        animationMap();
        if (ctyName !== "新竹市") {
          locationName.textContent = ctyName;
          document.querySelector(".forecast-items").innerHTML = "";
          getHeroData(ctyName, true);
          animationMap(ctyName);
          getWeather(ctyName);
        }
      } else {
        locationName.textContent = ctyName;
        animationMap();
      }
      locationIcon.style.fill = "white";
      currentLocationLabel.style.display = "block";
    })
    .catch((error) => {
      console.error(error);
    });
}

// 定位失敗
function error() {
  locationName.textContent = ctyName;
}

// 確認是否可以啟用定位服務
if (!navigator.geolocation) {
  locationName.textContent = ctyName;
} else {
  locationName.textContent = ctyName;
  navigator.geolocation.getCurrentPosition(success, error);
}
