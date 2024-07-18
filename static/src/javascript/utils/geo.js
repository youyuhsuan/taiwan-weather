const locationName = document.querySelector(".locationName");

let ctyName = "臺北市";

// function setCtyName(city) {
//   city = value;
// }

// function getCtyName() {
//   return city;
// }

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
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "application/xml");
        ctyName = doc.getElementsByTagName("ctyName")[0].textContent;
        if (ctyName !== "臺北市") {
          locationName.textContent = ctyName;
          document.querySelector(".forecast-items").innerHTML = "";
          getHeroData();
        }
      } else {
        locationName.textContent = ctyName;
      }
    })
    .catch(function () {
      locationName.textContent = ctyName;
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
