//document.getElementsByTagName("body")[0].innerHTML = "<h1>SUL ON VIIRUS</h1>";


document.getElementsByTagName("body")[0].innerHTML += "<h1 id='calc' style='display:none; z-index:9999; heigth:100px;width:100px;position:absolute;left:0;top:0;'>Kalkulaator</h1>";
document.getElementsByTagName("body")[0].innerHTML += "<h1 id='proov'>Proov</h1>";

window.addEventListener('keypress', function(e){
    if(e.key == "k"){
        document.getElementById('calc').style.display = "block";
    }else if(e.key == "h"){
        document.getElementById('calc').style.display = "none";
    }
});
