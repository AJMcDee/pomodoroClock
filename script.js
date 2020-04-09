// Set default timers
// Use play button to start timer
// Display time in browser
// Have timer display an alert after first timer runs out, cue second timer, repeat first timer : until stop is pressed
// Have Session be the only word showing while timer is running, then break during break, until Stop button is pressed
// Reset goes back to 25/5
// Have arrows adjust timers

let sessionEntry = 25;
let breakEntry = 5;
let sessionTime = 5000 //25 minute default session time
let breakTime = breakEntry * 60 * 1000 //5 minute default break time
let timer
let currentTime
let deadline
let timeInterval

const playButton = document.getElementById("playButton");
const stopButton = document.getElementById("stopButton");
const clock = document.getElementById("clock");

function breakAlert(){ //Counts down until break
    alert("Take a break!")
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + breakTime);
    runClock(deadline)
    timer = setTimeout(sessionAlert, breakTime)
    return
};

function sessionAlert(){ //Counts down until session
    alert("Get back to work!")
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + sessionTime);
    runClock(deadline)
    timer = setTimeout(breakAlert, sessionTime)
    return
};

playButton.addEventListener("click", function(){
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + sessionTime);
    runClock(deadline)
    timer = setTimeout(breakAlert, sessionTime)

})

stopButton.addEventListener("click", function(){
    clearInterval(timer)
    clearInterval(timeInterval)
    clock.textContent = "00:00"
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
    }
}