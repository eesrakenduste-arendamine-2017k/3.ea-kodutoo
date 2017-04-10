/*DRAGDROP START*/
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
/*DRAG DROP END*/

function display(){
	var kast = document.getElementById("list");
	if(kast.style.visibility == "visible"){
		kast.style.visibility = "hidden";
	} else {
		kast.style.visibility = "visible";
	}
}

var i = 0;
var list = document.getElementById("list");
//var li = "<li>Im some kind of a random text with no useful value for anyone</li><img src='trash.png' id='trash" + i + "' width='15' height='15'>";
//var create = "<ul>" + li + "</ul>";
while(i < 5 ){ 
    
	list.innerHTML += "<ul id='ul" + i + "'><li>Im some kind of a random text with no useful value for anyone</li><img src='trash.png' id='" + i + "' width='15' height='15' onClick='reply_click(this.id)'></ul>";
	
	//list.innerHTML += create;
	i += 1;
}

var arrayWithElements = new Array();

// võtab id clickitud kustutamis ikoonilt ning selle järgi määrab milline ul ära kustutatakse
function reply_click(clicked_id)
{
    console.log(clicked_id);
	document.getElementById("ul" + clicked_id).style.display = "none";
}


