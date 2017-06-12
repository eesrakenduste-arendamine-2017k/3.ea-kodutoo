console.log('Extension loaded.');

firebase.initializeApp(config);

var totalTime = 0;
var t;
var currentSession = 0;
var full_time = 0;


console.log(window.location.host);
//Extension becomes active if you go on reddit
if(window.location.host=='www.reddit.com'){
	console.log('Session detected.');
	identifyUser();
	t = retrieveSession();
	currentTimeSpent = setInterval(addSecond, 1000);
		console.log('CTS ' +currentTimeSpent);
	var startTimer = setInterval(timeCalc, 5000);
		console.log('Test if working: ' + full_time);
	setInterval(saveSession, 5000);
}

function addSecond(){
	currentSession += 1;
		//console.log(currentSession);
	
}

/*===== asks for victims name for firebase saving purposes =====*/

function identifyUser() {
	victim = prompt("Who art thou, about to embark upon a most perilous journey?")
	console.log('Victim identified: ' +victim);
}


/*===== saves session time to firebase =====*/

function saveSession(){
    firebase.database().ref("webtracker/"+ victim).set({
		totalTime: full_time
    });
	console.log('Session saved to firebase.');
}


/*===== retrieve session time from firebase =====*/


function retrieveSession(){
	console.log('Attempting to retrieve session');
	var RS = firebase.database().ref('webtracker');
	RS.child(victim).once('value', function(temporary) {
		if(temporary.exists()){
			t = temporary.val().totalTime;
			console.log('Session retrieved.');
		}else{
			t = 0;
			console.log('No prior session found.' + t);
		}
		return t;
	});
}


/*===== Function to calculate new total time =====*/

function timeCalc() {
	full_time  = currentSession + t;
	console.log('full_time value: ' + full_time);
	var full_time2 = full_time;
	saveLocalStorage(full_time2);
}


function saveLocalStorage(timetest) {
	var placeholder = timetest;
	//saving to Chrome via storage API
	chrome.storage.sync.set({'value' : placeholder}, function(){
		console.log("Saved to browser " + timetest);
	});
}


//Function that calls data from firebase for total time spent on reddit


//starts time counter(seconds)

//var el = document.getElementById('spent-time');
//<div id='spent-time'> </div
    //el.innerText = "You have been here for " + currentTimeSpent + " seconds.";
