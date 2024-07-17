async function getHeroData(){
  let response = await fetch(`/weather/threeDays/${ctyName}`);
  let responseData = await response.json();
  let todayWeather = responseData[0].weatherElement;
  console.log(responseData);

  let nowPoP12h = todayWeather[0].time[0].elementValue[0].value;
  let nowWX = todayWeather[1].time[0].elementValue[0].value;
  let nowT = todayWeather[3].time[0].elementValue[0].value;
  let nowWD = todayWeather[9].time[0].elementValue[0].value;
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

  tempArr.slice(0, 9).forEach(function(tempItem, index){
    let tempBar = tempItem.elementValue[0].value;
    let timeBar = tempItem.dataTime;
    let hourBar = parseInt(timeBar.substr(11, 2), 10);

    let wxBar = wxArr[index].elementValue[1].value;

    let weatherIconSrc = "";
    let weatherIconAlt = "";
    if(/01/.test(wxBar)){
      weatherIconSrc = "/static/src/icon/01_clear.svg";
      weatherIconAlt = "Clear weather";
    }else if(/02|03|04/.test(wxBar)){
      weatherIconSrc = "/static/src/icon/03_partly_cloudy_day.svg";
      weatherIconAlt = "Partly-Cloudy weather";
    }else if(/05/.test(wxBar)){
      weatherIconSrc = "/static/src/icon/03_cloudy.svg";
      weatherIconAlt = "Cloudy weather";
    }else if(/06|07|08/.test(wxBar)){
      weatherIconSrc = "/static/src/icon/08_thunderstorm.svg";
      weatherIconAlt = "thunderstorm weather";
    }else if(/09|10/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/09_rainy_light.svg";
      weatherIconAlt = "rainy-light weather";
    }else if(/11/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/11_rainy_heavy.svg";
      weatherIconAlt = "rainy-heavy weather";
    }else if(/15|16|17/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/15_snowing.svg";
      weatherIconAlt = "snowing weather";
    }else if(/18/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/18_weather_hail.svg";
      weatherIconAlt = "hail weather";
    }

    let forecastItem = document.createElement("div");
    forecastItem.className = "forecast-item";

    let timeDiv = document.createElement("div");
    timeDiv.className = "time";
    if(index === 0){
      timeDiv.textContent = "現在"
    }else{
      timeDiv.textContent = hourBar + "時";
    }
    forecastItem.appendChild(timeDiv);

    let weatherIcon = document.createElement("img");
    weatherIcon.className = `weather-icon`;
    weatherIcon.src = weatherIconSrc
    weatherIcon.alt = weatherIconAlt;
    forecastItem.appendChild(weatherIcon);

    let temperatureDiv = document.createElement("div");
    temperatureDiv.className = "temperature";
    temperatureDiv.textContent = tempBar + "°";
    forecastItem.appendChild(temperatureDiv);

    forecastItems.appendChild(forecastItem);
    forecastContainer.appendChild(forecastItems);

    if(tempBar > maxTemp)maxTemp = tempBar;
    if(tempBar < minTemp)minTemp = tempBar;
    document.querySelector(".MaxAT").textContent = maxTemp + "°";
    document.querySelector(".MinAT").textContent = minTemp + "°";
  });
}


// 重新 fetch 資訊
async function getNewHeroData() {
  let response = await fetch(`/weather/threeDays/${ctyName}`);
  let responseData = await response.json();
  let todayWeather = responseData[0].weatherElement;
  console.log(responseData);

  let nowPoP12h = todayWeather[0].time[0].elementValue[0].value;
  let nowWX = todayWeather[1].time[0].elementValue[0].value;
  let nowT = todayWeather[3].time[0].elementValue[0].value;
  let nowWD = todayWeather[9].time[0].elementValue[0].value;
  document.querySelector(".PoP12h").textContent = nowPoP12h + "%";
  document.querySelector(".Wx").textContent = nowWX;
  document.querySelector(".AT").textContent = nowT + "°";
  document.querySelector(".WD").textContent = nowWD;

  let tempArr = todayWeather[3].time;
  let wxArr = todayWeather[1].time;

  let forecastContainer = document.querySelector(".forecast-container");
  let forecastItems = document.querySelector(".forecast-items");
  forecastItems.innerHTML = ''; // Clear existing items

  let maxTemp = -Infinity;
  let minTemp = Infinity;

  tempArr.slice(0, 9).forEach(function(tempItem, index) {
    let tempBar = tempItem.elementValue[0].value;
    let timeBar = tempItem.dataTime;
    let hourBar = parseInt(timeBar.substr(11, 2), 10);

    let wxBar = wxArr[index].elementValue[1].value;

    let weatherIconSrc = "";
    let weatherIconAlt = "";
    if (/01/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/01_clear.svg";
      weatherIconAlt = "Clear weather";
    } else if (/02|03|04/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/03_partly_cloudy_day.svg";
      weatherIconAlt = "Partly-Cloudy weather";
    } else if (/05/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/03_cloudy.svg";
      weatherIconAlt = "Cloudy weather";
    } else if (/06|07|08/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/08_thunderstorm.svg";
      weatherIconAlt = "thunderstorm weather";
    } else if (/09|10/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/09_rainy_light.svg";
      weatherIconAlt = "rainy-light weather";
    } else if (/11/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/11_rainy_heavy.svg";
      weatherIconAlt = "rainy-heavy weather";
    } else if (/15|16|17/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/15_snowing.svg";
      weatherIconAlt = "snowing weather";
    } else if (/18/.test(wxBar)) {
      weatherIconSrc = "/static/src/icon/18_weather_hail.svg";
      weatherIconAlt = "hail weather";
    }

    let forecastItem = document.createElement("div");
    forecastItem.className = "forecast-item";

    let timeDiv = document.createElement("div");
    timeDiv.className = "time";
    timeDiv.textContent = (index === 0) ? "現在" : hourBar + "時";
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

    if (tempBar > maxTemp) maxTemp = tempBar;
    if (tempBar < minTemp) minTemp = tempBar;
  });

  document.querySelector(".MaxAT").textContent = maxTemp + "°";
  document.querySelector(".MinAT").textContent = minTemp + "°";

  forecastContainer.appendChild(forecastItems);
}

getHeroData();


