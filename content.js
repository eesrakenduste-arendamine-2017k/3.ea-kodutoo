//alert("hello");

// file:///C:/Users/Karka/Downloads/Q%20School%202017%20-%20Event%201%20Live%20Match%20_%20World%20Snooker%20Live%20Scores.htm


window.onload = function() {
	
	var bodyElement = document.getElementsByTagName("body")[0];
	var contentArea = document.querySelectorAll(".live-match");
	
	var newElement = document.createElement("div");
	newElement.style.cssText = "position: relative; width: 1200px; background-color: white; border: 2px solid;"
	
	var newCanvas = document.createElement("canvas");
	newCanvas.style.cssText = "width: 250px; height: 125px;";
	
	
	

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
	
	newElement.appendChild(newCanvas);
	
	bodyElement.insertBefore(newElement, bodyElement.firstChild);
	
	
	
	
	
	
	
	
	
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext('2d');

	var x = 20;
	var y = 15;
	var innerRadius = 3;
	var outerRadius = 25;
	var radius = 15;
	
	
	var reds1 = function() {
		var offsetX = 33;
		var offsetY = 0;
		var oX = offsetX * 0;
		var oY = offsetY * 0;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds2 = function() {
		var offsetX = 33;
		var offsetY = 0;
		var oX = offsetX * 1;
		var oY = offsetY * 0;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds3 = function() {
		var offsetX = 33;
		var offsetY = 0;
		var oX = offsetX * 2;
		var oY = offsetY * 0;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds4 = function() {
		var offsetX = 33;
		var offsetY = 0;
		var oX = offsetX * 3;
		var oY = offsetY * 0;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds5 = function() {
		var offsetX = 33;
		var offsetY = 0;
		var oX = offsetX * 4;
		var oY = offsetY * 0;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds6 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 0.5;
		var oY = offsetY * 0.9;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds7 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 1.5;
		var oY = offsetY * 0.9;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds8 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 2.5;
		var oY = offsetY * 0.9;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds9 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 3.5;
		var oY = offsetY * 0.9;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds10 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 1;
		var oY = offsetY * 1.8;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds11 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 2;
		var oY = offsetY * 1.8;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds12 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 3;
		var oY = offsetY * 1.8;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds13 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 1.5;
		var oY = offsetY * 2.7;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds14 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 2.5;
		var oY = offsetY * 2.7;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var reds15 = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 2;
		var oY = offsetY * 3.6;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFA07A');
		gradient.addColorStop(1, 'red');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	
	
	
	var howManyReds = function(reds) {
		
		switch(reds) {
			case 1:
				reds1();
				break;
			
			case 2:
				reds1();
				reds2();
				break;
				
			case 3:
				reds1();
				reds2();
				reds3();
				break;
				
			case 4:
				reds1();
				reds2();
				reds3();
				reds4();
				break;
				
			case 5:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				break;
				
			case 6:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				break;
				
			case 7:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				break;
				
			case 8:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				reds8();
				break;
				
			case 9:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				reds8();
				reds9();
				break;
				
			case 10:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				reds8();
				reds9();
				reds10();
				break;
				
			case 11:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				reds8();
				reds9();
				reds10();
				reds11();
				break;
				
			case 12:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				reds8();
				reds9();
				reds10();
				reds11();
				reds12();
				break;
				
			case 13:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				reds8();
				reds9();
				reds10();
				reds11();
				reds12();
				reds13();
				break;
				
			case 14:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				reds8();
				reds9();
				reds10();
				reds11();
				reds12();
				reds13();
				reds14();
				break;
				
			case 15:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				reds8();
				reds9();
				reds10();
				reds11();
				reds12();
				reds13();
				reds14();
				reds15();
				break;
		}
		
	};
	
	
	howManyReds(reds);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	


	
	
	
	
	
	
	
	
	
}
