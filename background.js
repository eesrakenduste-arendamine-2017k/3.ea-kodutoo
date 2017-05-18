
var timerStates = {
	"off" : {"state": "off", "html": "popup.html", "nextState": "pomodoro"},
	"pomodoro" : new PomodoroState(),
	"break" : new BreakState()},
    stateKey = "off",
    currentState = timerStates[stateKey],
    timer,
    timeout;


// Defineerib popup lehe                                                            
chrome.browserAction.setPopup({
	"popup": currentState.html
});

// Add message listeners for messages from timer.js
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		// Only start timer if timer was initially off. No delay.
		if (request.command === "startTimer" && stateKey === "off") {
			changeToNextState(false);
			sendResponse({message: "Timer started."});
		}
		// Only clear timers if timer is not off.
		else if (request.command === "endTimer" && stateKey !== "off") {
			if (timer) clearInterval(timer);
			if (timeout) clearTimeout(timeout);
			timeout = null;
			timer = null;
			changeState("off", false); // Change to off state
			chrome.runtime.sendMessage({
				command: "timerEnded"
			});
		}
	});



/**
 * Funktsioon taimeri tööle panemiseks ja saadab uuendusi timer.html failile.
 */
function startTimer() {
	var start = moment();
	timer = setInterval(function() {
	    var difference = moment().diff(start, 'seconds');
	    if (difference > currentState.length()) {
	    	stopTimer(timer);
	    	return;
	    }
	    sendUpdatedTime(difference);
	}, 1000);
}

/**
 * Formatib aja m:ss (0:10) ja suhtleb timer.js failiga, et uuendada liidest.
 */
function sendUpdatedTime(difference) {
	var time = moment().startOf("day").seconds(difference).format("m:ss");
	chrome.runtime.sendMessage({
		"command": "updateTime",
		"time": time
	});
	chrome.browserAction.setBadgeText({"text" : time});
}

/**
 * Kutsutakse esile taimeri lõppedes. Peatab taimeri ja teavitab kasutajat.
 */
function stopTimer() {
	clearInterval(timer);
	timer = null;
	notifyUser();
	changeToNextState(true);
	chrome.runtime.sendMessage({
		command: "timerEnded"
	});
}

/**
 * Teavitab taimeri lõppemisest
 */
function notifyUser() {
	var idBase = currentState.notificationBaseId;
	var id = idBase + (new Date()).getTime();
	chrome.notifications.create(id, currentState.opt, function() {
		console.log(idBase + " notification created.");
	}); // Callback function as 3rd parameter is required.
}


function changeToNextState(isDelayed) {
	nextStateKey = currentState.nextState;
	changeState(nextStateKey, isDelayed);
}

/**
 *State-i muutmise jaoks. "isDelayed" parameeter võimaldab kasutada viivitust enne
 *kui taimer uuesti käima hakkab.
 */
function changeState(nextStateKey, isDelayed) {
	stateKey = nextStateKey;
	currentState = timerStates[stateKey];
	chrome.browserAction.setPopup({
		"popup": currentState.html
	});

	// Ajaperiood
	if (currentState.hasOwnProperty("length")) {
		// Viivitus
		if (isDelayed) {
			timeout	= setTimeout(startTimer, currentState.delay*1000);
		}
		else startTimer();
	}
}
