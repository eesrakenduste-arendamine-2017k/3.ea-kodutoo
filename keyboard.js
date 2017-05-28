console.log('Extension loaded . . .');
console.log(document.getElementsByTagName("body")[0]);

//kuulame klahvi vajutusi
window.captureEvents(Event.KEYPRESS);
window.onkeypress = pressed;

function pressed(e) {
    // console.log(e);
    var data = null;
    var count;

    //saame arvu k2tte
    var info = firebase.database().ref('staticstics/' + e.key.toLowerCase() + '/count');
    info.on('value', function(datasnapshot) {
        console.log(datasnapshot.val());
        data = datasnapshot.val();
    });

    console.log('Data received');
    // console.log('Data: '+data);
    if(data === null){
      count = 1;
    }else{
      count = data + 1;
    }
    // console.log('Count: '+count);
    firebase.database().ref('staticstics/' + e.key.toLowerCase()).set({
        count: count
    });
    console.log(e.key+' value = '+count);

}

//teeme unikaalne id
var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
