let weatherForecast = document.querySelector(".weather-forecast");
let prevBtn = weatherForecast.querySelector(".prev");
let nextBtn = weatherForecast.querySelector(".next");
let forecastItems = weatherForecast.querySelector(".forecast-items");

prevBtn.addEventListener("click", () => {
  console.log("s");
  forecastItems.scrollBy({
    left: -120,
    behavior: "smooth",
  });
});

nextBtn.addEventListener("click", () => {
  console.log("22");
  forecastItems.scrollBy({
    left: 120,
    behavior: "smooth",
  });
});
