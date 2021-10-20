'use strict';

const TODAY = new Date();

const colorPicker = document.querySelector('input[type="color"]');
const body = document.querySelector('body');
const spanList = document.querySelectorAll('span');
const moonIcon = document.querySelector('.fa-moon');
const clock = document.querySelector('.header-item.clock');
const date = document.querySelector('.header-item.date');

window.addEventListener('load', defaultSetting);

// 모드 변경

// 디폴트 설정
function defaultSetting() {
  const span = document.createElement('span');

  // 시간
  const hour = TODAY.getHours() >= 10 ? TODAY.getHours() : '0' + TODAY.getHours();
  const minute = TODAY.getMinutes() >= 10 ? TODAY.getMinutes() : '0' + TODAY.getMinutes();

  span.textContent = `${hour}:${minute}`;
  clock.append(span);

  // 날짜

  // 배경색
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
