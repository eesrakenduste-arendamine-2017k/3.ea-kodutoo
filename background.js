firebase.initializeApp(config);

var database = firebase.database();
var user;

// CSS valideerimine
function writeValidationData(url) {
    var time = timeStamp();
    firebase.database().ref('pages/' + user).set({
        user: user,
        testedUrl: url,
        time: time
    });

}
// Küsib kasutaja nime, et andmebaasi salvestaad
function getUserName() {

    user = prompt("Tell me your name", "");

}
// Küsib andmebaasist data-t
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
    var now = new Date();
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
    var time = [now.getHours(), now.getMinutes(), now.getSeconds()];
    var suffix = (time[0] < 12) ? "AM" : "PM";
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;
    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }

    // Tagastab ilusa kuupäeva ja kellaaja
    return date.join("/") + " " + time.join(":") + " " + suffix;
}

function show() {
    var time = /(..)(:..)/.exec(new Date());
    var hour = time[1] % 12 || 12;
    var period = time[1] < 12 ? 'a.m.' : 'p.m.';
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