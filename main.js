// DEFAULT VALUES
const DEFAULT_SIZE = 16;

// SELECTORS
const sizeInputBtn = document.querySelector('[data-name="settingsSizeBtn"]');
const sizeInput = document.querySelector('[data-name="settingsSizeInput"]');
const canvasContainer = document.querySelector('[data-name="canvasContainer"]');
const canvasSizeDisplay = document.querySelectorAll(
  '[data-name="canvasCurrentSizeUI"]'
);
let divColor;

// DEFAULT SIZE

document.addEventListener("DOMContentLoaded", () => {
  const setDefaultSize = () => {
    sizeInput.value = DEFAULT_SIZE;
    chooseSize(new Event("click"));
  };

  setDefaultSize();
});

//SIZE PICKED BY USER

sizeInputBtn.addEventListener("click", chooseSize);

function chooseSize(event) {
  event?.preventDefault();

  let size = sizeInput.value;

  while (canvasContainer.firstChild) {
    canvasContainer.removeChild(canvasContainer.firstChild);
  }

  canvasContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvasContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const divPixel = document.createElement("div");
    divPixel.classList.add("canvas_grid");
    canvasContainer.appendChild(divPixel);
  }

  let divColor = document.querySelectorAll(".canvas_grid");

  divColor.forEach((div) => {
    div.addEventListener("mouseover", () => {
      drawOnCanvas(div, modeChoice);
    });
  });

  canvasSizeDisplay.forEach((element) => {
    element.textContent = size;
  });
}

//STYLE RESET

const clearGridBtn = document.querySelector(
  '[data-name="settingsClearTheCanvas"]'
);

clearGridBtn.addEventListener("click", () => {
  const divColor = document.querySelectorAll(".canvas_grid");

  divColor.forEach((div) => {
    div.style.background = "";
  });
});

//SHOW GRID
const showGridBtn = document.querySelector('[data-name="settingsShowGrid"]');
showGridBtn.classList.remove("active");

showGridBtn.addEventListener("click", () => {
  showGridBtn.classList.toggle("active");
  canvasContainer.classList.toggle("canvas_grid_show");
});

//DRAWING MODES

// SELECTORS

const colorPicker = document.querySelector('[data-name="settingsColorPicker"]');
const modePickBtn = document.querySelectorAll(".mode_picker");

//DEFAULT MODE
let modeChoice = "color";
// STORING CLICKS FOR GRAY SCALE MODE
const clickCountMap = new Map();
const maxClicks = 10;

// SELECT MODE
modePickBtn.forEach((button) => {
  button.addEventListener("click", () => {
    modeChoice = button.getAttribute("data-name");
    modePickBtn.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

function drawOnCanvas(div, modeChoice) {
  let pickedColor = colorPicker.value;

  if (modeChoice === "color") {
    div.style.backgroundColor = pickedColor;
  } else if (modeChoice === "rainbow") {
    const randomColor = getRandomColor();
    div.style.backgroundColor = randomColor;
  } else if (modeChoice === "greyScale") {
    const clickCount = (clickCountMap.get(div) || 0) + 1;
    clickCountMap.set(div, clickCount + 1);
    const currentClicks = clickCountMap.get(div);
    const opacity = currentClicks / maxClicks;
    div.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  } else {
    div.style.background = "none";
  }
}

//GET RANDOM RGB COLOR SELECT

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}
