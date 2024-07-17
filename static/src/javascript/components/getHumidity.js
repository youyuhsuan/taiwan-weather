async function getHumidity() {
  try {
    let response = await fetch("/weather/humidity");
    let responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error fetching humidity data:", error);
  }
}

const humidityButton = document.querySelector(".humidity");

humidityButton.addEventListener("click", () => {
  //   isActive = !isActive;
  //   thermostatButton.classList.toggle("active", isActive);
  getHumidity();
});
