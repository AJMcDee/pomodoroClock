let timer
let currentTime
let deadline
let timeInterval

const playButton = document.getElementById("playButton");
const stopButton = document.getElementById("stopButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const clock = document.getElementById("clock");
const downseshButton = document.getElementById("downsesh");
const upseshButton = document.getElementById("upsesh");
const downbreakButton = document.getElementById("downbreak");
const upbreakButton = document.getElementById("upbreak");
const splat = document.getElementById("splat");
let sessionEntry = document.getElementById("seshtime").textContent;
let breakEntry = document.getElementById("breaktime").textContent;
document.getElementById("session").style.visibility = "visible";
document.getElementById("break").style.visibility = "visible";

let sessionTime = sessionEntry * 60000;
let breakTime = breakEntry * 60000 //5 minute default break time



// Up- and down-arrow functionality

downseshButton.addEventListener("click", function() {
    (sessionEntry > 1) ? sessionEntry = sessionEntry - 1 : sessionEntry = 1;
    document.getElementById("seshtime").textContent = `${sessionEntry}`;
    return sessionEntry
})
upseshButton.addEventListener("click", function() {
    sessionEntry = parseInt(sessionEntry) + 1;
    document.getElementById("seshtime").textContent = `${sessionEntry}`;
    return sessionEntry
})
downbreakButton.addEventListener("click", function() {
    (breakEntry > 1) ? breakEntry = breakEntry - 1 : breakEntry = 1;    
    document.getElementById("breaktime").textContent = `${breakEntry}`;
    return breakEntry
})
upbreakButton.addEventListener("click", function() {
    breakEntry = parseInt(breakEntry) + 1;
    document.getElementById("breaktime").textContent = `${breakEntry}`;
    return breakEntry
})

// Setting functions for lower buttons

playButton.addEventListener("click", function(){

    // Sets the trigger for updating with new timer info for when both 'break' and 'session' are
    // visible, i.e. in the 'reset'/'new' state. While also preserving the hidden
    // state after a pause event.
    if (document.getElementById("session").style.visibility == "hidden") {
        hideDuringBreak()
    } else if (document.getElementById("session").style.visibility === "visible" && 
    document.getElementById("break").style.visibility === "visible"){
        splat.play();
        sessionTime = getMiliseconds(sessionEntry);
        hideDuringSession();
    }    else {
        hideDuringSession();
    }

    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + sessionTime);
    runClock(deadline)
    timer = setTimeout(breakCountdown, sessionTime)
})

stopButton.addEventListener("click", function(){
    clearInterval(timer)
    clearInterval(timeInterval)
    clock.textContent = `${sessionEntry}:00`
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

resetButton.addEventListener("click", function(){
    clearInterval(timer)
    clearInterval(timeInterval)
    sessionEntry = 25;
    breakEntry = 5;
    document.getElementById("breaktime").textContent = `${breakEntry}`;
    document.getElementById("seshtime").textContent = `${sessionEntry}`;
    clock.textContent = `${sessionEntry}:00`
    showAll()
})

// Setting functions for end-of-timer events

function breakCountdown(){ //Countdown during break, 5min default
    splat.play();
    hideDuringBreak();
    breakTime = getMiliseconds(breakEntry)
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + breakTime);
    runClock(deadline)
    timer = setTimeout(sessionCountdown, breakTime)
};

function sessionCountdown(){ //Countdown during session, 25min default
    splat.play()
    hideDuringSession();
    sessionTime = getMiliseconds(sessionEntry);
    currentTime = Date.parse(new Date());
    deadline = new Date(currentTime + sessionTime);
    runClock(deadline)
    timer = setTimeout(breakCountdown, sessionTime)
};

/// Clock and helper functions

function getMiliseconds(timeInMinutes) {
    return timeInMinutes * 60000
}
function runClock(deadline) {
    function updateClock() {
        let timeRemaining = Date.parse(deadline) - Date.parse(new Date());
        let seconds = Math.floor( (timeRemaining/1000) % 60 );
        let minutes = Math.floor( (timeRemaining/1000/60) % 60 );
        clock.textContent = `${showPretty(minutes)}:${showPretty(seconds)}`
        if(timeRemaining <= 0 ){ clearInterval(timeInterval); }
    }
    updateClock();  ///Avoids 1sec delay
    timeInterval = setInterval(updateClock, 1000);
}


function showPretty(value){
    if (value <= 9) {
        return "0" + value;
    } else {
        return value
    }
}

function hideElement(id) {
    document.getElementById(id).style.visibility = "hidden";
}

function showElement(id) {
    document.getElementById(id).style.visibility = "visible"
}

function hideDuringSession() {
    showElement("session");
    hideElement("downsesh");
    hideElement("break");
    hideElement("seshtime");
    hideElement("upsesh");
    hideElement("downbreak");
    hideElement("breaktime");
    hideElement("upbreak");
}

function hideDuringBreak() {
    showElement("break");
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
