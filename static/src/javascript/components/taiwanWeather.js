const weatherData = {
  taipei_city: { tag: "台北市", low: 25, high: 30, weather: "晴天" },
  new_taipei_city: { tag: "新北市", low: 24, high: 29, weather: "多云" },
  taoyuan_country: { tag: "桃園市", low: 23, high: 28, weather: "阵雨" },
};

const paths = document.querySelectorAll("path");

paths.forEach((path) => {
  path.addEventListener("mouseenter", (e) => {
    const areaId = e.target.id;
    const data = weatherData[areaId];
    if (data) {
      document.getElementById("area-tag").textContent = data.tag;
      document.getElementById(
        "temperature-range"
      ).textContent = `${data.low}~${data.high}`;
      document.getElementById("weather-condition").textContent = data.weather;
    }
  });
});
