'use strict';

const today = new Date();
const colorPicker = document.querySelector('input[type="color"]');
const body = document.querySelector('body');
const moonIcon = document.querySelector('.fa-moon');
const clock = document.querySelector('.header-item.clock > span');
const date = document.querySelector('.header-item.date > span');
const searchBar = document.querySelector('input[type="search"]');
const bookmarkWrap = document.querySelector('.bookmark-items-wrap');
const bookmarkList = document.querySelector('.bookmark-list');
const matchingResult = document.querySelector('.bookmark-matching');
const bookmarkItems = document.querySelectorAll('.bookmark.item');
const createBtn = document.querySelector('.bookmark.create');
const modalArea = document.querySelector('.modal-overlay');
const nameBar = document.querySelector('.nameBar');
const urlBar = document.querySelector('.urlBar');

window.addEventListener('load', defaultSetting);
searchBar.addEventListener('keyup', searchObject);
createBtn.addEventListener('click', openModal);

// 홈페이지 첫 진입 시
function defaultSetting() {
  // 시간 호출
  getTime();
  setInterval(getTime, 1000);

  // 날짜 호출
  getDate();

  // 배경색
  body.style.backgroundColor = colorPicker.value;
  colorPicker.addEventListener('input', changeColor);
}

// 시간 제어
function getTime() {
  const nowHour = today.getHours();
  const nowMinute = today.getMinutes();
  const nowTime = timeFormatChange(nowHour, nowMinute);

  clock.textContent = nowTime;
}

// 시간 포맷 변경
function timeFormatChange(hour, minute) {
  const getHour = hour < 10 ? '0' + hour : hour;
  const getMinute = minute < 10 ? '0' + minute : minute;

  return `${getHour}:${getMinute}`;
}

// 날짜 제어
function getDate() {
  const nowDate = today.getDate() + 'th';
  const nowMonth = today.getMonth() + 1;
  const nowDay = dateFormatChange(nowDate, nowMonth);

  date.textContent = nowDay;
}

// 날짜 포맷 변경
function dateFormatChange(date, month) {
  const monthArray = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const getDate = date < 10 ? '0' + date : date;
  let getMonth = month;

  monthArray.forEach((month, index) => {
    if (index + 1 === getMonth) getMonth = month;
  });

  return `${getDate}/${getMonth}`
}

// 찾는 기능
function searchObject(event) {  
  const searchValue = searchBar.value;

  bookmarkItems.forEach(item => {
    const itemValue = item.textContent.toLowerCase();

    if (itemValue.includes(searchValue)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });

  // 구글 검색
  if (event.key === 'Enter') {
    const searchURL = `https://www.google.com/search?q=${searchBar.value}`;
    window.open(searchURL);
  } 
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

// 모달창 띄움, 끄기 제어
function openModal() {
  modalArea.style.visibility = 'visible';

  const cancelBtn = document.querySelector('.modal-btns .cancel');
  cancelBtn.addEventListener('click', closeModal);

  const submitBtn = document.querySelector('.modal-btns .submit');
  submitBtn.addEventListener('click', createBookmark);
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

// 모달창에 작성한 정보 북마크 리스트에 추가하기
function createBookmark() {
  const nameVal = nameBar.value;
  const urlVal = urlBar.value;

  const bookDiv = document.createElement('div');
  const bookURL = document.createElement('a');

  bookDiv.classList.add('bookmark', 'item');
  bookURL.classList.add()
  bookURL.href = urlVal;
  bookURL.textContent = nameVal;

  bookDiv.append(bookURL);
  bookmarkList.append(bookDiv);

  nameBar.innerHTML = '';
  urlBar.innerHTML = '';

  closeModal();
}