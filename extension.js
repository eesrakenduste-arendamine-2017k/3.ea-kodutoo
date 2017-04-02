console.log("loaded extension!");

var tagsArray = [];

var tags = document.querySelectorAll('.post-tag.js-gps-track');
for(var i = 0; i < tags.length; i++){
    tags[i].style.border = "3px solid red";
    tagsArray.push(tags[i].innerText);
}

document.getElementsByTagName('body')[0].addEventListener('copy',function(){
    console.log('kopeeris');
    var text = window.getSelection().toString();
    var question = document.querySelector('.question-hyperlink').innerText;



    //console.log(obj);

    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

    // Firebase rakenduse tegi korda see, et set käsu sisse ei tohi panna objketi
    // vaid peab selle sees looma objekit
    firebase.database().ref('stack/' + id).set({
        title: question,
        url: window.location.href,
        date: new Date(),
        text: text,
        tags: tagsArray
    });


    var block = window.getSelection().anchorNode.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

    block.style.backgroundColor = "lightgreen";
    window.setTimeout(function(){
        block.style.backgroundColor = "white";
    },200);

});

firebase.initializeApp(config);