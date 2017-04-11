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
/*while(i < 5 ){ 
    
	list.innerHTML += "<ul id='ul" + i + "'><li>Im some kind of a random text with no useful value for anyone</li><img src='trash.png' id='" + i + "' width='15' height='15' onClick='reply_click(this.id)'></ul>";
	
	//list.innerHTML += create;
	i += 1;
}*/

var arrayWithElements = new Array();

// võtab id clickitud kustutamis ikoonilt ning selle järgi määrab milline ul ära kustutatakse
function reply_click(clicked_id)
{
    console.log(clicked_id);
	document.getElementById("ul" + clicked_id).style.display = "none";
}




//teen inputi
/*
var initialInput;
initialInput = document.createElement("INPUT");
initialInput.setAttribute("type", "text");
*/

// FIREBASE START
 // Initialize Firebase

 
 
var config = {
    apiKey: "AIzaSyAo_hm_wJNKnUxt-U6xbjAT_TdpMLEPj7E",
    authDomain: "note-bebd7.firebaseapp.com",
    databaseURL: "https://note-bebd7.firebaseio.com",
    projectId: "note-bebd7",
    storageBucket: "",
    messagingSenderId: "469109871476"
};
firebase.initializeApp(config);

console.log(firebase);

//connection to db
var database = firebase.database();

var ref = database.ref("note");
/*
var data = {
	note: "this is my note made in firebase"
}*/

//FIREBASE ENDS

//funktsioon, millega saadan user inputi firebase´i
function getNote(){
	var userNote = document.getElementById("input").value;
	var data = {
	note: userNote
	}
	ref.push(data);
}

ref.on("value", gotData, errData);

//remove ul-id
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function gotData(data){
	//console.log(data.val());
	var notes = data.val();
	var keys = Object.keys(notes);
	console.log(keys);
	// removeElemtnsByClass removib ära, et peale igat uut väärtust ei kirjutataks tervet tabelit topelt üle
	removeElementsByClass("ul");
	for( var i = 0; i < keys.length; i++){
		var k = keys[i];
		var oneNote = notes[k].note;
		console.log(oneNote);
		//list.innerHTML -= oneNote;
		//document.getElementsByClassName("ul").value = "";

		list.innerHTML += "<ul class='ul'id='ul" + i + "'><li>" + oneNote +"</li><img src='trash.png' id='" + i + "' width='15' height='15' onClick='reply_click(this.id)'></ul>";
	}
}

function errData(err) {
	console.log("Error!");
	console.log(err);
}


