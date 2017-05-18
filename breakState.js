function BreakState() {
	this.length = function() {
		return localStorage["break-selection"] || 10;
	};
	this.delay = 10;
	this.html = "timer.html";
	this.opt = {
		type: "basic",
		title: "Tegevus labi",
		message: "Aeg Tab-ida",
		iconUrl: "icon.png"
	};
	this.notificationBaseId = "breakOver";
	this.nextState = "pomodoro";
}
