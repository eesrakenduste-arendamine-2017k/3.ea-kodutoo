/*

Function to retrieve total time from firebase.

Function to display current session length.

Function to output time in hh:mm:ss format.

*/

var t;

function retrieveTime() {
	console.log('Retrieving data for popup');
	var PS = firebase.database().ref('webtracker');
	PS.child(victim).once('value'), function(temporary2) {
		if(temporary2.exists()){
			p = temporary2.val().totalTime;
			console.log('Session retrieved for popup');
		}else{
			p = 0;
			console.log('No prior session found for popup.');
		}
		return p;
	});
}


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