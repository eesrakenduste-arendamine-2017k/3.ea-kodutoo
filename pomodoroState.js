function PomodoroState() {
	this.length = function() {
		return localStorage["pomodoro-selection"] || 10;
	}
	this.delay = 10;
	this.html = "timer.html";
	this.opt = {
		type: "basic",
		title: "Tegevus labi",
		message: "Aeg Tab-ida",
		iconUrl: "icon.png"
	};
	this.notificationBaseId = "pomodoroOver";
	this.nextState = "break";
}
