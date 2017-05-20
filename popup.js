var unencodedURLExtension = 'http://goo.gl/b7bnU';
	var likeURLExtension = encodeURIComponent(unencodedURLExtension);

	Array.prototype.remove = function() {
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
	}


	var soundsToPlay;

// window.onload = function(){

//};
	$(document)
	    .ready(function() {

	        setSounds();

	        checkPlayedSounds();

	        addChangeListener();
	        addClickListener();

	        playAll();
	    });


	function addChangeListener() {
	    soundsToPlay = new Array();
      var volume = document.getElementById('volume');
      volume.addEventListener("change", function(){
        setVolume(volume.value);
        localStorage["soundsVolume"] = volume.value;
      });

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
	    $('#btnPlay')
	        .on("click", function() {
	            playAll();
	        });
	    $('#btnPause')
	        .on("click", function() {
	            pauseAll()
	        });
	}




	function getSoundsToPlay() {
	    soundsToPlay = new Array();
	    $('.sound')
	        .each(function(i) {
	            if (this.checked) {
	                soundsToPlay.push(this.id);
	            }

	        });
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

	function playPauseSingle(name, checked) {
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
	}


	function ctrl() {
	    soundsToPlay = getSoundsToPlay();
	    if (soundsToPlay.length > 5) {
	        return false;
	    } else {
	        return true;
	    }
	}

	function uncheck(name) {
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
	}

	function setSounds() {
	    var lines = sounds.split("\n");
	    for (var i = 0, len = lines.length; i < len; i++) {
	        var name = lines[i];
	        var description = name.replace(/^(.)|\s(.)/g, function($1) {
	            return $1.toUpperCase();
	        });
	        $('#checks')
	            .append('<input class="sound" id="' + name + '" type="checkbox" />');
	        $('#checks')
	            .append('<label for="' + name + '">' + description + '</label>');
	    }
	}

	function checkPlayedSounds() {
	    var storedPlayedSounds = localStorage["playedSounds"];
	    if (storedPlayedSounds) {

	        var playedSounds = JSON.parse(storedPlayedSounds);

	        // valid colors are red, blue, green and yellow
	        if (playedSounds) {
	            for (var i = 0; i < playedSounds.length; i++) {
	                $('#' + playedSounds[i])
	                    .attr('checked', true);
	            }
	        }
	    }

	    var storedVolume = localStorage["soundsVolume"];
	    if (!storedVolume) {
	        storedVolume = 50;
	    }
	    $('#volume')
	        .attr("value", storedVolume);
	    setVolume(storedVolume);

	    $('input')
	        .customInput();
	}
