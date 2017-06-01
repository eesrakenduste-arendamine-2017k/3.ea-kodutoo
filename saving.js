
firebase.initializeApp(config);
console.log("Extension loaded!");
var isHovered = false;
var buttonPressed = false;
var check;


$("a").hover(
	function(hovered){
		isHovered = true;
		check = setInterval(function() {
			if (buttonPressed && isHovered) {
				//console.log("Ready to save");
				if (hovered.currentTarget.innerText != "") {

					var id = hovered.currentTarget.innerText.replace(/[.#$\[\]]/g," ");

				    $.when(firebase.database().ref('news/' + id).set({
				    	title: hovered.currentTarget.innerText,
				    	url: hovered.currentTarget.href,
				    	date: new Date()
				    })).then(function() {
				    	$("body").css("visibility", "hidden");
				    	setTimeout(function() {
				    		$("body").css("visibility", "visible");
				    	}, 200);
				    });
				}
			}
		}, 10);
		//console.log("Started hovering the link");
		//console.log(hovered.currentTarget.href);
		//console.log(hovered.currentTarget.innerText);
	},function() {
		isHovered = false;
		clearInterval(check);
		//console.log("Left the link");
	})
$(document).keydown(function(pressed) {
	if (pressed.which == 89) {
		buttonPressed = true;
		//console.log("y keydown");
	}
})
$(document).keyup(function(pressed) {
	if (pressed.which == 89) {
		buttonPressed = false;
		//console.log("y keyup");
	}
})

function remove(id) {
    var articleToDelete = firebase.database().ref('news/'+id);
    articleToDelete.remove()
    data();
}

function data() {
	console.log("algas");
	console.log($("#tblContents").length);
	if ($("#tblContents").length) {
		console.log("sain sisse");
		var divContents = "";
	    var articles = firebase.database().ref('news/');//Won't allow this in, because apparently it violates Content Security Policy
	    divContents = "<table style='width:100%;'><tr><th>Uudis</th><th>Link</th><th></th></tr>";
	    $.when(articles.once('value', function(snapshot) {
	        for (var i in snapshot.val()) {
	            divContents += "<tr><td>"+snapshot.val()[i]["title"]+"</td><td><a href='"+snapshot.val()[i]["url"]+"'>"+snapshot.val()[i]["url"]+"</a></td><td><button id='deleteEntry'>Kustuta</button></td></tr>";
	        }
	        $("#tblContents").html(divContents);
	    })).then(function() {addDelButtons();});
		console.log("Tere");
	}
	/*
    */
}

function addDelButtons() {
	var data;
	var keys;
	var articlesTD = firebase.database().ref('news/');
    articlesTD.once('value', function(snapshot) {
    	/*
		Author: Kristjan Liiva
		@ https://github.com/kliiva5/3.ea-kodutoo/blob/master/webmanager.js lines:75-93
		2017.05.31
    	*/
        data = snapshot.val();
        if (data == null) {
        	return
        }
        keys = Object.keys(data);
        for(i = 0; i < keys.length; i++){
		    var deleteButtons = document.querySelectorAll('#deleteEntry');
		    for(i = 0; i < deleteButtons.length; i++){
		      deleteButtons[i].addEventListener('click', remove.bind(null,  keys[i]), false);
		    }
		}
    });
}

window.onload = data;