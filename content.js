firebase.initializeApp(config);
var imageElements = document.getElementsByTagName('img');
var videos = document.getElementsByTagName('video');
		
navigator.getBattery().then(function(battery) {
  function updateAllBatteryInfo(){

	if (battery.charging==false){	
		//var imageElements = document.getElementsByTagName('img');
		for (i = 0; i < imageElements.length;i++ ) {
			createElementAndAddListener(imageElements[i]);
		};
	} else if (battery.charging==true){
		//var images = document.getElementsByTagName('img');
		for (i = 0; i < imageElements.length;i++ ) {
			imageElements[i].style.display = "initial";
		};
		}
		
	if (battery.charging==false){
		var videos = document.getElementsByTagName('video');
		for (i = 0; i < videos.length;i++ ) {
			videos[i].style.display = "none";
		};
	} else if (battery.charging==true){
		var videos = document.getElementsByTagName('video');
		for (i = 0; i < videos.length;i++ ) {
			videos[i].style.display = "block";
		};
		}
	
	if (battery.charging==false){
		var iframes = document.getElementsByTagName('iframe');
		for (i = 0; i < iframes.length;i++ ) {
				iframes[i].style.display = "none";
		};
	} else if (battery.charging==true){
		var iframes = document.getElementsByTagName('iframe');
		for (i = 0; i < iframes.length;i++ ) {
			iframes[i].style.display = "block";
		};
		}
		
	setInterval(function() {
		updateChargeInfo();
	}, 1000)
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
  }
  updateAllBatteryInfo();
  
battery.addEventListener('chargingchange', function(){
	
	setInterval(function() {
		if (battery.charging==false){
			var imageElements = document.getElementsByTagName('img');
			if (imageElements[i].style.display=="initial"){
				for (i = 0; i < imageElements.length;i++ ) {	
					createElementAndAddListener(imageElements[i]);
				} 
			} else if (imageElements[i].style.display=="none"){
				console.log("juba peidus");
			};
	} else if (battery.charging==true){
		var imageElements = document.getElementsByTagName('img');
		for (i = 0; i < imageElements.length;i++ ) {
			imageElements[i].style.display = "initial";
		};
	}}, 1000);
	
	setInterval(function() {
	if (battery.charging==false){
		var videos = document.getElementsByTagName('video');
		for (i = 0; i < videos.length;i++ ) {
			videos[i].style.display = "none";
		};
	} else if (battery.charging==true){
		var videos = document.getElementsByTagName('video');
		for (i = 0; i < videos.length;i++ ) {
			videos[i].style.display = "block";
		};
	}}, 1000);
	
	setInterval(function() {
	if (battery.charging==false){
		var iframes = document.getElementsByTagName('iframe');
		for (i = 0; i < iframes.length;i++ ) {
			iframes[i].style.display = "none";
		};
	} else if (battery.charging==true){
		var iframes = document.getElementsByTagName('iframe');
		for (i = 0; i < iframes.length;i++ ) {
			iframes[i].style.display = "block";
		};
		}}, 1000);	
	});
   
	function updateChargeInfo(){
		console.log("Battery charging? "
                + (battery.charging ? "Yes" : "No"));	
				var imageElements = document.getElementsByTagName('img');
		if (battery.charing==false && imageElements[i].style.display=="initial"){
			for (i = 0; i < imageElements.length;i++ ) {	
				createElementAndAddListener(imageElements[i]);
			} 
		} else if (imageElements[i].style.display=="none"){
			console.log("juba peidus");
		};
	}

	battery.addEventListener('levelchange', function(){
		updateLevelInfo();
	});
  
	function updateLevelInfo(){
		console.log("Battery level: "
                + battery.level * 100 + "%");
	}

	battery.addEventListener('chargingtimechange', function(){
		updateChargingInfo();
	});
  
	function updateChargingInfo(){
		console.log("Battery charging time: " + battery.chargingTime + " seconds");
	}

	battery.addEventListener('dischargingtimechange', function(){  
	});
  
	function updateDischargingInfo(){
		console.log("Battery discharging time: " + battery.dischargingTime + " seconds");
	}
	
	var guid=function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}

var vids = videos.length;
var imgs = imageElements.length;
	
	firebase.database().ref('images/' + guid()).set({
		aeg: Date(),
		url: window.location.href,
		peidetud_piltide_arv: imgs,
		peidetud_videote_arv: vids
	});
	
  firebase.initializeApp(config);
 
  });
  
  
function createElementAndAddListener(img){	
	var positionInfo = img.getBoundingClientRect();
	var height = positionInfo.height;
	var width = positionInfo.width;
	img.style.display = "none";

	  
	var placeholder = document.createElement("div");
	placeholder.style.height=height+"px";
	placeholder.style.width=width+"px";
	placeholder.style.backgroundColor="grey";
	img.parentElement.appendChild(placeholder);
	  
	placeholder.addEventListener("click", function(event){
		event.preventDefault();
	});
	placeholder.addEventListener("click", function(event){
		  
		event.preventDefault()
		img.style.display="initial";
		placeholder.style.display="none";
		
	});
}