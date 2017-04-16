//note ikoon
var notesIcon ='<img src="https://icons.veryicon.com/ico/Application/openPhone/Notes.ico" id="drag-1" class="draggable">'

//close list button
var closeIcon = "<img src='https://www.faricy.com/wp-content/uploads/2016/08/close-button.png' class='closeIcon' id='closeIcon'>";

// list div, kogu sisu
var listDiv = '<div id="list"></div>';

var formData = '<input type="button" value="Submit" id="submitButton"><input type="text" id="listInput" placeholder="Type your notes here">';
//div kuhu sisse lähevad ul väärtused

//div kuhu kirjutatakse data
var dataDiv = '<div id="dataDiv"></div>'




// ADDING TO HTML

document.body.innerHTML += notesIcon;
//addin bodyle listi
document.body.innerHTML += listDiv;
//document.getElementById("list").innerHTML += listTitle;
document.getElementById("list").innerHTML += closeIcon;
//addin input fieldi ja submit buttoni, form elementi ei saa kasutada, sest muidu refreshib lehte iga kord, kui submitin
document.getElementById("list").innerHTML += formData;
//adding divi, kuhu sisse kuvatakse data
document.getElementById("list").innerHTML += dataDiv;





var mainList = document.getElementById("list");
// et list oleks alguses peidetud
mainList.style.visibility = "hidden";
// hide/show listi
document.getElementById("drag-1").addEventListener("dblclick", function(){
    var mainList = document.getElementById("list");

	if(mainList.style.visibility == "visible"){
		mainList.style.visibility = "hidden";
	} else {
		mainList.style.visibility = "visible";
	}
});
// sulge list [x] nupust
document.getElementById("closeIcon").addEventListener("click", function(){
	mainList.style.visibility = "hidden";
});




// FIREBASE START
var config = {
	// Kallis kursakaaslane, please keep scrolling
    apiKey: "AIzaSyAo_hm_wJNKnUxt-U6xbjAT_TdpMLEPj7E",
    authDomain: "note-bebd7.firebaseapp.com",
    databaseURL: "https://note-bebd7.firebaseio.com",
    projectId: "note-bebd7",
    storageBucket: "note-bebd7.appspot.com",
    messagingSenderId: "469109871476"
	//thank you
};

firebase.initializeApp(config);
//console.log(firebase);

var database = firebase.database();
var ref = database.ref("note");

// submit data onkeypress
window.addEventListener('keypress', function (e) {
    //kas keypress oli "Enter" ja et kas õige input field on active
	if (e.keyCode == 13 && document.activeElement.id == "listInput") {
		   var userNote = document.getElementById("listInput").value;
		//input ei tohi tühi olla
		if(userNote.length == 0){
			alert("Tühi väli!");
		} else {
		var data = {
		note: userNote
		}
		//andmebaasi saatmine
		ref.push(data);
		console.log(userNote);
		}
		//teen inputi tühjaks peale väärtuse sisestamist
		document.getElementById("listInput").value = "";
    }
}, false);

// submit data onclick
document.getElementById("submitButton").addEventListener("click", function(){
	var userNote = document.getElementById("listInput").value;
	//input ei tohi tühi olla
	if(userNote.length == 0){
		alert("Tühi väli!");
	} else {
		var data = {
		note: userNote
		}
		//andmebaasi saatmine
		ref.push(data);
		console.log("added element with value: " + userNote);
		//teen inputi tühjaks peale väärtuse sisestamist
		document.getElementById("listInput").value = "";
		}
});

//remove elemendid class-i järgi
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//kuulab igale elemendile vajutamist ja kui className == deleteValue, siis toimetab edasi
document.addEventListener('click', function(e) {
	var str = e.target
	removeElementsByClass(str.id);
	//console.log(str);
	//kontrollib kas clickitud elemendi className on sama ja vastavalt juhul eemaldab andmebaasist väärtuse.
	if(str.className == "deleteValue"){
		//console.log("deleted");
		//console.log(str.id);
		database.ref("note/"+str.id).remove();
		console.log("Removed element with ID: " + str.id);
	}
});

ref.on("value", gotData, errData);

function gotData(data) {
	var notes = data.val();
	//consoloe.log(data.val());
	var keys = Object.keys(notes);
	console.log(keys);
	
	// removeElemtnsByClass removib ära, et peale igat uut väärtust ei kirjutataks tervet tabelit topelt üle
	removeElementsByClass("listItem");
	document.getElementById("dataDiv").innerHTML = "";
	for(var i = 0; i < keys.length; i++){
		var k = keys[i];
		//console.log(k);
		var oneNote = notes[k];
		//console.log(notes[k]);
		document.getElementById("dataDiv").innerHTML += '<ul class="'+ k +'"><li class="listItem">' + '<img id="'+k+'" class="deleteValue"src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-512.png">'  + oneNote.note + '</li></ul>';
		}
}

function errData(err) {
	console.log("error!");
	console.log(err);
}



//-----------------Ikooni liigutamine algab interact.js------------------
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





//var titleElement = document.getElementById("dataDiv");
//var titleChildren = titleElement.getElementsByTagName("img");

//articles = titleElement.getElementsByTagName("img");

//console.log(articles.length);

//document.addEventListener('click', function(e) {
//    alert(e.target.id);
//});





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



