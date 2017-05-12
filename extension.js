var i, website=0, Awebsite=0;
var childDataURL = [];
var childDataWORDS = [];
var word = [];
var AurlArray = [];
var urlArray = [];
var wordsArray = [];
var currentURL = window.location.href;

var bodyHTML = document.body.innerHTML.replace(/<[^>]*>/g, "").toLowerCase();


document.body.style.opacity = "0.1";
firebase.initializeApp(config);

getAllowedURL();

function getAllowedURL(){
	var ALLOWEDURLRef = firebase.database().ref('ALLOWEDURL');
	ALLOWEDURLRef.on('value', function(snapshot){
		AurlArray = snapshot.val().AllowedURL;
		getBlockedURL();
	});
}

function getBlockedURL(){
	var BLOCKEDURLRef = firebase.database().ref('BLOCKEDURL');
	BLOCKEDURLRef.on('value', function(snapshot){
		//console.log(snapshot.val().BlockedURL);
		urlArray = snapshot.val().BlockedURL;
		getBlockedWORDS();
	});
}

function getBlockedWORDS(){
	var BLOCKEDWORDSRef = firebase.database().ref('BLOCKEDURLWORDS');
	BLOCKEDWORDSRef.on('value', function(snapshot){
		//console.log(snapshot.val());
		wordsArray = snapshot.val().BlockedWords;
		init();
	});
}


function init() {

	console.log(AurlArray);
	console.log(urlArray);
	console.log(wordsArray);

	for(i=0; i<AurlArray.length; i++){
		if(currentURL == AurlArray[i]){
			//console.log("Siin veebilehel ei pea kontrollima");
			Awebsite++;
		}
	}


	if(Awebsite === 0){
		//document.body.style.opacity = "0.1";
		for(i=0; i<urlArray.length; i++) {
			if(currentURL == urlArray[i]){
				//console.log("Sobimatu veebileht");
				website++;
				var choiceURL = confirm("See veebileht võib sisaldada sobimatut sisu. Kas tahate jätkata?");
				if(choiceURL === false){
					window.history.back();
					console.log("Läheb tagasi");
				}
			}
		}

		if(website === 0){
			for(i=0; i<wordsArray.length; i++) {
			//indexOf() returns -1 if the string wasn't found at all
				if(bodyHTML.indexOf(wordsArray[i]) >= 0) {
					//console.log("Selline sõna on olemas");
					word.push(wordsArray[i]);
				} else {
					//console.log("Sellist sõna ei ole olemas");
				}
			}

			if(word.length !== 0){
				var choiceWord = confirm("See veebileht sisaldab märksõnu, mis võivad olla sobimatud. Kas soovite jätkata? Sobimatud sõnad: "+word); //Mõnikord ei jõua ära otsida sobimatuid sõnu
				if(choiceWord === false){
					//console.log("Kirjutas ei");
					window.history.back();
				} else {
					//console.log("Oli nõus");
				}

			}
		}
	}
	document.body.style.opacity = "1";
}

/*
ADMEBAASI LISAMISE VEEBILEHTEDE JA SÕNADE KOOD:

	var blockedWords = ["kass","koer", "NightMode", "Foto"];
	var blockedURL = ["https://et.wikipedia.org/wiki/Kass", "https://et.wikipedia.org/wiki/Koer", "https://www.youtube.com/"];
	var allowedURL = ["http://www.delfi.ee/"];


	blockedStuffURL(blockedURL);
	blockedStuffWORDS(blockedWords);
	allowedStuffURL(allowedURL);

	function blockedStuffURL(blockedURL){
		//Using set() overwrites data at the specified location, including any child nodes.
		firebase.database().ref('BLOCKEDURL/').set({ //KAUSTA NIMI
			BlockedURL: blockedURL,
		});
	}

	function blockedStuffWORDS(blockedWords){
		//Using set() overwrites data at the specified location, including any child nodes.
		firebase.database().ref('BLOCKEDURLWORDS/').set({ //KAUSTA NIMI
			BlockedWords: blockedWords,
		});
	}

	function allowedStuffURL(allowedURL){
		firebase.database().ref('ALLOWEDURL/').set({ //KAUSTA NIMI
			AllowedURL: allowedURL,
		});
	}

*/