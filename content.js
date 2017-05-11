//alert("hello");

// file:///C:/Users/Karka/Downloads/Q%20School%202017%20-%20Event%201%20Live%20Match%20_%20World%20Snooker%20Live%20Scores.htm


window.onload = function() {
	
	var bodyElement = document.getElementsByTagName("body")[0];
	
	var newElement = document.createElement("div");
	newElement.style.cssText = "position: fixed; z-index: 999; width: 100%; background-color: lightblue; border: 2px solid;"
	

	var title = document.getElementById("tournament-name").childNodes[1].innerHTML;
	var round = document.querySelector(".component-title").innerText;
	
	var player1 = document.querySelector(".live-match-val-player1").innerText;
	var player2 = document.querySelector(".live-match-val-player2").innerText;
	
	var player1Frames = document.querySelectorAll("td")[0].innerText;
	var player2Frames = document.querySelectorAll("td")[1].innerText;
	
	var player1Points = document.querySelectorAll("td")[3].innerText;
	var player2Points = document.querySelectorAll("td")[4].innerText;
	
	var player1Break = document.querySelectorAll("td")[6].innerText;
	var player2Break = document.querySelectorAll("td")[7].innerText;
	
	
	var pointsLeftString = document.querySelectorAll("td")[5].innerText;
	var stringStart = pointsLeftString.indexOf(" points");
	var pointsLeft = pointsLeftString.slice(0, stringStart);
	
	var reds, yellow, green, brown, blue, pink, black;
	
	
	if(parseInt(pointsLeft) > 27) {
		reds = (parseInt(pointsLeft) - 27) / 8;
		yellow = 1;
		green = 1;
		brown = 1;
		blue = 1;
		pink = 1;
		black = 1;
	}
	
	if(parseInt(pointsLeft) === 27) {
		reds = 0;
		yellow = 1;
		green = 1;
		brown = 1;
		blue = 1;
		pink = 1;
		black = 1;
	}
	
	if(parseInt(pointsLeft) === 25) {
		reds = 0;
		yellow = 0;
		green = 1;
		brown = 1;
		blue = 1;
		pink = 1;
		black = 1;
	}
	
	if(parseInt(pointsLeft) === 22) {
		reds = 0;
		yellow = 0;
		green = 0;
		brown = 1;
		blue = 1;
		pink = 1;
		black = 1;
	}
	
	if(parseInt(pointsLeft) === 18) {
		reds = 0;
		yellow = 0;
		green = 0;
		brown = 0;
		blue = 1;
		pink = 1;
		black = 1;
	}
	
	if(parseInt(pointsLeft) === 13) {
		reds = 0;
		yellow = 0;
		green = 0;
		brown = 0;
		blue = 0;
		pink = 1;
		black = 1;
	}
	
	if(parseInt(pointsLeft) === 8) {
		reds = 0;
		yellow = 0;
		green = 0;
		brown = 0;
		blue = 0;
		pink = 0;
		black = 1;
	}
	
	if(parseInt(pointsLeft) === 0) {
		reds = 0;
		yellow = 0;
		green = 0;
		brown = 0;
		blue = 0;
		pink = 0;
		black = 0;
	}
	
	
	
	var player1Background = document.querySelectorAll(".text-center")[0];
	var player2Background = document.querySelectorAll(".text-center")[1];
	
	
	if(player1Break === "") {
		player2Background.style.backgroundColor = "yellow";
		player1Background.style.backgroundColor = "";
	} else {
		player1Background.style.backgroundColor = "yellow";
		player2Background.style.backgroundColor = "";
	}
	

	
	
	


	
	var tournamentName = document.createElement("p");
	var tournamentNameText = document.createTextNode("Tournament: " + title);
	tournamentName.appendChild(tournamentNameText);
	
	var roundName = document.createElement("p");
	var roundNameText = document.createTextNode("Round: " + round);
	roundName.appendChild(roundNameText);
	
	var player1Name = document.createElement("p");
	var player1NameText = document.createTextNode("player1: " + player1 + ", frames: " + player1Frames + ", points: " + player1Points + ", break: " + player1Break);
	player1Name.appendChild(player1NameText);
	
	var player2Name = document.createElement("p");
	var player2NameText = document.createTextNode("player2: " + player2 + ", frames: " + player2Frames + ", points: " + player2Points + ", break: " + player2Break);
	player2Name.appendChild(player2NameText);
	
	var pointsLeftName = document.createElement("p");
	var pointsLeftNameText = document.createTextNode("Points left: " + pointsLeft);
	pointsLeftName.appendChild(pointsLeftNameText);
	
	var ballsOnTable = document.createElement("p");
	var ballsOnTableText = document.createTextNode("On table - reds: " + reds + ", yellow: " + yellow + ", green: " + green + ", brown: " + brown + ", blue: " + blue +
		", pink: " + pink + ", black: " + black);
	ballsOnTable.appendChild(ballsOnTableText);
	
	
	
	newElement.appendChild(tournamentName);
	newElement.appendChild(roundName);
	newElement.appendChild(player1Name);
	newElement.appendChild(player2Name);
	newElement.appendChild(pointsLeftName);
	newElement.appendChild(ballsOnTable);
	
	bodyElement.insertBefore(newElement, bodyElement.firstChild);
	
	
	
	
	
	
	
}
