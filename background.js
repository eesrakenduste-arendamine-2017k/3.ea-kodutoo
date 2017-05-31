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
				//console.log("Salvestamisekoht");

				var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			        return v.toString(16);
			    });
				
			    firebase.database().ref('news/' + id).set({     title:
			    hovered.currentTarget.innerText,     url:
			    hovered.currentTarget.href,     date: new Date() });

			}
		}, 10);
		//console.log("Läksin peale");
		//console.log(hovered.currentTarget.href);
		//console.log(hovered.currentTarget.innerText);
	},function() {
		isHovered = false;
		clearInterval(check);
		//console.log("Lahkusin");
	})
$(document).keydown(function(pressed) {
	if (pressed.which == 89) {
		buttonPressed = true;
		//console.log("Vajutasid y'it");
	}
})
$(document).keyup(function(pressed) {
	if (pressed.which == 89) {
		buttonPressed = false;
		//console.log("Lasid y üles");
	}
})
