var font = {type: null, family: null, color: null};
var bg = {color: null, file: null};

function displayText(){
    if(document.getElementById("textcontent").style.display === "none" || document.getElementById("textcontent").style.display === ""){
        document.getElementById("textcontent").style.display = "block";
    } else{
        document.getElementById("textcontent").style.display = "none";
    }
}

function displayBg(){
    if(document.getElementById("bgcontent").style.display === "none" || document.getElementById("bgcontent").style.display === ""){
        document.getElementById("bgcontent").style.display = "block";
    } else{
        document.getElementById("bgcontent").style.display = "none";
    }
}

function getFont(){
    console.log("loaded");
    font.type = document.getElementById("type").value;
    font.family = document.getElementById("family").value;
    font.color = document.getElementById("color").value;
}
function getBackground(){
    window.bgcolor = document.getElementById("bgcolor").value;
    window.bgfile = document.getElementById("bgfile").value;
}
function save_to_db(){
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    firebase.database().ref('webpages/' + id).set({
        type: font.type,
        family: font.family,
        color: font.color,
        bgcolor: bg.color,
        bgfile: bg.file
    });

}
document.addEventListener('DOMContentLoaded', function() {
    console.log("loaded2");
    firebase.initializeApp(config);
    document.getElementById("text").addEventListener("click", displayText);
    document.getElementById("background").addEventListener("click", displayBg);
    document.getElementById("saveFont").addEventListener("click", getFont);
    document.getElementById("save").addEventListener("click", getBackground);
    document.getElementById("apply").addEventListener("click", save_to_db);
});


