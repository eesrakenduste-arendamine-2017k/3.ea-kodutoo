console.log("loaded");

var p = document.getElementsByTagName("p");
var h1 = document.getElementsByTagName("h1");

firebase.initializeApp(config);
var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});
var id = 1;
firebase.database().ref('webpages/' + id).set({
    url: window.location.href,
    type: "k",
    family: "k",
    color: "k",
    background: "k"
})

var pageref = firebase.database().ref('webpages/').limitToLast(1);
pageref.orderByChild("type").equalTo("p").on("child_added", function(data){
    console.log(data.val());
})







