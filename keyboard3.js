console.log('Extension loaded . . .');
var timeout = setTimeout(dataFlow, 3000);
console.log('Timer starts . . .');
// console.log(document.getElementsByTagName("body")[0]);


//variables
var helper = [];
var counter = [];
var keys;
var state = false;

//kuulame klahvi vajutusi
window.captureEvents(Event.KEYPRESS);
window.onkeypress = pressed;

//database
var database = firebase.database();
var ref = database.ref('statistics');
console.log('DB variables declared');

ref.on('value', getData, errData);
console.log('Ref.on');

//load data
function getData(data) {
    var letters = data.val();
    keys = Object.keys(letters);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var count = letters[k].count;
        helper.push(count);
    }
    counter = helper;
    helper = [];
    // console.log(counter);
    console.log('get data');


}

function errData(err) {
    console.log('Error!');
    console.log(err);
}

function pressed(e) {
  state = false;
   clearTimeout(timeout);
   setTimeout(dataFlow, 3000);

    for (i = 0; i < keys.length; i++) {
        if (e.key == keys[i]) {
            counter[i]++;
            state = true;
            console.log('Key was ', keys, counter);
        }
    }
    if (state !== true) {
        keys.push(e.key);
        counter.push(1);
        state = false;
        console.log('New key: '+e.key);
        console.log(keys, counter);
    }
}

function dataFlow() {
    // console.log('Dataflow');
    //võrdleme meie massiiv andmebaasiga, toome andmed üle ja tühistame
    var len = keys.length;
    for (var j = 0; j < len; j++) {
        // console.log(j);
        writeUserData(keys[j], counter[j]);
        console.log(keys[j], counter[j]);
    }
}

function writeUserData(letter, count) {

    firebase.database().ref('statistics/' + letter).update({
      count: count
  });
    // console.log('WriteUserData');
    // console.log(letter, count, ' added');
}
