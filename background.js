$(document)
    .ready(function() {
        setSounds();
    });



function pauseAll() {
    $('.player')
        .each(function(i) {
            this.pause();
        });
}


function playAll(ids) {
    pauseAll();

    for (var i = 0; i < ids.length; i++) {
        document.getElementById(ids[i])
            .play();
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
    var lines = sounds.split("\n");
    for (var i = 0, len = lines.length; i < len; i++) {
        var name = lines[i];
        $('body')
            .append('<audio class="player" id="' + name + '" src="./audio/' + name + '.ogg" controls loop preload="auto" autobuffer></audio>');
        $('#' + name)
            .attr('volume', '.3');
    }
}
