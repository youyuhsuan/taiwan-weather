async function getTemperature() {
  try {
    let response = await fetch("/weather/temperature");
    let responseData = await response.json();
    console.log(responseData.length);
    return responseData;
  } catch (error) {
    console.error("Error fetching temperature data:", error);
    return [];
  }
}

// 將溫度映射到顏色的函數
function getColorForTemperature(temperature) {
  const temp = parseFloat(temperature);
  const colorScale = [
    { temp: 30, color: [0, 255, 255] },
    { temp: 33, color: [0, 255, 0] },
    { temp: 36, color: [255, 255, 0] },
    { temp: 39, color: [255, 0, 0] },
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

// SVG ID到縣市名稱的映射
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

// 主函數
async function initializeMap() {
  // 獲取溫度數據
  const temperatureArray = await getTemperature();
  const temperatureData = temperatureArray.reduce((acc, curr) => {
    const [county, temp] = Object.entries(curr)[0];
    acc[county] = temp;
    return acc;
  }, {});

  console.log("Temperature data:", temperatureData);

  // 獲取所有路徑元素
  const paths = document.querySelectorAll("path");

  // 為每個路徑添加事件監聽器和設置顏色
  paths.forEach((path) => {
    const areaId = path.id;
    const countyName = svgIdToCountyName[areaId];
    const temperature = temperatureData[countyName];

    if (temperature) {
      // 設置顏色
      path.style.fill = getColorForTemperature(temperature);

      // 添加鼠標進入事件
      path.addEventListener("mouseenter", (e) => {
        document.getElementById("area-tag").textContent = countyName;
        document.getElementById("temperature").textContent = `${temperature}°C`;
      });
    }
  });
}

// 調用主函數
initializeMap();
