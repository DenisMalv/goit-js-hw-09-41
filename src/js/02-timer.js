// Описан в документации
import { offset } from '@popperjs/core';
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    inputDate: document.querySelector('#datetime-picker'),
    days:document.querySelector('span[data-days]'),
    hours:document.querySelector('span[data-hours]'),
    minutes:document.querySelector('span[data-minutes]'),
    seconds:document.querySelector('span[data-seconds]'),
}
const { btnStart, inputDate, days, hours, minutes, seconds } = refs
btnStart.disabled = true
console.log(btnStart)
console.log(inputDate)
console.log(days)
console.log(hours)
console.log(minutes)
console.log(seconds)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const nowDate = Date.parse(options.defaultDate)
        const pickedDate = Date.parse(selectedDates[0])
        const ress =  pickedDate - nowDate
    console.log(Date.parse(options.defaultDate),'текущий')
    console.log(Date.parse(selectedDates[0]),'выбранный');
        if (ress > 0) {
            console.log(ress);
        }
    
  },
};
flatpickr("#datetime-picker", options);
