// 濕度
const wetData = {
  labels: ["濕度"],
  datasets: [
    {
      label: "濕度",
      data: [68, 32],
      backgroundColor: ["rgb(255, 99, 132)", "rgba(0, 0, 0, 0)"],
      hoverOffset: 4,
    },
  ],
};

const wetConfig = {
  type: "doughnut",
  data: wetData,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.raw !== 0) {
              return tooltipItem.label + ": " + tooltipItem.raw + "%";
            }
            return null;
          },
        },
      },
    },
  },
};
// const wetChart = document.getElementById("wet-chart").getContext("2d");
// new Chart(wetChart, wetConfig);

// 體感溫度
const bodyData = {
  labels: ["體感溫度"],
  datasets: [
    {
      label: "溫度",
      data: [38, 62],
      backgroundColor: ["rgb(37, 150, 190)", "rgba(0, 0, 0, 0)"],
      hoverOffset: 4,
    },
  ],
};

const bodyConfig = {
  type: "doughnut",
  data: bodyData,
};

// const bodyChart = document.getElementById("body-chart").getContext("2d");
// new Chart(bodyChart, bodyConfig);

// 一週溫度曲線
// const weekLabels = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];
// const weekData = {
//   labels: weekLabels,
//   datasets: [
//     {
//       label: "一週溫度曲線",
//       data: [30, 29, 32, 33, 36, 28, 26],
//       fill: false,
//       tension: 0.1,
//     },
//   ],
// };

// const weekConfig = {
//   type: "line",
//   data: weekData,
// };

let weekRain = [];
let lowTempObj = [];
let highTempObj = [];
let days = [];

async function getWeather() {
  try {
    const location = "臺北市";
    const response = await fetch(
      `http://127.0.0.1:8000/weather/week/${location}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    let dataArray = data.records.locations[0].location[0].weatherElement;
    console.log(dataArray);
    const rainData = dataArray[0].time;
    const lowTemp = dataArray[8].time;
    const highTemp = dataArray[12].time;

    for (let i = 0; i < 6; i++) {
      let rainTime = new Date(rainData[i].startTime).getHours();
      let rainMonth = new Date(rainData[i].startTime).getMonth() + 1;
      let rainDate = new Date(rainData[i].startTime).getDate();
      let rainFullDay = rainMonth + "/" + rainDate;
      let rainPercentage = rainData[i].elementValue[0].value;
      let dailySwitch = rainTime === 18 ? "晚" : "早";

      weekRain.push({
        date: rainFullDay + "(" + dailySwitch + ")",
        rain: rainPercentage,
      });
    }

    lowTemp.forEach((lowTempData) => {
      let lowTempValue = lowTempData.elementValue[0].value;
      let weekTime = new Date(lowTempData.startTime).getHours();
      let weekDay = new Date(lowTempData.startTime).getDay();
      let weeks = ["日", "一", "二", "三", "四", "五", "六"];
      let day = weeks[weekDay];
      let dailySwitch = weekTime === 18 ? "晚" : "早";
      lowTempObj.push({
        day: day + "(" + dailySwitch + ")",
        lowTemp: lowTempValue,
      });
    });

    highTemp.forEach((highTempData) => {
      let highTempValue = highTempData.elementValue[0].value;
      highTempObj.push({ highTemp: highTempValue });
    });

    getRainWeatherCard(weekRain);
    getTempLines(lowTempObj, highTempObj);

    console.log("最低溫", lowTempObj);
    console.log("最高溫", highTempObj);

    console.log(weekRain);
  } catch (error) {
    console.error(error);
  }
}

getWeather();

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
      },
    ],
  };

  const rainOptions = {
    plugins: {
      title: {
        display: true,
        text: "預估雨量",
        color: "#000000",
        font: {
          size: 16,
          family: "Noto Sans TC",
        },
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return "雨量：" + context.parsed.y + "%";
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  new Chart(rainChart, {
    type: "bar",
    data: rainData,
    options: rainOptions,
  });
}

// 一週溫度曲線
const weekTempChart = document
  .getElementById("week-temp-chart")
  .getContext("2d");
function getTempLines(lowTempObj, highTempObj) {
  const xValues = lowTempObj.map((item) => item.day);
  try {
    new Chart(weekTempChart, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: "最低溫度",
            data: lowTempObj.map((item) => item.lowTemp),
            borderColor: "rgb(255, 99, 132)",
            fill: false,
          },
          {
            label: "最高溫度",
            data: highTempObj.map((item) => item.highTemp),
            borderColor: "rgb(37, 150, 190)",
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false },
        plugins: {
          title: {
            display: true,
            text: "每日早晚氣溫",
            color: "#000000",
            font: {
              size: 16,
              family: "Noto Sans TC",
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function createTempCard(data) {}
