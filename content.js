firebase.initializeApp(config);

navigator.getBattery().then(function(battery) {
  function updateAllBatteryInfo(){
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener('chargingchange', function(){
    updateChargeInfo();
  });
  
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
    updateDischargingInfo();
  });
  
  function updateDischargingInfo(){
    console.log("Battery discharging time: "
                 + battery.dischargingTime + " seconds");
  }
  
  
	if (battery.charging==false){
		var images = document.getElementsByTagName('img');
		setInterval(function(){ for (i = 0; i < images.length;i++ ) {
			images[i].style.display = "none";
		}}, 1000)
		setInterval(function() {console.log(images.length); }, 1000)
	} else if (battery.charging==true){
		var images = document.getElementsByTagName('img');
		for (i = 0; i < images.length;i++ ) {
			images[i].style.display = "initial";
		}
	}
	

	var imgs = images.length;
	
	firebase.database().ref('images/' + imgs).set({
		peidetud_piltide_arv: imgs
	});
	
  firebase.initializeApp(config);
	
});