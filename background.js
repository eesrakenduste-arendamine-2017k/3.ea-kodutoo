"use strict"
function TimeManagement() {
	this.weekdays = ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"];
	this.months = ["jaanuar", "veebruar", "märts", "april", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	this.time = 0;

	if(window.location.hostname === "stackoverflow.com"){
		this.copy_code();
	}
	this.init();
}


TimeManagement.prototype = {

	save_to_database: function(id) {

		firebase.initializeApp(config);
		firebase.database().ref("websites/" + id).set({
			"time"      : new Date().getTime(),
			"url"       : window.location.hostname,
			"protocol"  : window.location.protocol,
			"time_spent": this.time
		});
	},

	init: function() {

		// Juhul kui tab on aktiivne, siis iga sekundi tagant suurendab ajamuutujat.
		var that = this;
		var tiktok = setInterval(function() {
			if(document.hidden == false){
				that.time++;
				//console.log(that.time);
			}
		}, 1000);

		// Loob unikaalse id salvestamiseks.
		var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});

		// Teeb algse salvestuse.
		this.save_to_database(id);
		//console.log("Made initial save.");

		// Uuendab kirjet iga kolme sekundi tagant.
		// Trükib välja vastava teate konsooli.
		var db = firebase.database();
		var save_data = setInterval(function() {
			db.ref("/websites/" + id).update({"time_spent": master.time});
			//console.log("Updated data in the database");
		}, 3000);

		// Lehe kinni panemisel, viisakalt võtab välja kõik intervalid. Igaksjuhuks.
		window.onunload = function() {
			clearInterval(tiktok);
			clearInterval(save_data);
			//console.log("Cleared intervals");
		}
	},

	copy_code: function() {
		var code_sections = document.getElementsByClassName("default prettyprint prettyprinted");

		for(let i = 0; i < code_sections.length; i++){
			code_sections[i].addEventListener("dblclick", function() {
				var copyFrom = document.createElement("textarea");
				copyFrom.textContent = code_sections[i].textContent;
				var body = document.getElementsByTagName('body')[0];
				body.appendChild(copyFrom);
				copyFrom.select();
				document.execCommand('copy');
				body.removeChild(copyFrom);
			});
		}
	}
};


window.onload = function() {
	var master = new TimeManagement();
	window.master = master;
};