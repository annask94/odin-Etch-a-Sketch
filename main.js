// CREATE DIV TEST

// CATCH USER INPUT

// SELECTORS
const sizeInputBtn = document.querySelector('[data-name="settingsSizeBtn"]');
const sizeInput = document.querySelector('[data-name="settingsSizeInput"]');
const canvasContainer = document.querySelector('[data-name="canvasContainer"]');

// EVENT LISTENERS

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
}
