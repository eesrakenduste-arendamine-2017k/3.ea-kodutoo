var findSlash=window.parent.location.href.length-1;
if(window.parent.location.href[findSlash]!="/") {
    console.warn("ei saa sisse:(");
}

if(window.parent.location.href[findSlash]=="/") {

    var div = document.createElement("DIV");
    div.setAttribute("id", "createdDiv");
    div.setAttribute("href", "createdDiv");
    var img = document.createElement("IMG");
    img.setAttribute("src", "https://cdn3.iconfinder.com/data/icons/stroke/53/Arrow-10-512.png");
    img.setAttribute("id", "backImg");
    div.appendChild(img);
    document.body.appendChild(div);
    document.getElementById("createdDiv").style.position="fixed";
    document.getElementById("createdDiv").style.left="0";
    document.getElementById("createdDiv").style.height="100%";
    document.getElementById("createdDiv").style.top="0";
    document.getElementById("createdDiv").style.width="5%";
    document.getElementById("createdDiv").style.backgroundColor="rgba(65, 75, 102, 0.75)";
    document.getElementById("createdDiv").style.opacity="0.75";
    document.getElementById("backImg").style.position="fixed";
    document.getElementById("backImg").style.bottom="50%";
    document.getElementById("backImg").style.left="-10%";
    document.getElementById("backImg").style.height="8%";
    document.getElementById("backImg").style.width="5%";

    document.getElementById("createdDiv").addEventListener("mouseenter", function () {
        document.getElementById("createdDiv").style.backgroundColor="#8ea5b5";
    });
    document.getElementById("createdDiv").addEventListener("mouseleave", function () {
        document.getElementById("createdDiv").style.backgroundColor="rgba(65, 75, 102, 0.75)";
    });

    console.log("loaded extension!");
    var slash = 0;
    var back = "";
    for (var i = window.parent.location.href.length; slash != 2; i--) {
        if (window.parent.location.href[i] == "/") {
            back = window.parent.location.href.slice(0, i);
            console.log("tsyklis sees!!!! BACK=" + back);
            slash = slash + 1;
        }
    }

    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (i == 4) {
            document.getElementById("createdDiv").addEventListener("click", function () {
                location.href = back;
            });
            links[4].parentElement.parentElement.remove();
            links[4].parentElement.parentElement.addEventListener("click", function () {location.href = links[4].innerHTML;});
        }
        else if (i == 5) {links[5].parentElement.parentElement.addEventListener("click", function () {location.href = links[5].innerHTML;});}
        else if (i == 6) {links[6].parentElement.parentElement.addEventListener("click", function () {location.href = links[6].innerHTML;});}
        else if (i == 7) {links[7].parentElement.parentElement.addEventListener("click", function () {location.href = links[7].innerHTML;});}
        else if (i == 8) {links[8].parentElement.parentElement.addEventListener("click", function () {location.href = links[8].innerHTML;});}
        else if (i == 9) {links[9].parentElement.parentElement.addEventListener("click", function () {location.href = links[9].innerHTML;});}
        else if (i == 10) {links[10].parentElement.parentElement.addEventListener("click", function () {location.href = links[10].innerHTML;});}
        else if (i == 11) {links[11].parentElement.parentElement.addEventListener("click", function () {location.href = links[11].innerHTML;});}
        else if (i == 12) {links[12].parentElement.parentElement.addEventListener("click", function () {location.href = links[12].innerHTML;});}
        else if (i == 13) {links[13].parentElement.parentElement.addEventListener("click", function () {location.href = links[13].innerHTML;});}
        else if (i == 13) {links[14].parentElement.parentElement.addEventListener("click", function () {location.href = links[14].innerHTML;});}
        else if (i == 15) {links[15].parentElement.parentElement.addEventListener("click", function () {location.href = links[15].innerHTML;});}
        else if (i == 16) {links[16].parentElement.parentElement.addEventListener("click", function () {location.href = links[16].innerHTML;});}
        else if (i == 17) {links[17].parentElement.parentElement.addEventListener("click", function () {location.href = links[17].innerHTML;});}
        else if (i == 18) {links[18].parentElement.parentElement.addEventListener("click", function () {location.href = links[18].innerHTML;});}
        else if (i == 19) {links[19].parentElement.parentElement.addEventListener("click", function () {location.href = links[19].innerHTML;});}
        else if (i == 20) {links[20].parentElement.parentElement.addEventListener("click", function () {location.href = links[20].innerHTML;});}
        else if (i == 21) {links[21].parentElement.parentElement.addEventListener("click", function () {location.href = links[21].innerHTML;});}
        else if (i == 22) {links[22].parentElement.parentElement.addEventListener("click", function () {location.href = links[22].innerHTML;});}
        else if (i == 23) {links[23].parentElement.parentElement.addEventListener("click", function () {location.href = links[23].innerHTML;});}
        else if (i == 24) {links[24].parentElement.parentElement.addEventListener("click", function () {location.href = links[24].innerHTML;});}
        else if (i == 25) {links[25].parentElement.parentElement.addEventListener("click", function () {location.href = links[25].innerHTML;});}
        else if (i == 26) {links[26].parentElement.parentElement.addEventListener("click", function () {location.href = links[26].innerHTML;});}
        if (i < 4) {
            links[i].style.textDecoration = "none";
            links[i].style.fontSize = "20px";
            links[i].style.color = "rgb(85, 0, 0)";
            links[i].style.paddingRight = "30px";
        } else {
            links[i].style.textDecoration = "none";
            links[i].style.fontSize = "20px";
        }
    }

    var addresses = document.getElementsByTagName("address");
    for (var i = 0; i < addresses.length; i++) {
        addresses[i].style.fontSize = "0px";
    }

    var separators = document.getElementsByTagName("hr");
    for (var i = 0; i < separators.length; i++) {
        separators[0].parentElement.parentElement.remove();
        separators[0].parentElement.parentElement.remove();

    }

    var icons = document.getElementsByTagName("img");
    for (var i = 0; i < icons.length; i++) {

        if (icons[i].alt == "[DIR]") {
            icons[i].src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Circle-icons-folder.svg/2000px-Circle-icons-folder.svg.png";
            icons[i].style.width = "40px";
            icons[i].style.height = "40px";
        }
        if (icons[i].alt == "[   ]") {
            icons[i].src = "https://www.shareicon.net/data/128x128/2016/08/18/809295_info_512x512.png";
            icons[i].style.width = "40px";
            icons[i].style.height = "40px";
        }
        if (icons[i].alt == "[TXT]") {
            icons[i].src = "http://downloadicons.net/sites/default/files/document-icon-64032.png";
            icons[i].style.width = "40px";
            icons[i].style.height = "40px";
        }
        if (icons[i].alt == "[IMG]") {
            icons[i].src = "https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/image-128.png";
            icons[i].style.width = "40px";
            icons[i].style.height = "40px";
        }
        if (icons[i].alt == "[SND]") {
            icons[i].src = "http://cdn.mysitemyway.com/icons-watermarks/flat-circle-white-on-black/classica/classica_music-note-2/classica_music-note-2_flat-circle-white-on-black_512x512.png";
            icons[i].style.width = "40px";
            icons[i].style.height = "40px";
        }


    }

    var h1C = document.getElementsByTagName("h1");
    var pos = (window.innerWidth / 2) - ((h1C[0].innerHTML.length / 2) * 23) + "px";
    h1C[0].style.left = pos;
    console.log("INDEX OF ... kohal" + pos);

    window.onresize = function(){
        pos = (window.innerWidth / 2) - ((h1C[0].innerHTML.length / 2) * 23) + "px";
        h1C[0].style.left = pos;
        console.log("INDEX OF ... kohal" + pos);
    };


    var tagsArray = [];

    var tags = document.querySelectorAll('.post-tag.js-gps-track');
    for (var i = 0; i < tags.length; i++) {
        tags[i].style.border = "3px solid red";
        tagsArray.push(tags[i].innerText);
    }

    document.getElementsByTagName('body')[0].addEventListener('copy', function () {
        console.log('kopeeris');
        var text = window.getSelection().toString();
        var question = document.querySelector('.question-hyperlink').innerText;


        //console.log(obj);

        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });


        var block = window.getSelection().anchorNode.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

        block.style.backgroundColor = "lightgreen";
        window.setTimeout(function () {
            block.style.backgroundColor = "white";
        }, 200);

    });
}
