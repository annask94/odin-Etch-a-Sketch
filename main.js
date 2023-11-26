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
  event.preventDefault();

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

  const divColor = document.querySelectorAll(".canvas_grid");

  divColor.forEach((div) => {
    div.addEventListener("click", () => {
      drawOnCanvas(div, modeChoice);
    });
  });

  canvasSizeDisplay.forEach((element) => {
    element.textContent = size;
  });
}

//DRAWING MODES

// SELECTORS

const colorPicker = document.querySelector('[data-name="settingsColorPicker"]');
const modePickBtn = document.querySelectorAll(".mode_picker");

//DEFAULT MODE
let modeChoice = "color";

//GET RANDOM RGB COLOR SELECT

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
    const randomColor = () => {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);

      const color = `rgb("${red}", ${green}, ${blue})`;
      return color;
    };
    div.style.backgroundColor = randomColor;
  } else if (modeChoice === "grayScale") {
  }
}

function getRandomColor() {}
