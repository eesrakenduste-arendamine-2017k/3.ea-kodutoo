var unencodedURLExtension = 'http://goo.gl/b7bnU';
	var likeURLExtension = encodeURIComponent(unencodedURLExtension);

	Array.prototype.remove = function() {  // teeb massiivi selle funktsiooniga
	    var what, a = arguments,
	        L = a.length,
	        ax;
	    while (L && this.length) {
	        what = a[--L];
	        while ((ax = this.indexOf(what)) != -1) {
	            this.splice(ax, 1);
	        }
	    }
	    return this;
	};



	var soundsToPlay;

window.onload = function(){ // lehe laadimisel paneb need funktsioonid t88le
			setSounds();

			checkPlayedSounds();

			addChangeListener();
			addClickListener();

			playAll();
};
	function addChangeListener() {
	    soundsToPlay = [];
      var volume = document.getElementById('volume');
      volume.addEventListener("change", function(){
        setVolume(volume.value); // m22rad volyymi
        localStorage.set("soundsVolume",volume.value);
      });


    var sounds = document.getElementsByClassName('sound');
    for (var i = 0; i < sounds.length; i++) {
      addListenerToSound(sounds[i]);
    }
	    return soundsToPlay;
	}

  function addListenerToSound(el){
    el.addEventListener("change", function(){
        ctrlAndPlay(el.id);
     });
  }



  function setVolume(volume) {
	    chrome.extension.getBackgroundPage()
	        .setVolume(volume);
	}

	function addClickListener() {
		var play = document.getElementById('btnPlay');
		play.addEventListener("click", function(){
			 playAll();
		 });
		var pause = document.getElementById('btnPause');
 		pause.addEventListener("click", function(){
 			 pauseAll();
		 });
	    /*$('#btnPlay')
	        .on("click", function() {
	            playAll();
	        });
	    $('#btnPause')
	        .on("click", function() {
	            pauseAll()
	        });*/
	}




	function getSoundsToPlay() {
	    soundsToPlay = [];
			var sounds = document.getElementsByClassName('sound');
	    for (var i = 0; i < sounds.length; i++) {
				if (sounds.checked) {
						soundsToPlay.push(sounds.id);
	    /*$('.sound')
	        .each(function(i) {
	            if (this.checked) {
	                soundsToPlay.push(this.id);
	            }*/
            }
	        }
	    return soundsToPlay;
	}


	function pauseAll() {
	    chrome.extension.getBackgroundPage()
	        .pauseAll();
	}

	function playAll() {
	    soundsToPlay = getSoundsToPlay();

	    saveOnLocalStorage(soundsToPlay);
	    chrome.extension.getBackgroundPage()
	        .playAll(soundsToPlay);
	    return true;
	}
function setSounds() {
	    var lines = sounds.split("\n");
	    for (var i = 0; i < lines.length; i++) {
	        var name = lines[i];
	        var description = name.replace(/^(.)|\s(.)/g, function($1) { //ma ei saa v2ga aru,
						//mis replace'i taga on
	            return $1.toUpperCase();
	        });
	        var el = document.createElement('audio');
					el.ClassName = 'sound';
					el.id = name;
					el.type = "checkbox";
					document.body.appendChild(el);
						/*$('#checks')
	            .append('<input class="sound" id="' + name + '" type="checkbox" />');*/
					// seda järgmist ma ei oska muuta
	        /*$('#checks')
	            .append('<label for="' + name + '">' + description + '</label>');*/
	    }
	}

	function checkPlayedSounds() {
	    var storedPlayedSounds = ["playedSounds"].localStorage;
	    if (storedPlayedSounds) {

	        var playedSounds = JSON.parse(storedPlayedSounds);

	        // valid colors are red, blue, green and yellow
	        if (playedSounds) {
	            for (var i = 0; i < playedSounds.length; i++) {
	                document.getElementById(playedSounds[i]).checked = true;
	            }
	        }

	    }

	    var storedVolume = ["soundsVolume"].localStorage;
	    if (!storedVolume) {
	        storedVolume = 50;
	    }
	    document.getElementById('volume').value = storedVolume;
	    setVolume(storedVolume);

	    $('input')
	        .customInput();
	}



	/*function playPauseSingle(name, checked) {
			if (!soundsToPlay) {
					soundsToPlay = getSoundsToPlay();
			}

			if (checked) {
					chrome.extension.getBackgroundPage()
							.playSingle(name);
					soundsToPlay.push(name);
			} else {
					chrome.extension.getBackgroundPage()
							.pauseSingle(name);

							// leia ja kustuta massiivist soundsToPlay
					soundsToPlay.remove(name);
			}
			saveOnLocalStorage(soundsToPlay);

	}

	function saveOnLocalStorage(soundsToPlay) {
			localStorage["playedSounds"] = JSON.stringify(soundsToPlay);
	}*/


	/*function ctrl() {
			soundsToPlay = getSoundsToPlay();
			if (soundsToPlay.length > 5) {
					return false;
			} else {
					return true;
			}
	}*/

	/*function uncheck(name) {
			$('#' + name)
					.attr('checked', false);
	}

	function ctrlAndPlay(name) {
			var checked = $('#' + name)
					.attr('checked');
			if (checked) {
					if (ctrl()) {
							playPauseSingle(name, checked);
					} else {
							uncheck(name);
					}
			} else {
					playPauseSingle(name, checked);
			}
	}*/
