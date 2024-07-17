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

    let weatherIconClass = "";
    if(/01/.test(wxBar)){
      weatherIconClass = "sun";
    }else if(/02|03|04|05/.test(wxBar)){
      weatherIconClass = "cloud";
    }else if(/06|07|08|09|10|11|12|13|14|15/.test(wxBar)){
      weatherIconClass = "rain";
    }

    let forecastItem = document.createElement("div");
    forecastItem.className = "forecast-item";

    let weatherIcon = document.createElement("i");
    weatherIcon.className = `weather-icon ${weatherIconClass}`;
    forecastItem.appendChild(weatherIcon);

    let temperatureDiv = document.createElement("div");
    temperatureDiv.className = "temperature";
    temperatureDiv.textContent = tempBar + "°";
    forecastItem.appendChild(temperatureDiv);

    let timeDiv = document.createElement("div");
    timeDiv.className = "time";
    if(index === 0){
      timeDiv.textContent = "現在"
    }else{
      timeDiv.textContent = hourBar + "時";
    }
    forecastItem.appendChild(timeDiv);

    forecastItems.appendChild(forecastItem);
    forecastContainer.appendChild(forecastItems);

    if(tempBar > maxTemp)maxTemp = tempBar;
    if(tempBar < minTemp)minTemp = tempBar;
    document.querySelector(".MaxAT").textContent = maxTemp + "°";
    document.querySelector(".MinAT").textContent = minTemp + "°";
  });
}

getHeroData();


