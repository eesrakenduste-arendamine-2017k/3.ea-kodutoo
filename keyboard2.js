console.log('Extension loaded . . .');
var timeout = setTimeout(dataFlow, 3000);
console.log('Timer starts . . .');
// console.log(document.getElementsByTagName("body")[0]);


//kuulame klahvi vajutusi
window.captureEvents(Event.KEYPRESS);
window.onkeypress = pressed;
console.log('Key press event . . .');


var data = null;
var count;
var letters;
var keys = null;
var helpC = [];
var counter = [];

var state;

console.log('Variables declared');
//teeme massiii kuhu paneme vajutused, ja iga **aja p2rast salvestame andmebaasi



//database
var database = firebase.database();
var ref = database.ref('staticstics');
console.log('DB variables declared');

ref.on('value', getData, errData);
console.log('Ref.on');

//load data
function getData(data) {
    // console.log(data.val());
    counter = [];
    keys = [];
    letters = data.val();
    console.log('Function getData starts . . .');
    if(letters !== null){
        keys = Object.keys(letters);
        console.log('Object keys created');
        // var counter = Object.keys(letters.count);
        // console.log(counter);
        // console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var count = letters[k].count;
            // console.log(letters[k]);
            // keys.push(i);
            counter.push(count);
            // console.log(count);
            // console.log('pushed to counter ' +counter);
            console.log('Loop end . . .');

        }
      }
}

function errData(err){
  console.log('Error!');
  console.log(err);
}


function pressed(e) {
    // console.log('counter '+counter.length);
    console.log('Key pressed start . . .');

    // clearTimeout(timeout);
    timeout = setTimeout(dataFlow, 3000);

    // state = false;

    // hakkame kontrollima, kas on sama t2ht
    for (i = 0; i < keys.length; i++) {
        if (e.key == keys[i]) {
            //kui on - suurendame seele count
            counter[i] = counter[i] + 1;
            // console.log('counter i ++ '+counter[i]);
            // console.log(counter);

            // console.log(counter);
            //leidsime => true
            // state = true;
            // console.log('got');
            console.log('Key counter ++');
        }else{
          keys.push(e.key);
          counter.push(1);
          console.log('New key');
        }
        // console.log(keys[i], counter[i]);
    }
    console.log('Key press END . . .');
}


function dataFlow() {
  console.log('Dataflow');
    //võrdleme meie massiiv andmebaasiga, toome andmed üle ja tühistame
    // console.log(keys);
    // console.log(counter);
    for (var j = 0; j < keys.length; j++) {
      // console.log(j);
      console.log('Data loop');
      writeUserData(keys[j], counter[j]);


  }
  // console.log("----");

  // console.log('keys '+keys.length);
  // console.log('counter '+counter.length);
}

function writeUserData(letter, count) {
    database.ref('staticstics/' + letter).set({
        count: count
    });
    console.log('WriteUserData');
    // console.log(letter, count, ' added');
}


//---------------

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
