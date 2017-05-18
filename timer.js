function init() {
	addOnClick();
	addMessageListeners();
	startTimer();
}

/**
 * saadab backgroundile käsu timeri käivitamiseks
 */
function startTimer() {
	chrome.runtime.sendMessage({
		"command": "startTimer"
	}, function(response) {
		console.log(response.message);
	});
}

/**
 * Lisab listenerid, et teada kuidas käsitleda messageid backgroundilt
 */
function addMessageListeners() {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		switch(request.command) {
			case "updateTime":
				document.getElementById("current-time").innerText = request.time;
				break;
			case "timerEnded":
				console.log("Timer ended.");
				break;
		}
	});
}

/**
 * stop nupule kliki listener
 */
function addOnClick() {
	document.getElementById("stop").onclick = function() {
		chrome.runtime.sendMessage({
			"command": "endTimer"
		});
		document.location = chrome.runtime.getURL("popup.html");
		chrome.browserAction.setBadgeText({"text" : ""});
	}
}

document.addEventListener('DOMContentLoaded', init);
