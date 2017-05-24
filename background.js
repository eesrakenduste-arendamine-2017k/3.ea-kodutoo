document.addEventListener("spfdone", process);
document.addEventListener("DOMContentLoaded", process);
document.onload = process();
function process() {
    console.log("loaded extension!");
    var element = document.getElementById("eow-title");
    var elementTitle = document.getElementById("eow-title").title;
    //on hover change cursor to pointer
    element.style.cursor = 'pointer';
    //on mouse over change color to gray
    element.onmouseover = function () {
        element.style.color = 'gray';
    };
    //back to black
    element.onmouseout = function () {
        element.style.color = 'black';
    };
    var stripedTitle = elementTitle.replace(/ *\([^)]*\) */g, "");
    //Discogs search
    var URL = "https://www.discogs.com/search/?q=" + stripedTitle;
    element.addEventListener("click", function(){
        window.open(URL);
    });
    firebase.initializeApp(config);
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    firebase.database().ref('discogs/' + id).set({
        date: new Date(),
        title: elementTitle,
        query: stripedTitle,
        url: URL
    });
}