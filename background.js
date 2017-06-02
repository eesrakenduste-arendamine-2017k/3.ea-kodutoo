firebase.initializeApp(config);
var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});

function changeFont(ref, type, array){
    ref.orderByChild("type").equalTo(type).on("child_added", function(data){
        if(data.val() !== undefined) {
            for (var i = 0; i < array.length; i++) {
                array[i].style.color = data.val().color;
                array[i].style.fontFamily = data.val().family;
            }
        }
    });
}
function changeBackground(ref){
    ref.orderByChild("type").on("child_added", function(data){
        if(data.val().bgcolor !== undefined) {
            document.getElementsByTagName("BODY")[0].style.backgroundColor = data.val().bgcolor;
        }
    });
}

var p = document.getElementsByTagName("p");
var h1 = document.getElementsByTagName("h1");
var h2 = document.getElementsByTagName("h2");

window.setInterval(function(){
    var queryfont = firebase.database().ref("fonts/").limitToLast(1);
    var querybg = firebase.database().ref("backgrounds/").limitToLast(1);
    changeFont(queryfont, "p", p);
    changeFont(queryfont, "h1", h1);
    changeFont(queryfont, "h2", h2);
    changeBackground(querybg);
}, 1000);









