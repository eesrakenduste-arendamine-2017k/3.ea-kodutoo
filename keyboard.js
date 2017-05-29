console.log('Extension loaded . . .');
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

// ref.on('value', writeUserData, errData);
// console.log('Ref.on');


function pressed(e) {
  // state = false;
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
  var letters = ref.on('value', function(){
    
  });
  console.log(letters);

  firebase.database().ref('statistics/' + e.key).update({
    count: +1
});
}
