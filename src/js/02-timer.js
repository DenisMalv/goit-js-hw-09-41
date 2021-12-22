// Описан в документации
import { offset } from '@popperjs/core';
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { set } from 'lodash';

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    inputDate: document.querySelector('#datetime-picker'),
    day:document.querySelector('span[data-days]'),
    hour:document.querySelector('span[data-hours]'),
    minute:document.querySelector('span[data-minutes]'),
    second: document.querySelector('span[data-seconds]'),
    
    
}
const { btnStart, inputDate, day, hour, minute, second } = refs
btnStart.disabled = true
let isActive = false
let hz 
let ress = 0
console.log(btnStart)
console.log(inputDate)
console.log(day)
console.log(hour)
console.log(minute)
console.log(second)
let pickedDate
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    clickOpens:true,
    onClose(selectedDates) {
        const nowDate = Date.parse(options.defaultDate)
        pickedDate = Date.parse(selectedDates[0])
            console.log(Date.parse(options.defaultDate),'текущий')
            console.log(Date.parse(selectedDates[0]), 'выбранный');
            ress = pickedDate - nowDate
        if (ress < 0) {
            alert("Please choose a date in the future")
            btnStart.disabled = true
            return
        }
        // const { days, hours, minutes, seconds } = convertMs(ress)
        // console.log(days,hours,minutes,seconds)
        btnStart.disabled = false
        this.clickOpens = false
        // console.log(convertMs(ress).days)
        // console.log(convertMs(ress).hours)
        // console.log(convertMs(ress).minutes)
        // console.log(convertMs(ress).seconds)

        btnStart.addEventListener('click', onClickBtnStart)
    },
};

flatpickr("#datetime-picker", options);

        
function onClickBtnStart() {
        if (isActive) {
        return
    }
        btnStart.disabled=true
        isActive = true
    
    setInterval(() => {
        const three = Date.now()
        console.log(three)
        const reees = pickedDate - three
        console.log(reees)
        const { days, hours, minutes, seconds } = convertMs(reees)
        console.log(days, hours, minutes, seconds)
        day.textContent = days
        hour.textContent = hours
        minute.textContent = minutes
        second.textContent = seconds
    }, 1000)
        
}
console.log(hz)

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


// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//     onClose(selectedDates) {
//         const nowDate = Date.parse(options.defaultDate)
//         pickedDate = Date.parse(selectedDates[0])
//             console.log(Date.parse(options.defaultDate),'текущий')
//             console.log(Date.parse(selectedDates[0]), 'выбранный');
//             ress = pickedDate - nowDate
//             const { days,hours,minutes,seconds}= convertMs(ress)
//             console.log(days,hours,minutes,seconds)
        
//         if (ress < 0) {
//             alert("Please choose a date in the future")
//             return
//         }
//         btnStart.disabled = false
//         console.log(convertMs(ress).days)
//         console.log(convertMs(ress).hours)
//         console.log(convertMs(ress).minutes)
//         console.log(convertMs(ress).seconds)
//         btnStart.addEventListener('click', onClickBtnStart)
       
//   },
// };

// flatpickr("#datetime-picker", options);

        
// function onClickBtnStart() {
//     const one = Date.now()
//     const two = pickedDate
//     console.log(one)
//     console.log(two)
//     setInterval(() => {
//         const three = Date.now()
//         console.log(three)
//         const reees = two - three
//         console.log(reees)
//         const { days, hours, minutes, seconds } = convertMs(reees)
//         console.log(days, hours, minutes, seconds)
//         day.textContent = days
//         hour.textContent = hours
//         minute.textContent = minutes
//         second.textContent = seconds
//     }, 1000)
//     btnStart.disabled=true
//         // console.log(event)
        
// }
// console.log(hz)