var fonts = [];

function getFont(){
    console.log("loaded");
    var font = {type: null, family: null, color: null};
    font.type = document.getElementById("type").value;
    font.family = document.getElementById("family").value;
    font.color = document.getElementById("color").value;
    fonts[fonts.length] = font;
    localStorage.font = JSON.stringify(font);
}

window.onload = function(){
    console.log("loaded2");
    document.getElementById("saveFont").addEventListener("click", getFont);
};


