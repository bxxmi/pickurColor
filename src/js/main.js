'use strict';

const colorPicker = document.querySelector('input[type="color"]');
const body = document.querySelector('body');
const spanList = document.querySelectorAll('span');
const moonIcon = document.querySelector('.fa-moon');

window.addEventListener('load', defaultColor);

// 모드 변경

// 디폴트 배경색
function defaultColor() {
  body.style.backgroundColor = colorPicker.value;
  
  colorPicker.addEventListener('input', changeColor);
}

// 배경색 제어
function changeColor(event) {
  const hexColor = event.target.value;
  body.style.backgroundColor = hexColor;

  hexToRGB(hexColor);
}

// 휘도 수치에 따른 텍스트 색상 제어
function hexToRGB(hex) {
  hex = hex.replace("#", "");
  
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);
  const luma = (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);

  luma < 127.5 ? textWhite() : textBlack(); 
}

function textWhite() {
  moonIcon.style.color = '#FCB738';
  colorPicker.style.backgroundColor = 'white';

  spanList.forEach(span => {
    span.style.color = 'white';
  });
}

function textBlack() {
  moonIcon.style.color = '#7035DF';
  colorPicker.style.backgroundColor = 'black';

  spanList.forEach(span => {
    span.style.color = 'black';
  });
}
