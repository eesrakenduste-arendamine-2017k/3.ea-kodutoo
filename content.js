firebase.initializeApp(config);
var images = document.getElementsByTagName('img');
var videos = document.getElementsByTagName('video');
var dateString = "";


navigator.getBattery().then(function(battery) {
  function updateAllBatteryInfo(){
	  
	if (battery.charging==false){
		var images = document.getElementsByTagName('img');
		for (i = 0; i < images.length;i++ ) {
			images[i].style.display = "none";
			//createElementAndAddListener(images[i]);
		};
	} else if (battery.charging==true){
		var images = document.getElementsByTagName('img');
		for (i = 0; i < images.length;i++ ) {
			images[i].style.display = "initial";
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
    updateChargeInfo();
	
	setInterval(function() {
		if (battery.charging==false){
		var images = document.getElementsByTagName('img');
		for (i = 0; i < images.length;i++ ) {
			images[i].style.display = "none";
			//createElementAndAddListener(images[i]);
		};
		setInterval(function() {console.log(images.length); }, 15000)
	} else if (battery.charging==true){
		var images = document.getElementsByTagName('img');
		for (i = 0; i < images.length;i++ ) {
			images[i].style.display = "initial";
		};
	}}, 1000);
	
	setInterval(function() {
	if (battery.charging==false){
		var videos = document.getElementsByTagName('video');
		for (i = 0; i < videos.length;i++ ) {
			videos[i].style.display = "none";
		};
		setInterval(function() {console.log(videos.length); }, 15000)
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
		setInterval(function() {console.log(iframes.length); }, 15000)
	} else if (battery.charging==true){
		var iframes = document.getElementsByTagName('iframe');
		for (i = 0; i < iframes.length;i++ ) {
			iframes[i].style.display = "block";
		};
	}}, 1000);
	
	
  });
  
  /*function createElementAndAddListener(image){
	console.log(image);	
	var positionInfo = image.getBoundingClientRect();

	var height = positionInfo.height;
	var width = positionInfo.width;
	image.style.display = "none";

	  
	var placeholder = document.createElement("img");
	placeholder.style.height=height+"px";
	placeholder.style.width=width+"px";
	placeholder.style.backgroundColor="grey";
	image.parentElement.appendChild(placeholder);
	  
	placeholder.addEventListener("click", function(event){
		event.preventDefault();
	});
	placeholder.addEventListener("click", function(event){
		  
		//event.preventDefault()
		image.style.display="initial";
		placeholder.style.display="none";
		
	});
	*/  
  
  function updateChargeInfo(){
    console.log("Battery charging? "
                + (battery.charging ? "Yes" : "No"));	
	
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
    console.log("Battery charging time: "
                 + battery.chargingTime + " seconds");
  }

  battery.addEventListener('dischargingtimechange', function(){
    
  });
  
  function updateDischargingInfo(){
    console.log("Battery discharging time: "
                 + battery.dischargingTime + " seconds");
  }
  
	function addZeroBefore(dateNumber) {
		if (dateNumber < 10) {
			dateNumber = '0' + dateNumber;
		}
		return dateNumber;
	}

	function getDayName(day){
		if(day===0){
			day="Puhapäev";
		}if(day==1){
			day="Esmaspäev";
		}if(day==2){
			day="Teisipäev";
		}if(day==3){
			day="Kolmapäev";
		}if(day==4){
			day="Neljapäev";
		}if(day==5){
			day="Reede";
		}if(day==6){
			day="Laupäev";
		}
		return day;
	}

	function getMonthName(month){
		if(month===0){month="Jaanuar";}
		if(month==1){month="Veebruar";}
		if(month==2){month="Märts";}
		if(month==3){month="Aprill";}
		if(month==4){month="Mai";}
		if(month==5){month="Juuni";}
		if(month==6){month="Juuli";}
		if(month==7){month="August";}
		if(month==8){month="September";}
		if(month==9){month="Oktoober";}
		if(month==10){month="November";}
		if(month==11){month="Detsember";}
		return month;
	}
  
	var getCurrentDate = function(){
		var currentDate = new Date();

		var hours = currentDate.getHours();
		var minutes = currentDate.getMinutes();
		var seconds = currentDate.getSeconds();
		var day = currentDate.getDay();
		var month = currentDate.getMonth();
		var date = currentDate.getDate();

		dateString = addZeroBefore(hours) + ':' + addZeroBefore(minutes) + ':' + addZeroBefore(seconds) + '<br>' + getDayName(day) + '<br>' + date + '.\n' + getMonthName(month);
	};
  

	var vids = videos.length;
	var imgs = images.length;
	console.log(dateString);
	
	firebase.database().ref('images/' + "peidetud piltide arv:" + imgs + "peidetud videote arv:" + vids + dateString).set({
		aeg: dateString,
		peidetud_piltide_arv: imgs,
		peidetud_videote_arv: vids
	});
	
  firebase.initializeApp(config);
	
});