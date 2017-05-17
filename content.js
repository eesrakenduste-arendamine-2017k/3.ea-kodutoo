window.onload = function() {
	
	// uued elemendid
	
	var newElement = document.createElement("div");
	newElement.style.cssText = "position: fixed; z-index: 999; width: 1200px; background-color: white; border: 2px solid;"
	
	var newCanvas = document.createElement("canvas");
	newCanvas.style.cssText = "width: 250px; height: 125px; margin: 7px;";
	
	var br = document.createElement("br");
	
	var newHideButton = document.createElement("button");
	newHideButton.className = "hide-button";
	newHideButton.innerText = "^^ Hide ^^";
	newHideButton.style.display = "inline";
	
	var newDisplayButton = document.createElement("button");
	newDisplayButton.className = "display-button";
	newDisplayButton.innerText = "vv Show vv";
	newDisplayButton.style.display = "none";
	
	
	
	// elemendid ja info, mille saan lehelt kätte
	
	var bodyElement = document.getElementsByTagName("body")[0];

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
	
	var player1Background = document.querySelectorAll(".text-center")[0];
	var player2Background = document.querySelectorAll(".text-center")[1];
	
	var pointsLeftString = document.querySelectorAll("td")[5].innerText;
	var stringStart = pointsLeftString.indexOf(" points");
	var pointsLeft = pointsLeftString.slice(0, stringStart);
	var pointsLeftNum = parseInt(pointsLeft);
	
	var totalFramesString = document.querySelectorAll("td")[2].innerText;
	var stringStartPos = totalFramesString.indexOf("of ");
	var totalFrames = parseInt(totalFramesString.slice(stringStartPos + 3));
	
	var reds, yellow, green, brown, blue, pink, black;
	
	
	
	// show/hide canvase nupud
	
	newHideButton.addEventListener("click", clickHide);
	newDisplayButton.addEventListener("click", clickDisplay);
	
	function clickHide() {
		newCanvas.style.display = "none";
		newHideButton.style.display = "none";
		newDisplayButton.style.display = "inline";
		newElement.style.position = "relative";
	}
	
	function clickDisplay() {
		newCanvas.style.display = "inline";
		newHideButton.style.display = "inline";
		newDisplayButton.style.display = "none";
		newElement.style.position = "fixed";
	}
	
	
	
	// arvutan mitu ja millised pallid on lauas (numbrites kuvamiseks)
	
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
	
	if(parseInt(pointsLeft) === 7) {
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
	
	
	
	// muudan tausta selle järgi kumma mängija käes on mängimiskord (ehk kes mängib lauas parajasti)
	
	if(player1Break === "") {
		player2Background.style.backgroundColor = "yellow";
		player1Background.style.backgroundColor = "";
	} else {
		player1Background.style.backgroundColor = "yellow";
		player2Background.style.backgroundColor = "";
	}
	
	
	
	// uued elemendid tekstina kuvamiseks (enamasti katsetamiseks)
	
	/* var tournamentName = document.createElement("p");
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
	pointsLeftName.appendChild(pointsLeftNameText); */
	
	var ballsOnTable = document.createElement("p");
	var ballsOnTableText = document.createTextNode("On table - reds: " + reds + ", yellow: " + yellow + ", green: " + green + ", brown: " + brown + ", blue: " + blue +
		", pink: " + pink + ", black: " + black);
	ballsOnTable.appendChild(ballsOnTableText);
	
	
	
	// lisan elemendid lehele
	
	//newElement.appendChild(tournamentName);
	//newElement.appendChild(roundName);
	//newElement.appendChild(player1Name);
	//newElement.appendChild(player2Name);
	//newElement.appendChild(pointsLeftName);
	newElement.appendChild(ballsOnTable);
	newElement.appendChild(newCanvas);
	newElement.appendChild(br);
	newElement.appendChild(newHideButton);
	newElement.appendChild(newDisplayButton);
	bodyElement.insertBefore(newElement, bodyElement.firstChild);
	
	
	
	// tekitan canvase graafiliselt lauas olevate pallide kuvamiseks
	
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext('2d');

	var x = 20;
	var y = 15;
	var innerRadius = 3;
	var outerRadius = 25;
	var radius = 15;
	
	
	// funktsioonid punaste pallide genereerimiseks
	
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
	
	
	// funktsioonid värviliste pallide genereerimiseks
	
	var yellowB = function() {
		var offsetX = 33;
		var offsetY = 0;
		var oX = offsetX * 5.6;
		var oY = offsetY * 0;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FAFAD2');
		gradient.addColorStop(1, '#FFD700');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var greenB = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 8;
		var oY = offsetY * 0;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#90EE90');
		gradient.addColorStop(1, 'green');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var brownB = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 6.8;
		var oY = offsetY * 0;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#DEB887');
		gradient.addColorStop(1, '#8B4513');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var blueB = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 6.8;
		var oY = offsetY * 1.2;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#87CEEB');
		gradient.addColorStop(1, 'blue');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var pinkB = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 6.8;
		var oY = offsetY * 2.4;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#FFE4E1');
		gradient.addColorStop(1, '#FF69B4');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	var blackB = function() {
		var offsetX = 33;
		var offsetY = 33;
		var oX = offsetX * 6.8;
		var oY = offsetY * 3.6;
		
		var gradient = ctx.createRadialGradient(x + oX, y + oY, innerRadius, x + oX, y + oY, outerRadius);
		gradient.addColorStop(0, '#808B96');
		gradient.addColorStop(1, 'black');
		
		ctx.beginPath();
		ctx.arc(x + oX, y + oY, radius, 0, 2 * Math.PI);
		ctx.fillStyle = gradient;
		ctx.fill();
		ctx.closePath();
	};
	
	
	// funktsioon, mis leiab millised pallid peavad mingi hetk lauas olema vastavalt laual olevate punktide järgi
	
	var howManyReds = function(pointsLeft) {
		
		var reds = (pointsLeft - 27) / 8;
		
		switch(reds) {
			
			case 1:
				reds1();
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
				break;
			
			case 2:
				reds1();
				reds2();
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
				break;
				
			case 3:
				reds1();
				reds2();
				reds3();
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
				break;
				
			case 4:
				reds1();
				reds2();
				reds3();
				reds4();
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
				break;
				
			case 5:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
				break;
				
			case 6:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
				break;
				
			case 7:
				reds1();
				reds2();
				reds3();
				reds4();
				reds5();
				reds6();
				reds7();
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
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
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
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
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
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
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
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
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
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
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
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
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
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
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
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
				yellowB();
				greenB();
				brownB();
				blueB();
				pinkB();
				blackB();
				break;
				
			default:
				if(pointsLeft === 27) {
					yellowB();
					greenB();
					brownB();
					blueB();
					pinkB();
					blackB();
				}
				
				if(pointsLeft === 25) {
					greenB();
					brownB();
					blueB();
					pinkB();
					blackB();
				}
				
				if(pointsLeft === 22) {
					brownB();
					blueB();
					pinkB();
					blackB();
				}
				
				if(pointsLeft === 18) {
					blueB();
					pinkB();
					blackB();
				}
				
				if(pointsLeft === 13) {
					pinkB();
					blackB();
				}
				
				if(pointsLeft === 7) {
					blackB();
				}
				break;
		}
		
	};
	
	
	// käivitan funktsiooni, mis genereerib laual olevat pallid graafiliselt
	
	howManyReds(pointsLeftNum);
	
	
	
	// andmebaasiga ühendamine ja salvestamine
	
	firebase.initializeApp(config);
	
	setInterval(function() {
		
		var date = new Date();
		var milliSeconds = date.getTime();
		var matchId = milliSeconds.toString();
		
		firebase.database().ref("playerdata/" + matchId).set({
			tournament_name: title,
			match_round: round,
			total_frames: totalFrames,
			player1: player1,
			player2: player2,
			player1_frames: player1Frames,
			player2_frames: player2Frames,
			player1_points: player1Points,
			player2_points: player2Points,
			player1_break: player1Break,
			player2_break: player2Break,
			pointsleft: pointsLeftNum,
			date: new Date()
		});
		
		console.log("salvestas");
		
	}, 10000);
	
}
