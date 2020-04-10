// Set default timers
// Use play button to start timer
// Display time in browser
// Have timer display an alert after first timer runs out, cue second timer, repeat first timer : until stop is pressed
// Have Session be the only word showing while timer is running, then break during break, until Stop button is pressed
// Stop puts everything to 0
// Pause toggles start/stop state
// Reset goes back to 25/5
// Have arrows adjust timers and display

let sessionEntry = 25;
let breakEntry = 5;
// let sessionTime = sessionEntry * 60000 //25 minute default session time
let sessionTime = 5000;
let breakTime = breakEntry * 60000 //5 minute default break time
let timer
let currentTime
let deadline
let timeInterval

const playButton = document.getElementById("playButton");
const stopButton = document.getElementById("stopButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const clock = document.getElementById("clock");

function breakCountdown(){
    alert("Take a break!")
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + breakTime);
    runClock(deadline)
    timer = setTimeout(sessionCountdown, breakTime)
    showAll();
    hideDuringBreak();
    return
};

function sessionCountdown(){
    alert("Get back to work!")
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + sessionTime);
    runClock(deadline)
    timer = setTimeout(breakCountdown, sessionTime)
    showAll()
    hideDuringSession();
    return
};

function hideElement(id) {
    document.getElementById(id).style.visibility = "hidden";
}

function showElement(id) {
    document.getElementById(id).style.visibility = "visible"
}

function hideDuringSession() {
    hideElement("downsesh");
    hideElement("break");
    hideElement("seshtime");
    hideElement("upsesh");
    hideElement("downbreak");
    hideElement("breaktime");
    hideElement("upbreak");
}

function hideDuringBreak() {
    hideElement("downsesh");
    hideElement("session");
    hideElement("seshtime");
    hideElement("upsesh");
    hideElement("downbreak");
    hideElement("breaktime");
    hideElement("upbreak");
}

function showAll() {
    showElement("downsesh");
    showElement("session");
    showElement("break")
    showElement("seshtime");
    showElement("upsesh");
    showElement("downbreak");
    showElement("breaktime");
    showElement("upbreak");
}

playButton.addEventListener("click", function(){
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + sessionTime);
    runClock(deadline)
    if (document.getElementById("session").style.visibility == "hidden") {
        hideDuringBreak()
    } else {
        hideDuringSession()
    }
    timer = setTimeout(breakCountdown, sessionTime)
})

stopButton.addEventListener("click", function(){
    clearInterval(timer)
    clearInterval(timeInterval)
    clock.textContent = "00:00"
    showAll()
})

pauseButton.addEventListener("click", function(){
    let clockValue = clock.textContent;
    clearInterval(timer)
    clearInterval(timeInterval)
    clock.textContent = clockValue;
    clockValue = clockValue.split(":");
    let pauseMinutes = clockValue[0] * 60000;
    let pauseSeconds = clockValue[1] * 1000;
    sessionTime = pauseSeconds + pauseMinutes;
})

function runClock(deadline) {

    function updateClock() {
        let timeRemaining = Date.parse(deadline) - Date.parse(new Date());
        let seconds = Math.floor( (timeRemaining/1000) % 60 );
        let minutes = Math.floor( (timeRemaining/1000/60) % 60 );
        clock.textContent = `${showPretty(minutes)}:${showPretty(seconds)}`
        if(timeRemaining <= 0 ){ clearInterval(timeInterval); }
    }
    updateClock();
    timeInterval = setInterval(updateClock, 1000);
}

function showPretty(value){
    if (value <= 9) {
        return "0" + value;
    } else {
        return value
    }
}