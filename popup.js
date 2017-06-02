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
    } else {
        document.getElementById("bgcontent").style.display = "none";
    }
}

function save_font_db(){
    font.type = document.getElementById("type").value;
    font.family = document.getElementById("family").value;
    font.color = document.getElementById("color").value;

    firebase.database().ref('fonts/' + new Date().getTime()).set({
        type: font.type,
        family: font.family,
        color: font.color
    });
}
function save_bg_db(){
    bg.color = document.getElementById("bgcolor").value;
    bg.file = document.getElementById("bgfile").value;

    firebase.database().ref('backgrounds/' + new Date().getTime()).set({
        bgcolor: bg.color,
        bgfile: bg.file
    });

}
document.addEventListener('DOMContentLoaded', function() {
    console.log("loaded2");
    firebase.initializeApp(config);
    document.getElementById("text").addEventListener("click", displayText);
    document.getElementById("background").addEventListener("click", displayBg);
    document.getElementById("saveFont").addEventListener("click", save_font_db);
    document.getElementById("save").addEventListener("click", save_bg_db);
});


