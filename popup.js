var fonts = [];

function getFont(){
    console.log("loaded");
    var font = {type: null, family: null, color: null};
    font.type = document.getElementById("type").value;
    font.family = document.getElementById("family").value;
    font.color = document.getElementById("color").value;
    fonts[fonts.length] = font;
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    firebase.database().ref('webpages/' + id).set({
        webpage: window.location.href,
        type: font.type,
        family: font.family,
        color: font.color
    });
}

window.onload = function(){
    console.log("loaded2");
    firebase.initializeApp(config);
    document.getElementById("saveFont").addEventListener("click", getFont);
};


