async function getTemperature() {
  try {
    let response = await fetch("/weather/temperature");
    let responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error fetching temperature data:", error);
  }
}

function getColorForTemperature(temperature) {
  const temp = parseFloat(temperature);
  const colorScale = [
    { temp: -1, color: [0, 36, 89] },
    { temp: 5, color: [0, 100, 148] },
    { temp: 11, color: [0, 216, 255] },
    { temp: 15, color: [0, 161, 61] },
    { temp: 19, color: [80, 205, 106] },
    { temp: 23, color: [175, 240, 105] },
    { temp: 27, color: [255, 255, 0] },
    { temp: 31, color: [255, 170, 0] },
    { temp: 35, color: [255, 0, 0] },
    { temp: 38, color: [128, 0, 128] },
  ];

  for (let i = 1; i < colorScale.length; i++) {
    if (temp <= colorScale[i].temp) {
      const lowColor = colorScale[i - 1];
      const highColor = colorScale[i];
      const ratio = (temp - lowColor.temp) / (highColor.temp - lowColor.temp);

      const r = Math.round(
        lowColor.color[0] + ratio * (highColor.color[0] - lowColor.color[0])
      );
      const g = Math.round(
        lowColor.color[1] + ratio * (highColor.color[1] - lowColor.color[1])
      );
      const b = Math.round(
        lowColor.color[2] + ratio * (highColor.color[2] - lowColor.color[2])
      );

      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  return `rgb(${colorScale[colorScale.length - 1].color.join(", ")})`;
}

const svgIdToCountyName = {
  penghu_country: "澎湖縣",
  chiayi_country: "嘉義縣",
  chiayi_city: "嘉義市",
  taipei_city: "臺北市",
  new_taipei_city: "新北市",
  taichung_city: "臺中市",
  tainan_city: "臺南市",
  kaohsiung_city: "高雄市",
  pingtung_country: "屏東縣",
  taoyuan_country: "桃園市",
  hsinchu_city: "新竹市",
  hsinchu_country: "新竹縣",
  miaoli_country: "苗栗縣",
  changhua_country: "彰化縣",
  nantou_country: "南投縣",
  yunlin_country: "雲林縣",
  hualien_country: "花蓮縣",
  taitung_country: "臺東縣",
  yilan_country: "宜蘭縣",
  keelung_city: "基隆市",
  kinmen_country: "金門縣",
};

let isActive = false;

async function initializeMap() {
  const temperatureArray = await getTemperature();
  let temperatureData = temperatureArray.reduce((acc, curr) => {
    const [county, temp] = Object.entries(curr)[0];
    acc[county] = temp;
    return acc;
  }, {});

  const taiwan = document.getElementById("taiwan");
  const paths = taiwan.querySelectorAll("path");

  paths.forEach((path) => {
    const areaId = path.id;
    const countyName = svgIdToCountyName[areaId];
    const temperature = temperatureData[countyName];

    if (temperature && isActive) {
      path.style.fill = getColorForTemperature(temperature);
    } else {
      path.style.removeProperty("fill");
    }
  });
}

const thermostatButton = document.querySelector(".thermostat");

thermostatButton.addEventListener("click", () => {
  isActive = !isActive;
  thermostatButton.classList.toggle("active", isActive);
  initializeMap();
});
