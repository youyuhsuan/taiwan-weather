async function getHeroData(ctyName = "台北", isInitial = false) {
  try {
    if (isInitial) {
      locationIcon.style.fill = "white";
      currentLocationLabel.style.display = "block";
    }

    locationIcon.style.fill = "none";
    currentLocationLabel.style.display = "none";
    let response = await fetch(`/weather/threeDays/${ctyName}`);
    if (response) {

      let now = new Date();
      let currentHour = now.getHours();
      
      let responseData = await response.json();
      let todayWeather = responseData[0].weatherElement;

      let timeInterval = 0;
      let dataTime = todayWeather[1].time[0].startTime
      dataHour = new Date(dataTime).getHours()

      if ((currentHour % 6 >= 3) && (currentHour - dataHour >= 0)){
        timeInterval = 1
      }

      let nowWxNum = todayWeather[1].time[timeInterval].elementValue[1].value;
      let nowWX = todayWeather[1].time[timeInterval].elementValue[0].value;
      let nowT = todayWeather[3].time[timeInterval].elementValue[0].value;
      let nowWD = todayWeather[9].time[timeInterval].elementValue[0].value;
      
      let nowPoP12h = todayWeather[0].time[0].elementValue[0].value;

      // 根據天氣判斷背景圖
      let BackgroundImageName = "";
      function getBackgroundImage(BackgroundImageName) {
        let weatherImage = document.querySelector(".hero-section");
        let currentBgImage =
          window.getComputedStyle(weatherImage).backgroundImage;
        let newBgImage = currentBgImage.replace(
          /url\([^)]*\)/,
          `url(/static/src/image/${BackgroundImageName}.jpg)`
        );
        weatherImage.style.backgroundImage = newBgImage;
      }

      if (/01/.test(nowWxNum)) {
        // 晴
        if (currentHour >= 6 && currentHour <= 18) {
          BackgroundImageName = "01_clear";
        } else {
          BackgroundImageName = "01_clearnight";
        }
      } else if (/02|03/.test(nowWxNum)) {
        // 晴時多雲
        BackgroundImageName = "05_cloudy";
      } else if (/0[4-7]|2[4-8]/.test(nowWxNum)) {
        // 多雲、陰、霧
        BackgroundImageName = "05_cloudy";
      } else if (/0[8-9]|1[0-9]|2[0-2]|29|3[0-9]|41/.test(nowWxNum)) {
        // 雨
        BackgroundImageName = "rain";
      } else if (/23|42/.test(nowWxNum)) {
        // 雪
        BackgroundImageName = "15_snowing";
      }
      getBackgroundImage(BackgroundImageName);

      // 替換氣候詳細資訊
      document.querySelector(".location-name").textContent = ctyName;
      document.querySelector(".PoP12h span").textContent = nowPoP12h + "%";
      document.querySelector(".Wx").textContent = nowWX;
      document.querySelector(".AT").textContent = nowT + "°";
      document.querySelector(".WD span").textContent = nowWD;
      let tempArr = todayWeather[3].time;
      let wxArr = todayWeather[1].time;
      if (timeInterval == 1){
        tempArr.shift()
        wxArr.shift()
      }

      document.querySelector(".forecast-items").innerHTML = "";
      let forecastContainer = document.querySelector(".forecast-container");
      let forecastItems = document.querySelector(".forecast-items");

      let maxTemp = -Infinity;
      let minTemp = Infinity;

      tempArr.slice(0, 9).forEach(function (tempItem, index) {
        let tempBar = tempItem.elementValue[0].value;
        let timeBar = tempItem.dataTime;
        let hourBar = parseInt(timeBar.substr(11, 2), 10);

        let wxBar = wxArr[index].elementValue[1].value;

        // 根據天氣判斷 icon
        let weatherIconSrc = "";
        let weatherIconAlt = "";

        if (/01/.test(wxBar)) {
          // 晴
          weatherIconSrc = "/static/src/icon/01_clear.svg";
          weatherIconAlt = "Clear weather";
        } else if (/02|03/.test(wxBar)) {
          // 晴時多雲
          weatherIconSrc = "/static/src/icon/03_partly_cloudy_day.svg";
          weatherIconAlt = "Partly-Cloudy weather";
        } else if (/0[4-7]|2[4-8]/.test(wxBar)) {
          // 多雲、陰、霧
          weatherIconSrc = "/static/src/icon/05_cloudy.svg";
          weatherIconAlt = "Cloudy weather";
        } else if (/0[8-9]|1[0-9]|2[0-2]|29|3[0-9]|41/.test(wxBar)) {
          // 雨
          weatherIconSrc = "/static/src/icon/rainy.svg";
          weatherIconAlt = "rainy weather";
        } else if (/23|42/.test(wxBar)) {
          // 雪
          weatherIconSrc = "/static/src/icon/15_snowing.svg";
          weatherIconAlt = "snowing weather";
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
        document.querySelector(".MaxAT span").textContent = maxTemp + "°";
        document.querySelector(".MinAT span").textContent = minTemp + "°";
      });

      postBotData(ctyName, nowWX, nowWxNum, nowT, nowPoP12h);
    } else {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}

getHeroData(ctyName);
