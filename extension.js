var findSlash=window.parent.location.href.length-1;
var findOrderStatus = window.parent.location.href.length;
var findOrder = window.parent.location.href.length-3;
var timer;
var urlB4;

firebase.initializeApp(config);

if(window.parent.location.href[findSlash]!="/") {
    console.warn("see on juba fail");
    document.body.style.opacity="1";



}

if(window.parent.location.href[findSlash]=="/" || window.parent.location.href.slice(findOrder, findOrderStatus)=="O=D" || window.parent.location.href.slice(findOrder, findOrderStatus)=="O=A") {



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
    document.getElementById("createdDiv").style.backgroundColor="gray";
    document.getElementById("createdDiv").style.opacity="0.75";
    document.getElementById("backImg").style.position="fixed";
    document.getElementById("backImg").style.bottom="46%";
    document.getElementById("backImg").style.left="-10%";
    document.getElementById("backImg").style.height="8%";
    document.getElementById("backImg").style.width="5%";

    document.getElementById("createdDiv").addEventListener("mouseenter", function () {
        document.getElementById("createdDiv").style.backgroundColor="#535654";
        document.getElementById("createdDiv").style.cursor="pointer";
    });
    document.getElementById("createdDiv").addEventListener("mouseleave", function () {
        document.getElementById("createdDiv").style.backgroundColor="gray";
    });

    var div2 = document.createElement("DIV");
    div2.setAttribute("id", "createdDiv2");
    document.body.appendChild(div2);
    document.getElementById("createdDiv2").style.position="fixed";
    document.getElementById("createdDiv2").style.width="60%";
    document.getElementById("createdDiv2").style.height="50";
    document.getElementById("createdDiv2").style.right="0";
    document.getElementById("createdDiv2").style.left="0";
    document.getElementById("createdDiv2").style.top="0";
    document.getElementById("createdDiv2").style.margin="auto";
    document.getElementById("createdDiv2").style.backgroundColor="red";
    document.getElementById("createdDiv2").innerHTML="Reload Page";
    document.getElementById("createdDiv2").style.textAlign="center";
    document.getElementById("createdDiv2").style.fontSize="45px";
    document.getElementById("createdDiv2").style.backgroundColor="gray";
    document.getElementById("createdDiv2").style.opacity="0.75";

    document.getElementById("createdDiv2").addEventListener("mouseenter", function () {
        document.getElementById("createdDiv2").style.backgroundColor="#535654";
        document.getElementById("createdDiv2").style.color="#D69764";
        document.getElementById("createdDiv2").style.cursor="pointer";
    });
    document.getElementById("createdDiv2").addEventListener("mouseleave", function () {
        document.getElementById("createdDiv2").style.backgroundColor="gray";
        document.getElementById("createdDiv2").style.color="#3f3f40";
    });
    document.getElementById("createdDiv2").addEventListener("click", function () {
        location.reload();
    });

    var currentDate = new Date();
    var month = currentDate.getMonth();
    var date = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();


    var length = location.href.length;
    var heading;
    for(var i=length-2;location.href[i]!="/"; i--){
        if(location.href[i]=="/"){
            var start = location.href.slice(0,location.href[i]).length;
            heading=location.href.slice(start,length-2);
        }
    }



    console.log("loaded extension!");
    var slash = 0;
    var back = "";
    for (var i = window.parent.location.href.length; slash != 2; i--) {
        if (window.parent.location.href[i] == "/") {
            back = window.parent.location.href.slice(0, i);
            slash = slash + 1;
        }
        if(window.parent.location.href[i] == "/" && slash == 2){
            console.log("BACK=" + back);
        }
    }

    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        if (i == 4) {
            document.getElementById("createdDiv").addEventListener("click", function () {
                location.href = back;
            });
            links[4].parentElement.parentElement.remove();
        }
        if (i < 4) {
            links[i].style.textDecoration = "none";
            links[i].style.fontSize = "20px";
            links[i].style.color = "#393D40";
            links[i].style.paddingRight = "30px";
        } else {
            links[i].style.textDecoration = "none";
            links[i].style.fontSize = "20px";
            links[i].style.color = "#D69764";
            links[i].id = links[i].innerHTML;
            addClickEvent(links[i].parentElement.parentElement, links[i].innerHTML);
            if(links[i].innerHTML[links[i].innerHTML.length-1]=="/") {
                addEvent(links[i].id, links[i], links[i].innerHTML);
            }

        }
    }
    var cursorX;
    var cursorY;
    document.onmousemove = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
    }
    function addEvent(id,link,text){
        link.parentElement.addEventListener("mouseenter", function (event) {
            getURLContents(id,event,text);
            link.parentElement.style.cursor="pointer";
        });
        link.parentElement.addEventListener("mouseleave", function () {
            window.clearTimeout(timer);
            var element = document.getElementById("folderContentREAL");
            element.parentNode.removeChild(element);
        });
    }
    function addClickEvent(link,text){
        urlB4 = window.location.href;
        link.addEventListener("click", function () {location.href = text;});
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
    console.log("INDEX OF... (alumine) on kohal " + pos);

    window.onresize = function(){
        pos = (window.innerWidth / 2) - ((h1C[0].innerHTML.length / 2) * 23) + "px";
        h1C[0].style.left = pos;
    };

    document.body.style.opacity="1";




    function getURLContents(id,event,url){
console.log("ID hetkel: "+id);
var url = url;
        timer= window.setTimeout(function(event){
            console.log(event);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){

                if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    console.log('successfully loaded');
                    // serveri vastuse sisu
                    var response = xmlhttp.responseText;

                    var folderContent = document.createElement("DIV");
                    folderContent.setAttribute("id", "folderContent");
                    folderContent.innerHTML=response;
                    var links = folderContent.querySelectorAll("a");

                    var folderContentREAL = document.createElement("DIV");
                    folderContentREAL.setAttribute("id", "folderContentREAL");

                    var folderPos;
                    for (var i = 0; i < links.length; i++) {
                        if (i > 4) {


                            console.log(links[i]);
                            var newLink = document.createElement("a");
                            newLink.setAttribute("id", i);
                            newLink.setAttribute("href", links[i].innerHTML);
                            newLink.innerHTML=links[i].innerHTML;
                            newLink.id="hoverDark";

                            folderContentREAL.appendChild(newLink);
                            folderContentREAL.innerHTML+="<br>";

                        }
                    }
                    document.getElementById(id).appendChild(folderContentREAL);
                    var newFolder = document.getElementById("folderContentREAL");


                    newFolder.style.width="auto";
                    newFolder.style.paddingBottom="10px";
                    newFolder.style.paddingTop="10px";
                    newFolder.style.position="fixed";
                    newFolder.style.backgroundColor="rgba(214,151,100,0.85)";
                    newFolder.style.borderRadius="15px";
                    newFolder.style.borderTopLeftRadius="0px";
                    newFolder.style.top=cursorY+10;
                    newFolder.style.left=cursorX+25;
                    newFolder.style.boxShadow="0px 0px 5px 10px  rgba(214,151,100,0.85)";
					newFolder.style.transition="opacity 1s";
                    newFolder.className = 'fadeable';

                    var styling = document.createElement("DIV");
                    styling.setAttribute("id", "styling");
                    var styling2 = document.createElement("DIV");
                    styling2.setAttribute("id", "styling2");

                    styling.style.position="fixed";
                    styling.style.height="20";
                    styling.style.width="20";
                    styling.style.backgroundColor="red";
                    styling.style.top=cursorY+10;
                    styling.style.left=cursorX+25;
                    styling.style.borderRadius="50%";

                    styling2.style.borderRadius="fixed";
                    styling2.style.borderRadius="20";
                    styling2.style.borderRadius="20";
                    styling2.style.backgroundColor="red";
                    styling2.style.top=cursorY+10;
                    styling2.style.left=cursorX+25;
                    styling2.style.borderRadius="50%";

                    window.setTimeout( function() {

                        newFolder.className += ' fade-in';

                    }, 100);

					
                    var children = newFolder.childNodes;
					
                    children.forEach(function(item){
							
							item.style.color="#393D40";
							item.style.textDecoration="none";
							var DirEnd = item.innerHTML;
							var DirStart = item.parentElement.parentElement.href;
							item.href= DirStart+DirEnd;
                    });


                }
            };
            xmlhttp.open('GET',url,true);
            xmlhttp.send();
        },500);

        firebase.database().ref('stack/' + date+"-"+(month+1)+'/'+hours+":"+minutes+":"+seconds).set({
            url: window.location.href
        });

    }

    firebase.initializeApp(config);
}

