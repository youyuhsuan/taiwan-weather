async function getWeatherData(location) {
  try {
    let response = await fetch(`/weather/threeDays/${location}`);
    let responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error(`Error fetching weather data for ${location}:`, error);
  }
}

function selectLocation() {
  const taiwan = document.getElementById("taiwan");
  const paths = taiwan.querySelectorAll("path");

  paths.forEach((path) => {
    const areaId = path.getAttribute("data-name");
    const countyName = svgIdToCountyName[areaId];

    path.addEventListener("click", async () => {
      try {
        const weatherData = await getWeatherData(countyName);
      } catch (error) {
        console.error(`Failed to get weather data for ${countyName}:`, error);
      }
    });
  });
}

selectLocation();

const heroInfo = document.querySelector(".hero-info");
const locationName = heroInfo.querySelector(".locationName");
const Wx = heroInfo.querySelector(".Wx");
const AT = heroInfo.querySelector(".AT");
const MaxAT = heroInfo.querySelector(".MaxAT");

// heroInfo.querySelector(".details");
// <div class="details">
//   <div class="MaxAT"></div>
//   <div class="MinAT"></div>
//   <div class="WD"></div>
//   <div class="PoP12h"></div>
// </div>;
