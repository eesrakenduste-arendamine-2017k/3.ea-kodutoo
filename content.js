//document.getElementsByTagName("body")[0].innerHTML = "<h1>SUL ON VIIRUS</h1>";

document.getElementsByTagName("body")[0].innerHTML += "<h1 id='calc' style='display:none'>Kalkulaator</h1>";
document.getElementsByTagName("body")[0].innerHTML += "<div id='calc_html' style='display:none;'></div>";

window.addEventListener('keypress', function(e){
    if(e.key == "k"){
        document.getElementById('calc').style.display = "block";
        document.getElementById('calc_html').style.display = "block";
    }else if(e.key == "h"){
        document.getElementById('calc').style.display = "none";
        document.getElementById('calc_html').style.display = "none";
    }
});

var html = chrome.extension.getURL('templates/calc.html');
var xhr = new XMLHttpRequest;
xhr.open("GET", html);
xhr.onreadystatechange = function() {
  if (this.readyState == 4) {
    document.getElementById("calc_html").innerHTML = xhr.response;

	var config = {
		apiKey: "AIzaSyBIqOEz8zwIUf8NZ2RqeAEC5AAirrtTUtQ",
		authDomain: "randomtest-3ae67.firebaseapp.com",
		databaseURL: "https://randomtest-3ae67.firebaseio.com",
		projectId: "randomtest-3ae67",
		storageBucket: "randomtest-3ae67.appspot.com",
		messagingSenderId: "459956111256"
	};
	firebase.initializeApp(config);

	var firstnumber;  
	var secondnumber;  
	var result;  
	var operations;  
	var lcd = document.getElementById("lcd");
	var lcdu = document.getElementById("lcdu");
	  
	document.getElementById("num1").onclick = function(){
		if (lcd.value == "0" || lcd.value == result){  

		lcd.value = "1";  
		  
		}  
		else //if(lcd.value != "0")  
		{  
		lcd.value = lcd.value + "1";  
		}  
	   
	}  
	document.getElementById("num2").onclick = function(){
	   
	 if (lcd.value == "0" || lcd.value == result){  
		
	  lcd.value = "2";  
		  
	 }  
	 else //if(lcd.value != "0")  
	 {  
	  lcd.value = lcd.value + "2";  
	 }  
	   
	}  
	document.getElementById("num3").onclick = function(){
		
	  if (lcd.value == "0" || lcd.value == result){  
		
	  lcd.value = "3";  
		  
	 }  
	 else //if(lcd.value != "0")  
	 {  
	  lcd.value = lcd.value + "3";  
	 }  
		
	}  
	document.getElementById("num4").onclick = function(){ 
	   
	 if (lcd.value == "0" || lcd.value == result){  
		
	  lcd.value = "4";  
		  
	 }  
	 else //if(lcd.value != "0")  
	 {  
	  lcd.value = lcd.value + "4";  
	 }  
	   
	}  
	document.getElementById("num5").onclick = function(){
	   
	 if (lcd.value == "0" || lcd.value == result){  
		
	  lcd.value = "5";  
		  
	 }  
	 else //if(lcd.value != "0")  
	 {  
	  lcd.value = lcd.value + "5";  
	 }  
	   
	}  
	document.getElementById("num6").onclick = function(){
	   
	 if (lcd.value == "0" || lcd.value == result){  
		
	  lcd.value = "6";  
		  
	 }  
	 else //if(lcd.value != "0")  
	 {  
		lcd.value = lcd.value + "6";  
	 }  
	   
	}  
	document.getElementById("num7").onclick = function(){
	   
	 if (lcd.value == "0" || lcd.value == result){  
		
	  lcd.value = "7";  
		  
	 }  
	 else //if(lcd.value != "0")  
	 {  
		lcd.value = lcd.value + "7";  
	 }  
	}  
	document.getElementById("num8").onclick = function(){
	   
	 if (lcd.value == "0"){  
		
	  lcd.value = "8";  
		  
	 }  
	 else if (lcd.value == result)  
	 {  
	  lcd.value = "8";  
	 }  
	 else //if(lcd.value != "0")  
	 {  
	  lcd.value = lcd.value + "8";  
	 }  
	   
	}  
	document.getElementById("num9").onclick = function(){
	   
	 if (lcd.value == "0" || lcd.value == result){  
		
	  lcd.value = "9";  
		  
	 }  
	 else //if(lcd.value != "0")  
	 {  
	  lcd.value = lcd.value + "9";  
	 }  
	   
	}  
	document.getElementById("num0").onclick = function(){
	   
	 if (lcd.value == "0"){  
		
	  lcd.value = "0";  
		  
	 }  
	 else if (lcd.value == result)  
	 {  
	  lcd.value = "0";  
	 }  
	 else //if(lcd.value != "0")  
	 {  
	  lcd.value = lcd.value + "0";  
	 }  
	   
	}  
	document.getElementById("num00").onclick = function(){
	   
	 if (lcd.value == "0" || lcd.value == result){  
		
	  return;  
		  
	 }  
	 else //if(lcd.value != "0")  
	 {  
	  lcd.value = lcd.value + "00";  
	 }  
	   
	}  
	document.getElementById("clr").onclick = function(){
	 lcd.value = "0";  
	 lcdu.value = "";  
	 return;  
	}  
	  
	document.getElementById("operationplus").onclick = function(){
	   
	 operation = "+";  
	 firstnumber = parseInt(lcd.value);  
	 lcd.value = "0";  
	 lcdu.value = firstnumber + operation;  
	 //alert(firstnumber);  
		
	}  
	document.getElementById("operationmult").onclick = function(){
	   
	 operation = "*";  
	 firstnumber = parseInt(lcd.value);  
	 lcd.value = "0";  
	 lcdu.value = firstnumber + operation;  
	   
	}  
	document.getElementById("operationminus").onclick = function(){
	   
	 operation = "-";  
	 firstnumber = parseInt(lcd.value);  
	 lcd.value = "0";  
	 lcdu.value = firstnumber + operation;  
	   
	}  
	document.getElementById("operationdivid").onclick = function(){
	   
	 operation = "/";  
	 firstnumber = parseInt(lcd.value);  
	 lcd.value = "0";  
	 lcdu.value = firstnumber + operation;  
	   
	}  
	document.getElementById("operationperc").onclick = function(){
	   
	 operation = "%";  
	 firstnumber = parseInt(lcd.value);  
	 lcd.value = "0";  
	 lcdu.value = firstnumber + operation;  
	   
	}  
	document.getElementById("submit").onclick = function(){
	   
	 secondnumber = parseInt(lcd.value);  
	   
	 if (operation == "+")  
	 {  
	  result = firstnumber + secondnumber;  
	 }  
	 else if (operation == "*"){  
		
	  result = firstnumber * secondnumber;  
		
	 }  
	 else if (operation == "-"){  
		
	  result = firstnumber - secondnumber;  
		
	 }    
		else if (operation == "/"){  
		
	  result = firstnumber / secondnumber;  
		 
	 }  
	 else if (operation == "%"){  
		
	  if (lcd.value == "0"){  
		
	  result = firstnumber / 100;  
	  lcdu.value = firstnumber + operation + "100";  
	  }  
	  else if (lcd.value != "0")  {  
	   result = firstnumber / secondnumber * 100;  
	   lcdu.value = firstnumber + operation + secondnumber + "*100 = " + result;  
	  }  
	 }  
	 else if (operation == "^"){  
		
	  for (var i = 0; i < secondnumber; i++){  
		 
	   result = firstnumber * i;  
	  }  
		
		
	 }  
	 lcd.value ="";  
	 lcd.value = result.toString();  
	 lcdu.value = firstnumber + operation + secondnumber + " = " + result.toString();  
	 
	var date = new Date();
		date = date.toJSON();
	firebase.database().ref('log').push().set({
		date: date,
		equation: firstnumber + operation + secondnumber,
		answer: result.toString(),
	});
	
	 return;  
	   
	}  
	  
	document.getElementById("operationsqrt").onclick = function(){
	 firstnumber = lcd.value;  
	 result = Math.sqrt(parseInt(lcd.value));  
	 lcd.value = result;  
	 lcdu.value = "sqrt(" + firstnumber + ") = " + result;  
	   
	}  
	  
	document.getElementById("operationraistop").onclick = function(){
	   
	 operation = "^";  
	 firstnumber = parseInt(lcd.value);  
	 lcd.value = "0";  
	   
	}  

  }
};
xhr.send();
