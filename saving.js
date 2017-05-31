
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

				    firebase.database().ref('news/' + id).set({
				    	title: hovered.currentTarget.innerText,
				    	url: hovered.currentTarget.href,
				    	date: new Date()
				    });
					
					/*
					var exists = true;
					var articles = firebase.database().ref('news/' + id);
					articles.on('value', function(snapshot) {
						if (snapshot.val() == null) {
							exists = false;
						}
					});
					if(!exists) {
					    firebase.database().ref('news/' + id).set({
					    	title: hovered.currentTarget.innerText,
					    	url: hovered.currentTarget.href,
					    	date: new Date()
					    });
					}
					*/
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
    id = id.replace(/["_"]/g, " ");
    var articleToDelete = firebase.database().ref('news/'+id);
    articleToDelete.remove()
    data();
}

function data() {
    var divContents = "";
    var articlesTD = firebase.database().ref('news/');
    divContents = "<table style='width:100%;'><tr><th>Uudis</th><th>Link</th><th></th></tr>";
    articlesTD.once('value', function(snapshot) {
        for (var i in snapshot.val()) {
            divContents += "<tr><td>"+snapshot.val()[i]["title"]+"</td><td><a href='"+snapshot.val()[i]["url"]+"'>"+snapshot.val()[i]["url"]+"</a></td><td><button onclick='remove(id)' id='"+i.replace(/[" "]/g, "_")+"'>Kustuta</button></td></tr>";
        }
        $("#tblContents").html(divContents);
    });         
}

data();