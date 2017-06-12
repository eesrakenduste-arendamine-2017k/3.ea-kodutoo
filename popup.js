/*

Function to retrieve total time from firebase.

Function to output time in hh:mm:ss format.

*/

var x;

function timeFromStorage() {
	chrome.storage.sync.get('value', function(obj) {
		x = obj.value;
		timeConvert(x);
		document.getElementById("showtime").innerHTML = x;
		console.log('did it work?' +x);
	});
}


//code from https://github.com/OssuBoy/3.ea-kodutoo/blob/master/Chrome%20laiendus/popup.js
function timeConvert(sec){
	var hours = Math.floor(sec / 3600);
	var minutes = Math.floor((sec - (hours * 3600)) / 60);
	var seconds = sec - (hours * 3600) - (minutes * 60);
	if (hours < 10) {hours ="0" +hours;}
	if (minutes < 10) {minutes = "0" +minutes;}
	if (seconds < 10) {seconds = "0" +seconds;}
	x = hours+':'+minutes+':'+seconds.toFixed(0);
	return x;
	
}

document.addEventListener('DOMContentLoaded', function() {
	timeFromStorage();
});