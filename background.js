/*
1. taust korda
2. timer satete jaoks
3. tausta pilt ja selle scale + repeat
 */
console.log("loaded");

var p = document.getElementsByTagName("p");
var h1 = document.getElementsByTagName("h1");

firebase.initializeApp(config);
var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});
var pageref = firebase.database().ref('webpages/').limitToFirst(1);
pageref.orderByChild("type").equalTo("p").on("child_added", function(data){
    if(data.val().color !== null) {
        for (var i = 0; i < p.length; i++) {
            p[i].style.color = data.val().color;
            p[i].style.fontFamily = data.val().family;
        }
    }
});

pageref.orderByChild("type").equalTo("h1").on("child_added", function(data){
    if(data.val().color !== null) {
        for (var i = 0; i < h1.length; i++) {
            h1[i].style.color = data.val().color;
            h1[i].style.fontFamily = data.val().family;
        }
    }
});

pageref.orderByChild("bgcolor").on("child_added", function(data){
    if(data.val().bgcolor !== null) {
        document.getElementsByTagName("BODY")[0].style.backgroundColor = data.val().bgcolor;
        //console.log(data.val().bgcolor);
    }
});






