console.log('Extension loaded . . .');
// console.log(document.getElementsByTagName("body")[0]);

var data = null;
var count = null;

//teeme massiii kuhu paneme vajutused, ja iga **aja p2rast salvestame andmebaasi
var lettersArray = [];
var letter;
var i;

//kuulame klahvi vajutusi
window.captureEvents(Event.KEYPRESS);
window.onkeypress = pressed;

function pressed(e) {
    //kontrollimiseks kas on sama klahv olemas
    var state = false;

    // console.log(e);
    letter = {
        key: e.key,
        nr: 1
    };
    //kui massiv on tyhi, siis ---->
    if (lettersArray.length !== 0) {
      //hakkame kontrollima, kas on sama t2ht
        for (i = 0; i < lettersArray.length; i++) {
            if (e.key == lettersArray[i].key) {
              //kui on - suurendame seele count
                lettersArray[i].nr += 1;
                //leidsime => true
                state = true;
            }
        }
        //kui ei leidnud, siis lisame
        if (state === false) {
            lettersArray.push(letter);
        }

    } //-->alustame teda
    else {
        lettersArray.push(letter);
      }

    // console.log(lettersArray);

    // //saame arvu k2tte
    // var info = firebase.database().ref('staticstics/' + e.key.toLowerCase() + '/count');
    // info.on('value', function(datasnapshot) {
    //     console.log(datasnapshot.val());
    //     data = datasnapshot.val();
    // });
    //
    // console.log('Data received: ' + data);
    // // console.log('Data: '+data);
    // if (data === null) {
    //     count = 1;
    //     console.log(" DATA === null && COUNT == 1");
    // } else {
    //     count = data + 1;
    //     console.log("COUNT === " + count);
    // }
    // // console.log('Count: '+count);
    // firebase.database().ref('staticstics/' + e.key.toLowerCase()).set({
    //     count: count
    // });
    // console.log(e.key + ' was ' + data + ' now = ' + count);


}



//teeme unikaalne id
var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
