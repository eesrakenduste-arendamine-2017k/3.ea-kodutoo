$(document).ready(function() { //funktsioon setSounds() läheb tööle, kui lehekülg on laetud
        setSounds();
    });



function pauseAll() {
    $('.player').each(function(i) { // funktsioon each()
            this.pause();
        });
}


function playAll(ids) {
    pauseAll();

    for (var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).play();
    }


}

function playSingle(id) {
    document.getElementById(id)
        .play();
}

function pauseSingle(id) {
    document.getElementById(id)
        .pause();
}

function setVolume(volume) {
    $('.player')
        .each(function(i) {
            this.volume = volume / 100;
        });
}


function setSounds() {
    var allsounds = sounds.split("\n");
    for (var i = 0, len = allsounds.length; i < len; i++) {
        var name = allsounds[i];
        $('body')
            .append('<audio class="player" id="' + name + '" src="./audio/' + name +
            '.ogg" controls loop preload="auto" autobuffer></audio>');
        $('#' + name)
            .attr('volume', '.3');
    }
}
