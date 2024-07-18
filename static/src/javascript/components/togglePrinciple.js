function togglePrinciple(principle) {
  if (currentPrinciple === principle) {
    isActive = !isActive;
  } else {
    isActive = true;
    if (currentPrinciple) {
      document.querySelector(`.${currentPrinciple}`).style.display = "none";
    }
    currentPrinciple = principle;
  }

  document.querySelector(`.${principle}`).style.display = isActive
    ? "block"
    : "none";
}

function updateButtonState(activeButtonClass, type) {
  const buttons = document.querySelectorAll(".thermostat, .humidity");
  buttons.forEach((button) => {
    if (button.classList.contains(activeButtonClass)) {
      button.classList.toggle("active", isActive);
    } else {
      button.classList.remove("active");
    }
  });
}
