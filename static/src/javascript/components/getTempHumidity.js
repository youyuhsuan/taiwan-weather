let isActive = false;
let currentPrinciple = null;

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
  lianjiang_country: "連江縣",
};

async function getTempHumidity(type) {
  try {
    let response = await fetch(`/weather/${type}`);
    let responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error);
  }
}

function getColorForWeather(value, type) {
  const colorScale =
    type === "temperature"
      ? [
          { value: -1, color: [0, 36, 89] },
          { value: 5, color: [0, 100, 148] },
          { value: 11, color: [0, 216, 255] },
          { value: 15, color: [0, 161, 61] },
          { value: 19, color: [80, 205, 106] },
          { value: 23, color: [175, 240, 105] },
          { value: 27, color: [255, 255, 0] },
          { value: 31, color: [255, 170, 0] },
          { value: 35, color: [255, 0, 0] },
          { value: 38, color: [128, 0, 128] },
        ]
      : [
          { value: 30, color: [249, 214, 85] },
          { value: 40, color: [196, 214, 131] },
          { value: 50, color: [143, 187, 86] },
          { value: 60, color: [91, 160, 41] },
          { value: 70, color: [40, 133, 0] },
          { value: 80, color: [30, 138, 158] },
          { value: 100, color: [21, 112, 180] },
        ];

  const numericValue = parseFloat(value);

  if (numericValue <= colorScale[0].value) {
    return `rgb(${colorScale[0].color.join(", ")})`;
  }
  if (numericValue >= colorScale[colorScale.length - 1].value) {
    return `rgb(${colorScale[colorScale.length - 1].color.join(", ")})`;
  }

  for (let i = 1; i < colorScale.length; i++) {
    if (numericValue <= colorScale[i].value) {
      const lowColor = colorScale[i - 1];
      const highColor = colorScale[i];
      const ratio =
        (numericValue - lowColor.value) / (highColor.value - lowColor.value);

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
}

async function initializeMap(type) {
  const dataArray = await getTempHumidity(type);
  weatherData = dataArray.reduce((acc, curr) => {
    const [county, value] = Object.entries(curr)[0];
    acc[county] = value;
    return acc;
  }, {});

  const taiwan = document.getElementById("taiwan");
  const paths = taiwan.querySelectorAll("path");

  paths.forEach((path) => {
    const areaId = path.getAttribute("data-name");
    const countyName = svgIdToCountyName[areaId];
    const value = weatherData[countyName];
    if (value && isActive) {
      path.style.fill = getColorForWeather(value, type);
    } else {
      path.style.removeProperty("fill");
    }
  });
}

function setupButton(buttonClass, type, principle) {
  const button = document.querySelector(`.${buttonClass}`);
  button.addEventListener("click", () => {
    togglePrinciple(principle);
    updateButtonState(buttonClass, type);
    initializeMap(type);
  });
}

setupButton("thermostat", "temperature", "temp-principle");
setupButton("humidity", "humidity", "wet-principle");
