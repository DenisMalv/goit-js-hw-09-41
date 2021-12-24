const refs = {
    startBtn : document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    getRandomHexColor() { return `#${Math.floor(Math.random() * 16777215).toString(16)}` }
    
}
const { startBtn, stopBtn, getRandomHexColor} = refs
let intervalId = null
let isActive = null

startBtn.addEventListener('click', StartSwitchBackground)
stopBtn.addEventListener('click', StopSwitchBackground)
function StartSwitchBackground() {
    if (isActive) {
        return
    }
    isActive = true
    startBtn.disabled = true
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
        
        console.log(intervalId)
    },1000)
}

function StopSwitchBackground() {
    startBtn.disabled = false
    isActive = false
    clearInterval(intervalId)
}