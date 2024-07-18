function animationMap(location = "新竹市") {
  const taiwan = document.getElementById("taiwan");
  const paths = taiwan.querySelectorAll("path");
  paths.forEach((path) => {
    const areaId = path.getAttribute("data-name");
    const countyName = svgIdToCountyName[areaId];
    path.classList.remove("active");
    if (countyName === location) {
      path.classList.add("active");
    }
    path.addEventListener("click", function () {
      paths.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
    });
  });
}
