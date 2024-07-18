let weatherForecast = document.querySelector(".weather-forecast");
let prevBtn = weatherForecast.querySelector(".prev");
let nextBtn = weatherForecast.querySelector(".next");
let forecastItems = weatherForecast.querySelector(".forecast-items");

prevBtn.addEventListener("click", () => {
  forecastItems.scrollBy({
    left: -120,
    behavior: "smooth",
  });
});

nextBtn.addEventListener("click", () => {
  forecastItems.scrollBy({
    left: 120,
    behavior: "smooth",
  });
});
