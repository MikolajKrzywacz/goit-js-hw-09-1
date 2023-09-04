'use strict';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

Notify.init({ position: 'center-top' });

let timerTimestamp = 0;
let intervalId = null;

const btn = document.querySelector('[data-start');
const timerContainer = document.querySelector('div.timer');
const fieldContainers = document.querySelectorAll('.field');
const valueContainer = document.querySelectorAll('.value');
const valueDays = document.querySelector('[data-days]');
const valueHours = document.querySelector('[data-hours]');
const valueMinutes = document.querySelector('[data-minutes]');
const valueSeconds = document.querySelector('[data-seconds]');

const onLoad = () => {
  btn.disabled = true;
  timerContainer.style.display = 'flex';
  timerContainer.style.gap = '15px';
  timerContainer.style.marginTop = '15px';
  fieldContainers.forEach(el => {
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
  });
  valueContainer.forEach(el => {
    el.style.fontSize = '1.5em';
  });
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - new Date().getTime() <= 0) {
      Notify.failure('Please choose a date in the future');
      btn.disabled = true;
    } else {
      btn.disabled = false;
      timerTimestamp = selectedDates[0].getTime();
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  const days = value.days.toString().padStart(2, '0');
  const hours = value.hours.toString().padStart(2, '0');
  const minutes = value.minutes.toString().padStart(2, '0');
  const seconds = value.seconds.toString().padStart(2, '0');

  return { days, hours, minutes, seconds };
};

const timer = () => {
  btn.disabled = true;
  const timerCalculatedRaw = timerTimestamp - new Date().getTime();
  const timerCalculated = addLeadingZero(convertMs(timerCalculatedRaw));
  valueDays.textContent = timerCalculated.days;
  valueHours.textContent = timerCalculated.hours;
  valueMinutes.textContent = timerCalculated.minutes;
  valueSeconds.textContent = timerCalculated.seconds;
  if (timerCalculatedRaw <= 1000) {
    valueDays.textContent = '00';
    valueHours.textContent = '00';
    valueMinutes.textContent = '00';
    valueSeconds.textContent = '00';
    btn.disabled = false;
    clearInterval(intervalId);
    Notify.info('Timer finished!');
  }
};

const startTimer = () => {
  intervalId = setInterval(timer, 1000);
};

window.addEventListener('load', onLoad);
flatpickr('#datetime-picker', options);
btn.addEventListener('click', startTimer);
