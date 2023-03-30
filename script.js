'use strict';
//color picker documentation: https://jscolor.com/examples/

////////////////////////SELECTORS
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');
const generateBtn = document.getElementById('generateBtn');
const eraseBtn = document.getElementById('erase');
const drawBtn = document.getElementById('draw');

const widthDisplay = document.getElementById('width-display');
const heightDisplay = document.getElementById('height-display');

const widthInput = document.getElementById('width-slider');
const heightInput = document.getElementById('height-slider');
const colorInputPencil = document.getElementById('color-slider-pencil');
const colorInputGrid = document.getElementById('color-slider-grid');

const pixelsArr = document.getElementsByClassName('pixel-item');
const pixelBoard = document.getElementById('pixel-board');
const pixelTable = document.getElementById('pixel-table');

let colorIDPencil;
let colorIDGrid;

////////////////////////////FUNCTIONS
//get color based on user input on color selector
const getColorPencil = function () {
  getColorGrid();
  colorIDPencil = document
    .querySelector('#color-slider-pencil')
    .jscolor.toString();
};

const getColorGrid = function () {
  colorIDGrid = document.querySelector('#color-slider-grid').jscolor.toString();
  for (var i = 0; i < pixelsArr.length; i++) {
    pixelsArr[i].style.borderColor = colorIDGrid;
  }
};

//get height value based on user input on height selector
const getHeight = function (value) {
  heightDisplay.innerText = `Grid Height: ${value}`;
};

//get width value based on user input on width selector
const getWidth = function (value) {
  widthDisplay.innerText = `Grid Width: ${value}`;
};

//generate grid size based on user input + button click
generateBtn.addEventListener('click', function () {
  const rows = heightInput.value;
  const columns = widthInput.value;
  let gridContent = '';
  let r = 1;

  while (r <= rows) {
    gridContent += `<tr class="pixel-row">`;
    for (let c = 1; c <= columns; c++) {
      gridContent += `<td class="pixel-item"></td>`;
    }
    gridContent += `</tr>`;
    r += 1;
  }

  pixelTable.innerHTML = '';
  pixelTable.insertAdjacentHTML('afterbegin', gridContent);

  getColorPencil();
  drawConditions();
});

//functionality for draw button
drawBtn.addEventListener('click', function () {
  getColorPencil();
  drawConditions();
});

const drawConditions = function () {
  for (var i = 0; i < pixelsArr.length; i++) {
    let pixel = pixelsArr[i];
    pixel.addEventListener('click', function () {
      pixel.style.cssText = `background-color:${colorIDPencil}`;
      for (var i = 0; i < pixelsArr.length; i++) {
        pixelsArr[i].style.borderColor = colorIDGrid;
      }
    });
  }
};

//functionality for eraser button
eraseBtn.addEventListener('click', function () {
  for (var i = 0; i < pixelsArr.length; i++) {
    let pixel = pixelsArr[i];
    pixel.addEventListener('click', function () {
      pixel.style.cssText = `background-color:'white'`;
    });
  }
});

//clear button resets board to all white
clearBtn.addEventListener('click', function () {
  for (var i = 0; i < pixelsArr.length; i++) {
    let pixel = pixelsArr[i];
    pixel.style.cssText = `background-color:'white'`;
  }
  getColorPencil();
  clearedTextSaved();
});

/////DEFAULT CONDITIONS
window.addEventListener('load', function () {
  getColorPencil();
  drawConditions();
});

/////////////////////NOT YET IMPLEMENTED

//functionality for save button
//use localStorage API
// saveBtn.addEventListener('click', function () {});

//functionality for export button
//https://stackoverflow.com/questions/10721884/render-html-to-an-image
// exportBtn.addEventListener('click', function () {});

//make two color selectors - one for the pen color, and one for the gridline color

//APIFlash - element - capture a screenshot of the element matched by teh css selector
