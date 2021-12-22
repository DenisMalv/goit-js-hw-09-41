// Описан в документации
import { offset } from '@popperjs/core';
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { set } from 'lodash';

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    inputDate: document.querySelector('#datetime-picker'),
    day:document.querySelector('span[data-days]'),
    hour:document.querySelector('span[data-hours]'),
    minute:document.querySelector('span[data-minutes]'),
    second: document.querySelector('span[data-seconds]'),
}

const { btnStart,btnStop, inputDate, day, hour, minute, second } = refs
btnStart.disabled = true
btnStop.disabled = true
let userDateTime = null
let timerId = null
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            closePlaceholder()
            showPlaceholder('Please choose a date in the future','danger')
            console.log("Please choose a date in the future")
            btnStart.disabled = true
            btnStop.disabled = true
            return
        }
        closePlaceholder()
        userDateTime = selectedDates[0]
        btnStart.disabled = false
        btnStart.addEventListener('click', onClickBtnStart)       
        btnStop.addEventListener('click', onClickBtnStop)       
    },
};
flatpickr("#datetime-picker", options);

    
function onClickBtnStart() {
    const { days, hours, minutes, seconds } = convertMs(userDateTime - Date.now())
    day.textContent = pad(days)
    hour.textContent = pad(hours)
    minute.textContent = pad(minutes)
    second.textContent = pad(seconds)
    inputDate.disabled = true
    btnStart.disabled = true
    btnStop.disabled = false
    showPlaceholder('You timer is started, have a nice day','success')
    timerId = setInterval(() => {
        const currentDateTime = Date.now()
        let timerEnd = userDateTime - currentDateTime
        if (timerEnd <= 0) {
            clearInterval(timerId);
            timerEnd = 0;
        }
        const { days, hours, minutes, seconds } = convertMs(timerEnd)
        day.textContent = pad(days)
        hour.textContent = pad(hours)
        minute.textContent = pad(minutes)
        second.textContent = pad(seconds)
        
    }, 1000)
        
};

function pad(string) {
   return string.toString().padStart(2,'0')    
}

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
    // console.log({ days, hours, minutes, seconds })
  return { days, hours, minutes, seconds };
}

// =============== additional content =================
// 1) placeholder on error date.
// 2) placeholder on start timer.
// 3) placeholder on stop timer
// 4) close placeholder on button or after live 3 sec.
// 5) add stop button
const alertPlaceholder = document.getElementById('liveAlert')
const wrapper = document.createElement('div')
let closePlaceholderTimerID = null

function showPlaceholder(message,type) {
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
    const btnAlert = document.querySelector('button[data-bs-dismiss="alert"]')
    btnAlert.addEventListener('click', closePlaceholder)
    closePlaceholderTimerID = setTimeout(closePlaceholder, 3000)
}
function closePlaceholder() {
    if (wrapper) {
        clearTimeout(closePlaceholderTimerID)
    }
        return  wrapper.innerHTML = ''
    }

function onClickBtnStop() {
    showPlaceholder('You timer stoped','warning')
    inputDate.disabled = false
    btnStart.disabled = true
    btnStop.disabled = true
    clearInterval(timerId)
    day.textContent = '00'
    hour.textContent = '00'
    minute.textContent ='00'
    second.textContent = '00'

}
