let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
function timer(seconds) {
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then)
  countDown = setInterval(() => {
    const secondLeft = Math.round((then - Date.now()) / 1000)
    if (secondLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTimeLeft(secondLeft);
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds/60);
  const remainderSeconds = seconds%60;
  const display = `${minutes}:${remainderSeconds<10?'0':''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
  console.log(minutes,remainderSeconds);
}
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent=`Be Back At ${hours}:${minutes<10?'0':''}${minutes}`
}
function startTimer(e) {
  const seconds = parseInt(this.dataset.time);
  timer(seconds)
}
buttons.forEach(button=>button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  timer(mins*60);
})
