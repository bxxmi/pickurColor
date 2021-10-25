'use strict';

const TODAY = new Date();

const colorPicker = document.querySelector('input[type="color"]');
const body = document.querySelector('body');
const moonIcon = document.querySelector('.fa-moon');
const clock = document.querySelector('.header-item.clock');
const date = document.querySelector('.header-item.date');
const createBtn = document.querySelector('.bookmark.create');
const modalArea = document.querySelector('.modal-overlay');

window.addEventListener('load', defaultSetting);
createBtn.addEventListener('click', openModal);

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
  const spanList = document.querySelectorAll('span');

  moonIcon.style.color = '#FCB738';
  colorPicker.style.backgroundColor = 'white';

  spanList.forEach(span => {
    span.style.color = 'white';
  });
}

function textBlack() {
  const spanList = document.querySelectorAll('span');

  moonIcon.style.color = '#7035DF';
  colorPicker.style.backgroundColor = 'black';

  spanList.forEach(span => {
    span.style.color = 'black';
  });
}

// 모달창 띄우기
function openModal() {
  modalArea.style.visibility = 'visible';

  const cancelBtn = document.querySelector('.modal-btns .cancel');
  cancelBtn.addEventListener('click', closeModal);
}

function closeModal() {
  modalArea.style.visibility = 'hidden';
}

modalArea.addEventListener('click', event => {
  if (event.target.classList.contains('modal-overlay')) {
    modalArea.style.visibility = 'hidden';
  } 
});

window.addEventListener('keyup', event => {
  if (modalArea.style.visibility === 'visible' && event.key === 'Escape') {
    modalArea.style.visibility = 'hidden';
  }
});

