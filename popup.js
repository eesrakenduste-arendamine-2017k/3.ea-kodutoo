var refreshDisplayTimeout;
var bgpage = chrome.extension.getBackgroundPage();
var previousValues = [3, 5, 10, 30];
var editing = false;

document.addEventListener('DOMContentLoaded', function () {
    load();
    document.querySelector('#start').addEventListener('click', setTimer);
    document.querySelector('#cancel').addEventListener('click', reset);
    document.querySelector('#wrench').addEventListener('click', swap);
    document.querySelector('#pause').addEventListener('click', pauseTimer);
    document.querySelector('#resume').addEventListener('click', resumeTimer);
    document.querySelector('#restart').addEventListener('click', restartTimer);
});

function show(section)
{
    document.getElementById(section).style.display = "block";
}

function showInline(section)
{
    document.getElementById(section).style.display = "inline";
}

function hide(section)
{
    document.getElementById(section).style.display = "none";
}

function load()
{
    hide("settings");
    hide("modify");
    hide("resume");
    editing = false;
    
    // kui timer on pausi peal, kaotab pausi nupu ära ja tekitab resume nupu
    if(bgpage.pauseDate)
    {
        showInline("resume");
        hide("pause");
    }
   
	// laeb seadetesse ise salvestatud aegasid, kui neid on lisatud
	for(var i = 0; i < document.choices.radio.length; i++)
		if(localStorage[i] != null)
			document.getElementById("s"+i).textContent = localStorage[i];
    
   // if timer is off, show settings
	if(!bgpage.alarmDate)
	{
		show("settings");
      hide("display");
	}
	
	// näita aega
	else
	{
		show("display");
      refreshDisplay();
		show("modify");
	}
}

function getChoice()
{
	// leiab sisestatud ajavaliku
	var num;
	for(var i = 0; i < document.choices.radio.length; i++)
	{
		if(document.choices.radio[i].checked == true)
			num = parseInt(document.getElementById("s"+i).textContent);
	}
	return num;
}

function swap()
{
	editing = true;
	
	// kui muutmine õnnestus, kinnitab muutmiskastid
	for(var i = 0; i < document.choices.radio.length; i++)
	{
		var span = document.getElementById("s"+i);
		var num = parseInt(span.textContent);
		
		previousValues[i] = num;
		
		var html = "<input class='input-mini' type='text' name='custom' id='c"+i;
		html += "' value='"+num;
		html += "'>";
        
		span.innerHTML = html;
	}
    
	// muudab edit nupu done nupuks
	var butt = document.getElementById("swapper");
	butt.innerHTML = "<a href='#' id='done' class='btn'><i></i>Kinnita</a>";
   document.querySelector('#done').addEventListener('click', swapBack);
}

function swapBack()
{
	// muudab kinnitatud timeri ajad textboxiks, et neid saaks nuuta
	for(var i = 0; i < document.choices.radio.length; i++)
	{
		var span = document.getElementById("s"+i);
		var num = parseInt(document.getElementById("c"+i).value);
		
		if(isValid(num))
        {
            localStorage[i] = num;
            span.textContent = num;
        }
		else
			span.textContent = previousValues[i];
	}
	
	// muuda done nupp edit nupuks
	var butt = document.getElementById("swapper");
	butt.innerHTML = "<a href='#' id='wrench'><i></i>Muuda</a>";
   document.querySelector('#wrench').addEventListener('click', swap);
	
	editing = false;
}

function setTimer()
{
	// kas pole muutmise menüüs?
	if(editing)
		swapBack();
	
	//timer hakkab tagataustal jooksma valitud ajaga
	//peidan seaded, kuvan aja tiksumist
    
	var num = getChoice();
	
	// kui timer läheb tööle, peidan settingute nupp ja kuvan reseti nupp
	if(isValid(num))
	{
		bgpage.setAlarm(num * 60000);
		hide("settings");
		show("modify");
      show("display");
		refreshDisplay();
	}
	else
		bgpage.error();
}
function isValid(amt)
{
	// seadete alt saab maksimaalseks timeri pikkuseks valida 240min e 4 tundi
	if(isNaN(amt) || (amt == null))
		return false;
	else if((amt < 0) || (amt > 240))
		return false;
	else
		return true;
}

function refreshDisplay()
{
   percent = bgpage.getTimeLeftPercent();
   
   if(percent < 15)
      document.getElementById("bar").style.color = "grey";
	document.getElementById("bar").textContent = bgpage.getTimeLeftString();
   document.getElementById("bar").style.width = percent + "%";
    
	refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
}

function pauseTimer()
{
    hide("pause");
    showInline("resume");
    bgpage.pause();
    clearTimeout(refreshDisplayTimeout);
}

function resumeTimer()
{
    hide("resume");
    showInline("pause");
    refreshDisplay();
    bgpage.resume();
}

function restartTimer()
{
    hide("resume");
    showInline("pause");
    refreshDisplay();
    bgpage.restart();
}

function reset()
{
	clearTimeout(refreshDisplayTimeout);
	bgpage.turnOff();
	hide("display");
	show("settings");
	hide("modify");
}