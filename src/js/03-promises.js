'use strict';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({ useIcon: false });

const inputDelay = document.querySelector(['[name=delay]']);
const inputStep = document.querySelector(['[name=step]']);
const inputAmount = document.querySelector(['[name=amount]']);
const submitBtn = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }

      if (position === parseInt(inputAmount.value)) {
        submitBtn.disabled = false;
      }
    }, delay);
  });
}

const submitPromise = event => {
  event.preventDefault();

  if (
    inputAmount.value === '' ||
    inputDelay.value === '' ||
    inputStep.value === ''
  ) {
    Notify.failure('❌ All fields must be filled');
    return;
  }

  if (
    parseInt(inputAmount.value) < 0 ||
    parseInt(inputDelay.value) < 0 ||
    parseInt(inputStep.value) < 0
  ) {
    Notify.failure('❌ A value could not be negative');
    return;
  }

  if (parseInt(inputAmount.value) === 0) {
    Notify.failure('❌ An amount must be greater than 0');
    return;
  }

  submitBtn.disabled = true;

  for (let i = 0; i < parseInt(inputAmount.value); i++) {
    const position = i + 1;
    const delay = parseInt(inputDelay.value) + inputStep.value * i;

    createPromise(position, delay)
      .then(resolve => {
        Notify.success(resolve);
      })
      .catch(reject => {
        Notify.failure(reject);
      });
  }
};

submitBtn.addEventListener('click', submitPromise);
