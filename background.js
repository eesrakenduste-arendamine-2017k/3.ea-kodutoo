firebase.initializeApp(config);

var database = firebase.database();
var user;


function writeValidationData(url) {
    var time = timeStamp();
    firebase.database().ref('pages/' + user).set({
        user: user,
        testedUrl: url,
        time: time
    });

}

function getUserName() {

    user = prompt("Tell me your name", "");

}

function getDataFromFirebase() {
    return firebase.database().ref('/pages/').once('value').then(function(snapshot) {
        var data = snapshot.val();
        var fbData = JSON.parse(JSON.stringify(data));
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                document.getElementById('data').innerHTML +=
                    '<li><p id="user"><strong>User: </strong>' + key + '</p><ul><li id="url"><strong>Url: </strong>' + fbData[key].testedUrl + '</li> <li id="time"><strong>Time: </strong>' + fbData[key].time + '</li></ul></li>';
            }
        }
    });

}

function timeStamp() {
    // Create a date object with the current time
    var now = new Date();

    // Create an array with the current month, day and time
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

    // Create an array with the current hour, minute and second
    var time = [now.getHours(), now.getMinutes(), now.getSeconds()];

    // Determine AM or PM suffix based on the hour
    var suffix = (time[0] < 12) ? "AM" : "PM";

    // Convert hour from military time
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

    // If hour is 0, set it to 12
    time[0] = time[0] || 12;

    // If seconds and minutes are less than 10, add a zero
    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }

    // Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
}

function show() {
    var time = /(..)(:..)/.exec(new Date()); // The prettyprinted time.
    var hour = time[1] % 12 || 12; // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
    new Notification(hour + time[2] + ' ' + period, {
        icon: 'eye.png',
        body: 'Take 2 minutes and rest your eyes from computer screen.'
    });
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
    localStorage.isActivated = true; // The display activation.
    localStorage.frequency = 1; // The display frequency, in minutes.
    localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.Notification) {
    // While activated, show notifications at the display frequency.
    if (JSON.parse(localStorage.isActivated)) { show(); }

    var interval = 0; // The display interval, in minutes.

    setInterval(function() {
        interval++;

        if (
            JSON.parse(localStorage.isActivated) &&
            localStorage.frequency <= interval
        ) {
            show();
            interval = 0;
        }
    }, 60000);
}