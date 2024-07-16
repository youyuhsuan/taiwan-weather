//  雨量圖表
const rainChart = document.getElementById("rain-chart");
const rainData = {
  labels: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"],
  datasets: [
    {
      label: "每週雨量",
      data: [23, 35, 27, 38, 15, 21, 32],
      borderWidth: 1,
      hoverBorderWidth: 2,
    },
  ],
};

const rainOptions = {
  plugins: {
    title: {
      display: true,
      text: "每週雨量",
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
const wetChart = document.getElementById("wet-chart").getContext("2d");
new Chart(wetChart, wetConfig);

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

const bodyChart = document.getElementById("body-chart").getContext("2d");
new Chart(bodyChart, bodyConfig);

// 一週溫度曲線
const weekLabels = ["D1", "D2", "D3", "D4", "D5", "D6", "D7"];
const weekData = {
  labels: weekLabels,
  datasets: [
    {
      label: "一週溫度曲線",
      data: [30, 29, 32, 33, 36, 28, 26],
      fill: false,
      tension: 0.1,
    },
  ],
};

const weekConfig = {
  type: "line",
  data: weekData,
};

const weekTempChart = document
  .getElementById("week-temp-chart")
  .getContext("2d");
new Chart(weekTempChart, weekConfig);
