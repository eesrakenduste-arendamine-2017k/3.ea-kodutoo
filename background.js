//firebase
var scriptTag = '<script src="https://www.gstatic.com/firebasejs/3.7.6/firebase.js"></script>';


//interact.js
var interactJS = '<script src="https://cdnjs.cloudflare.com/ajax/libs/interact.js/1.2.6/interact.min.js"></script>';

//note ikoon
var notesIcon ='<img src="https://assets.materialup.com/uploads/d0b393f6-3975-48dd-b7ca-bf0289187c6e/preview" id="drag-1" class="draggable">'

//------------- LISTIS OLEVAD ELEMENDID S-------------
//close list button
var closeIcon = "<img src='https://www.faricy.com/wp-content/uploads/2016/08/close-button.png' class='closeIcon' id='closeIcon'>";
var listInput = '<form id="submitForm"><input type="text" id="listInput"><input type="submit" id="submitButton" value="Sisesta"></form>';
// list div
var listDiv = '<div id="list"></div>';

var listForm = '<form id="listForm"></form>';
var formData = '<input type="submit" id="submitButton"><input type="text" id="listInput">';
//div kuhu sisse lähevad ul väärtused
var dataDiv = '<div id="dataDiv"></div>'
//var listTitle = "<h1 id='listTitle'>Notepad</h1>";
//------------- LISTIS OLEVAD ITEMID E-------------



// ADDING STUFF TO HTML
//document.body.innerHTML += scriptTag;
document.body.innerHTML += notesIcon;

//addin bodyle listi
document.body.innerHTML += listDiv;
//document.getElementById("list").innerHTML += listTitle;
document.getElementById("list").innerHTML += closeIcon;
//addin listile formi
document.getElementById("list").innerHTML += listForm;
//addin formile sisu
document.getElementById("listForm").innerHTML += formData;
//adding data divi
document.getElementById("list").innerHTML += dataDiv;




// FUNCTIONS
var kast = document.getElementById("list");
kast.style.visibility = "hidden";
// hide/show listi
document.getElementById("drag-1").addEventListener("dblclick", function(){
    var kast = document.getElementById("list");
	if(kast.style.visibility == "visible"){
		kast.style.visibility = "hidden";
	} else {
		kast.style.visibility = "visible";
	}
});
// sulge list x nupust
document.getElementById("closeIcon").addEventListener("click", function(){
	kast.style.visibility = "hidden";
});










//-----------------Ikooni liigutamine algab------------------

interact('.draggable')
  .draggable({
    
    inertia: true,
    
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    
    autoScroll: true,

    
    onmove: dragMoveListener,
    
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
  window.dragMoveListener = dragMoveListener;
//-----------------Ikooni liigutamine lõppeb------------------


//NEW FIREBASE START

var config = {
    apiKey: "AIzaSyAo_hm_wJNKnUxt-U6xbjAT_TdpMLEPj7E",
    authDomain: "note-bebd7.firebaseapp.com",
    databaseURL: "https://note-bebd7.firebaseio.com",
    projectId: "note-bebd7",
    storageBucket: "note-bebd7.appspot.com",
    messagingSenderId: "469109871476"
};
firebase.initializeApp(config);

console.log(firebase);

var database = firebase.database();

var ref = database.ref("note");

document.getElementById("submitButton").addEventListener("click", function(){
	var userNote = document.getElementById("listInput").value;
	var data = {
	note: userNote
	}
	ref.push(data);
	console.log(userNote);
});

//remove ul-id
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function gotData(data) {
	//consoloe.log(data.val());
	var notes = data.val();
	
	var keys = Object.keys(notes);
	console.log(keys);
	// removeElemtnsByClass removib ära, et peale igat uut väärtust ei kirjutataks tervet tabelit topelt üle
	removeElementsByClass("listItem");
	for(var i = 0; i < keys.length; i++){
		var k = keys[i];
		console.log(k);
		var oneNote = notes[k];
		//console.log(notes[k]);
		//console.log(notes[k].note);
		document.getElementById("dataDiv").innerHTML += '<ul class="'+ k +'"><li class="listItem">' + '<img id="'+ k +' "class="deleteValue"src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-512.png">'  + oneNote.note + '</li></ul>';
		//document.getElementsByClassName("listItem").innerHTML += '<img src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-512.png">';
	}
}

function errData(err) {
	console.log("error!");
	console.log(err);
}

ref.on("value", gotData, errData);
/*
function remove(key){
	database.ref("note/"+key).remove()
	.then(function(){
		console.log("removed successfully");
	})
	.catch(function(error){
		console.log(error);
	});
}
*/
//-----------------Firebase algus-----------------
/*
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





//funktsioon, millega saadan user inputi firebase´i 
function getNote(){
	var userNote = document.getElementById("listInput").value;
	console.log(userNote);
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

		//list.innerHTML += "<ul class='ul'id='ul" + i + "'><li>" + oneNote +"</li><img src='https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-512.png' id='" + i + "' width='15' height='15'></ul>";
	}
}

function errData(err) {
	console.log("Error!");
	console.log(err);
}
*/


/*
function remove(key){
	database.ref("note/"+key).remove()
	.then(function(){
		console.log("removed successfully");
	})
	.catch(function(error){
		console.log(error);
	});
}
*/



