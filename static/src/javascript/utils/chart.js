let weekRain = [];
let lowTempObj = [];
let highTempObj = [];
let days = [];
let weeks = ["日", "一", "二", "三", "四", "五", "六"];
let rainChartInstance;
let weekTempChartInstance;

async function getWeather(location) {
  try {
    const response = await fetch(`/weather/week/${location}`);

    if (!response.ok) {
      alert("無相關資料");
    }
    const data = await response.json();
    weekRain = [];
    lowTempObj = [];
    highTempObj = [];

    const searchInputValue = document.querySelector(".search-input");

    searchInputValue.value = "";

    const rainData = data[0]["12小時降雨機率"];
    const lowTemp = data[8]["最低溫度"];
    const highTemp = data[12]["最高溫度"];
    const lowBodyTemp = data[11]["最低體感溫度"][0].data.elementValue[0].value;
    const highBodyTemp = data[5]["最高體感溫度"][0].data.elementValue[0].value;

    const dayDescript =
      data[10]["天氣預報綜合描述"][0].data.elementValue[0].value;

    // 雨量(三天早晚)
    for (let i = 0; i < 6; i++) {
      let startTime = rainData[i].data.startTime;
      let rainTime = new Date(startTime).getHours();
      let rainMonth = new Date(startTime).getMonth() + 1;
      let rainDate = new Date(startTime).getDate();
      let rainFullDay = rainMonth + "/" + rainDate;
      let rainPercentage = rainData[i].data.elementValue[0].value;
      let timeSwitch = rainTime === 18 ? "晚" : "早";

      weekRain.push({
        date: rainFullDay + "(" + timeSwitch + ")",
        rain: rainPercentage,
      });
    }

    // 一週溫度(最低溫)
    lowTemp.forEach((lowTempData) => {
      let lowTempValue = lowTempData.data.elementValue[0].value;
      let startTime = lowTempData.data.startTime;
      let weekTime = new Date(startTime).getHours();
      let weekDay = new Date(startTime).getDay();
      let day = weeks[weekDay];
      let dailySwitch = weekTime === 18 ? "晚" : "早";
      lowTempObj.push({
        day: day + "(" + dailySwitch + ")",
        lowTemp: lowTempValue,
      });
    });

    // 一週溫度(最高溫)
    highTemp.forEach((highTempData) => {
      let highTempValue = highTempData.data.elementValue[0].value;
      let startTime = highTempData.data.startTime;
      let weekTime = new Date(startTime).getHours();
      let weekDay = new Date(startTime).getDay();
      let day = weeks[weekDay];
      let dailySwitch = weekTime === 18 ? "晚" : "早";
      highTempObj.push({
        day: day + "(" + dailySwitch + ")",
        highTemp: highTempValue,
      });
    });
    createDescription(dayDescript, location);
    getRainWeatherCard(weekRain);
    getTempLines(lowTempObj, highTempObj);
    createBodyProgress(lowBodyTemp, highBodyTemp);
  } catch (error) {
    console.error(error);
  }
}

//  雨量圖表
const rainChart = document.getElementById("rain-chart");

function getRainWeatherCard(data) {
  const rainData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "每週雨量",
        data: data.map((item) => item.rain),
        borderWidth: 1,
        hoverBorderWidth: 2,
        backgroundColor: "rgba(72, 198, 239, 0.2)",
        maxBarThickness: 100,
      },
    ],
  };

  const rainOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "早晚預估降雨機率",
        color: "#000000",
        font: {
          size: 24,
          family: "Noto Sans TC",
        },
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return "降雨機率：" + context.parsed.y + "%";
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(data.map((item) => item.rain)) + 10,
      },
    },
  };

  if (rainChartInstance) {
    rainChartInstance.destroy();
  }
  rainChartInstance = new Chart(rainChart, {
    type: "bar",
    data: rainData,
    options: rainOptions,
  });
}

// 一週溫度曲線
const weekTempChart = document.getElementById("week-temp-chart");
function getTempLines(lowTempObj, highTempObj) {
  const values = lowTempObj.map((item) => item.day);
  const weekData = {
    labels: values,
    datasets: [
      {
        label: "最低溫度",
        data: lowTempObj.map((item) => item.lowTemp),
        borderColor: "rgba(72, 198, 239, 0.8)",
        fill: false,
      },
      {
        label: "最高溫度",
        data: highTempObj.map((item) => item.highTemp),
        borderColor: "rgba(249, 116, 143, 0.6)",
        fill: false,
      },
    ],
  };
  const weekOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "早晚預估氣溫",
        color: "#000000",
        font: {
          size: 24,
          family: "Noto Sans TC",
        },
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return "溫度：" + context.parsed.y + "°C";
          },
        },
      },
    },
  };

  if (weekTempChartInstance) {
    weekTempChartInstance.destroy();
  }
  weekTempChartInstance = new Chart(weekTempChart, {
    type: "line",
    data: weekData,
    options: weekOptions,
  });
}

function createBodyProgress(lowBodyTemp, highBodyTemp) {
  let maxAtText = document.getElementById("maxAT");
  maxAtText.textContent = highBodyTemp + "°C";
  let maxAtBar = document.getElementById("maxAtBar");
  maxAtBar.style.width = highBodyTemp + "%";

  let minAtText = document.getElementById("minAT");
  minAtText.textContent = lowBodyTemp + "°C";
  let minAtBar = document.getElementById("minAtBar");
  minAtBar.style.width = lowBodyTemp + "%";
}

function createDescription(dayDescript, location) {
  let cityName = document.getElementById("city-name");
  let description = document.getElementById("dayDes");
  cityName.textContent = location;
  description.textContent = dayDescript;
}

document.addEventListener("DOMContentLoaded", (e) => {
  const selectCity = document.getElementById("city");
  const searchBtn = document.getElementById("search-button");
  let searchInput = document.querySelector(".search-input");

  selectCity.addEventListener("change", () => {
    let clickCity = selectCity.value;
    searchInput.value = clickCity;
    if (searchInput.value !== "") {
      search(searchInput.value);
      animationMap(searchInput.value);
      selectCity.value = "";
    } else {
      alert("請輸入縣市");
    }
  });

  searchBtn.addEventListener("click", () => {
    let typeInput = searchInput.value;
    if (typeInput !== "") {
      search(typeInput);
      animationMap(typeInput);
    } else {
      alert("請輸入縣市");
    }
  });

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      let typeInput = searchInput.value;
      if (typeInput !== "") {
        search(typeInput);
        animationMap(typeInput);
      } else {
        alert("請輸入縣市");
      }
    }
  });
});

function search(searchInput) {
  const mappingsWords = {
    基隆: "基隆市",
    臺北: "臺北市",
    台北: "臺北市",
    台北市: "臺北市",
    新北: "新北市",
    桃園: "桃園市",
    臺中: "臺中市",
    台中: "臺中市",
    台中市: "臺中市",
    臺南: "臺南市",
    台南: "臺南市",
    台南市: "臺南市",
    高雄: "高雄市",
    新竹: "新竹市",
    苗栗: "苗栗縣",
    彰化: "彰化縣",
    南投: "南投縣",
    雲林: "雲林縣",
    嘉義: "嘉義市",
    嘉義縣: "嘉義縣",
    屏東: "屏東縣",
    宜蘭: "宜蘭縣",
    花蓮: "花蓮縣",
    臺東: "臺東縣",
    台東: "臺東縣",
    台東縣: "臺東縣",
    澎湖: "澎湖縣",
    金門: "金門縣",
    馬祖: "馬祖縣",
  };

  if (mappingsWords[searchInput]) {
    searchInput = mappingsWords[searchInput];
  }
  getWeather(searchInput);
  getHeroData(searchInput);
}

// 初始搜尋渲染
const searchWord = "新竹市";
getWeather(searchWord);
