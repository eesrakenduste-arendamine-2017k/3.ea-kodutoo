console.log('Extension loaded.');

firebase.initializeApp(config);

var currentTimeSpent = 0;
var totalTime = 0;
var t;
full_time = 0;

console.log(window.location.host);
//Extension becomes active if you go on reddit
if(window.location.host=='www.reddit.com'){
	console.log('Session detected.');
	//var currentTimeSpent = 0;
	identifyUser();
	retrieveSession();
	var startTimer = setInterval(timeCalc, 1000);
		console.log('Test if working: ' + currentTimeSpent);
}


/*===== asks for victims name for firebase saving purposes =====*/

function identifyUser() {
	victim = prompt("Who art thou, about to embark upon a most perilous journey?")
	console.log('Victim identified: ' +victim);
}


/*===== saves session time to firebase =====*/

function saveSession(victim, totalTime){
    firebase.database().ref("webtracker/"+ victim).set({
		full_time: totalTime
    });
	console.log('Session saved to firebase.');
}


/*===== retrieve session time from firebase =====*/

function retrieveSession(){
	console.log('Attempting to retrieve session');
	var RS = firebase.database().ref('webtracker');
	RS.child(victim).once('value', function(temporary) {
		if(temporary.exists()){
			t = temporary.val().full_time;
			console.log('Session retrieved.');
		}else{
			t = 0;
			console.log('No prior session found.');
		}
		return t;
	});
}


/*===== Function to calculate new total time =====*/

function timeCalc() {
	totalTime  = currentTimeSpent + t;
	saveSession();
}


//Function that calls data from firebase for total time spent on reddit


//starts time counter(seconds)

//var el = document.getElementById('spent-time');
//<div id='spent-time'> </div
    //el.innerText = "You have been here for " + currentTimeSpent + " seconds.";
