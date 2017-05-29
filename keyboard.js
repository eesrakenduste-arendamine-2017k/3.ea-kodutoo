console.log('Extension loaded . . .');
// console.log(document.getElementsByTagName("body")[0]);


//variables
var helper = [];
var counter = [];
var keys;
var state = false;
var data;
var e;
var nr;

//kuulame klahvi vajutusi
window.captureEvents(Event.KEYPRESS);
window.onkeypress = pressed;

//database
var database = firebase.database();
var ref = database.ref('statistics');
console.log('DB variables declared');

// ref.on('value', writeUserData, errData);
// console.log('Ref.on');


function pressed(e) {
  var button = e.key;
  state = false;
  // var letters = data.val();
  // keys = Object.keys(letters);
  // for (var i = 0; i < keys.length; i++) {
  //   if(e.key == keys[i]){
  //     var k = keys[i];
  //     var count = letters[k].count;
  //     firebase.database().ref('statistics/' + e.key).update({
  //       count: count
  //   });
  //   state = true;
  //   }
  // }
  // if(state == false){
  //
  // }
  var letters = ref.on('value', function(datasnapshot) {

        // console.log(datasnapshot.val());
        data = datasnapshot.val();
        keys = Object.keys(data);
        for(var i = 0; i < keys.length; i++){
          if(button == keys[i]){
            console.log('Old key');
            nr = i + 1;
            firebase.database().ref('statistics/' + e.key).update({
              count: nr
          });
          state = true;
          }
        }
        if(state !== true){
          console.log('new key');

          firebase.database().ref('statistics/' + e.key).update({
                count: 1
            });
        }
        // var count = data[keys[nr]].count;
        console.log(keys);

    });
  // console.log(letters);



}
