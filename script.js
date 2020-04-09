// Set default timers
// Use play button to start timer
// Display time in browser
// Have timer display an alert after first timer runs out, cue second timer, repeat first timer : until stop is pressed
// Have Session be the only word showing while timer is running, then break during break, until Stop button is pressed
// Reset goes back to 25/5
// Have arrows adjust timers

let sessionTime = 25 * 60 * 1000 //25 minute default session time
let breakTime = 5 * 60 * 1000 //5 minute default break time
let sessionTimer = 25 * 60 * 1000 //25 minute default session timer
let breakTimer = 5 * 60 * 1000 //5 minute default break timer
let currentTime
let deadline

const playButton = document.getElementById("playButton");
const clock = document.getElementById("clock");


function breakAlert(){ //Counts down until break IE SESSION COUNTER
    alert("Take a break!")
    breakTimer = setTimeout(sessionAlert, breakTime)
    return
};

function sessionAlert(){ //Counts down until session IE BREAK COUNTER
    alert("Get back to work!")
    clock.textContent = ""
    sessionTimer = setTimeout(breakAlert, sessionTime)
    return
};

playButton.addEventListener("click", function(){
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + sessionTime);
    runClock(deadline)
    setTimeout(breakAlert, sessionTime)
})



function runClock(deadline) {
    function updateClock() {
        let timeRemaining = Date.parse(deadline) - Date.parse(new Date());
        let seconds = Math.floor( (timeRemaining/1000) % 60 );
        let minutes = Math.floor( (timeRemaining/1000/60) % 60 );
        clock.textContent = `${minutes}:${seconds}`
        if(timeRemaining.total<=0){ clearInterval(timeInterval); }
    }
    updateClock();
    let timeInterval = setInterval(updateClock, 1000);
}
