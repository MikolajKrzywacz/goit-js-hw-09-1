// pobierz przyciski
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId; // zmienna do przechowywania ID intervalu

// ustaw funkcję dla przycisku "Start"
startButton.addEventListener('click', () => {
  startButton.disabled = true; // dezaktywuj przycisk "Start"
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

// ustaw funkcję dla przycisku "Stop"
stopButton.addEventListener('click', () => {
  startButton.disabled = false; // aktywuj przycisk "Start"
  clearInterval(intervalId); // zatrzymaj interval
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
