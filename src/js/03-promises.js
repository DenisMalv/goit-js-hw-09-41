import throttle from 'lodash/throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit)
form.addEventListener('input', throttle(onFormInput,300))

let formData = {}

function onFormSubmit(event) {
  event.preventDefault();
  const { delay: firstDelay, step, amount } = formData
  console.log(firstDelay, step, amount)
  if (firstDelay < 0 || step < 0 || amount <0) {
    return Notify.failure(`
❗ You must only enter positive values, otherwise it is nonsense. 🤭`);
  }
  for (let position = 0; position < amount; position += 1){
    let delay = (+firstDelay) + (+step) * position
    
    console.log({position,delay})
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
  formData = {}
  form.reset()
}

// let delay = (+firstDelay)
//     if (position !== 0) {
//       delay +=(+step)*position
//     }

function onFormInput(event) {
  formData[event.target.name] = event.target.value
  console.log(formData)
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
          // Resolve
          resolve({ position, delay })
      } else {
          // Reject
          reject({ position, delay })
      }
    }, delay)
  })
}