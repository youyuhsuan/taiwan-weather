async function getHeroData() {
  let response = await fetch(`/weather/threeDays/${ctyName}`);
  let responseData = await response.json();
  let todayWeather = responseData[0].weatherElement;
  console.log(responseData);

  let nowPoP12h = todayWeather[0].time[0].elementValue[0].value;
  let nowWX = todayWeather[1].time[0].elementValue[0].value;
  let nowT = todayWeather[3].time[0].elementValue[0].value;
  let nowWD = todayWeather[9].time[0].elementValue[0].value;
  document.querySelector(".locationName").textContent = ctyName;
  document.querySelector(".PoP12h").textContent = nowPoP12h + "%";
  document.querySelector(".Wx").textContent = nowWX;
  document.querySelector(".AT").textContent = nowT + "°";
  document.querySelector(".WD").textContent = nowWD;

  let tempArr = todayWeather[3].time;
  let wxArr = todayWeather[1].time;

  let forecastContainer = document.querySelector(".forecast-container");
  let forecastItems = document.querySelector(".forecast-items");

  let maxTemp = -Infinity;
  let minTemp = Infinity;

  tempArr.slice(0, 9).forEach(function (tempItem, index) {
    let tempBar = tempItem.elementValue[0].value;
    let timeBar = tempItem.dataTime;
    let hourBar = parseInt(timeBar.substr(11, 2), 10);

    let wxBar = wxArr[index].elementValue[1].value;

    // 根據天氣判斷 icon 與背景圖
    let weatherIconSrc = "";
    let weatherIconAlt = "";

    let BackgroundImageName = ""
    function getBackgroundImage(BackgroundImageName){
      let weatherImage = document.querySelector(".hero-section");
      let currentBgImage = window.getComputedStyle(weatherImage).backgroundImage;
      let newBgImage = currentBgImage.replace(/url\([^)]*\)/, `url(/static/src/image/${BackgroundImageName}.jpg)`);
      weatherImage.style.backgroundImage = newBgImage;
    }

    if(/01/.test(wxBar)){ // 晴
      weatherIconSrc = "/static/src/icon/01_clear.svg";
      weatherIconAlt = "Clear weather";
      BackgroundImageName = "01_clear"
      getBackgroundImage(BackgroundImageName)
    }else if(/02|03/.test(wxBar)){ // 晴時多雲
      weatherIconSrc = "/static/src/icon/03_partly_cloudy_day.svg";
      weatherIconAlt = "Partly-Cloudy weather";
      BackgroundImageName = "05_cloudy"
      getBackgroundImage(BackgroundImageName)
    }else if(/0[4-7]|2[4-8]/.test(wxBar)){ // 多雲、陰、霧
      weatherIconSrc = "/static/src/icon/05_cloudy.svg";
      weatherIconAlt = "Cloudy weather";
      BackgroundImageName = "05_cloudy"
      getBackgroundImage(BackgroundImageName)
    }else if(/0[8-9]|1[0-9]|2[0-2]|29|3[0-9]|41/.test(wxBar)){ // 雨
      weatherIconSrc = "/static/src/icon/rainy.svg";
      weatherIconAlt = "rainy weather";
      BackgroundImageName = "rain"
      getBackgroundImage(BackgroundImageName)
    }else if(/23|42/.test(wxBar)) { // 雪
      weatherIconSrc = "/static/src/icon/15_snowing.svg";
      weatherIconAlt = "snowing weather";
      BackgroundImageName = "15_snowing"
      getBackgroundImage(BackgroundImageName)
    }

    let forecastItem = document.createElement("div");
    forecastItem.className = "forecast-item";

    let timeDiv = document.createElement("div");
    timeDiv.className = "time";
    if (index === 0) {
      timeDiv.textContent = "現在";
    } else {
      timeDiv.textContent = hourBar + "時";
    }
    forecastItem.appendChild(timeDiv);

    let weatherIcon = document.createElement("img");
    weatherIcon.className = `weather-icon`;
    weatherIcon.src = weatherIconSrc;
    weatherIcon.alt = weatherIconAlt;
    forecastItem.appendChild(weatherIcon);

    let temperatureDiv = document.createElement("div");
    temperatureDiv.className = "temperature";
    temperatureDiv.textContent = tempBar + "°";
    forecastItem.appendChild(temperatureDiv);

    forecastItems.appendChild(forecastItem);
    forecastContainer.appendChild(forecastItems);

    if (tempBar > maxTemp) maxTemp = tempBar;
    if (tempBar < minTemp) minTemp = tempBar;
    document.querySelector(".MaxAT").textContent = maxTemp + "°";
    document.querySelector(".MinAT").textContent = minTemp + "°";
  });
}

getHeroData();
