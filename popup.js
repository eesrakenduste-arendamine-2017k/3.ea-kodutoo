var APP = function(){

	//singleton
    if (APP.instance_) {
        return APP.instance_;
    }
    APP.instance_ = this;
    this.init();

};

APP.prototype = {

	// Funktsioon, mille käivitame alguses
	init: function(){
    var htmlValidation = document.getElementById("htmlValidation");
    var cssValidation = document.getElementById("cssValidation");
    var action = document.getElementById("action");
    htmlValidation.addEventListener('click', this.htmlValidation.bind(this));
    cssValidation.addEventListener('click', this.cssValidation.bind(this));
    action.addEventListener('click', this.convertPTSizes.bind(this));
    
	},
  htmlValidation: function(event){
      chrome.tabs.getSelected(null, function(tab) {
          window.open("https://validator.w3.org/check?uri="+tab.url, '_blank');
      });

  },

  cssValidation: function(event){
    chrome.tabs.getSelected(null, function(tab) {
        window.open("https://jigsaw.w3.org/css-validator/validator?uri="+tab.url, '_blank');
    });
  },
  convertPTSizes: function(event){
    var ptSize = document.getElementById("fromPT").value;
    var answerArea = document.getElementById("answer");
    var answer;

    if (document.getElementById("toPX").checked) {
           answer = ptSize * (96 / 72) + "px";
       }
       else if (document.getElementById("toEM").checked) {
           answer = ptSize * (1 / 12) + "em";
       }
       else if (document.getElementById("toPERCENT").checked) {
           answer = ptSize * (100 / 12) + "%";
       }
       else {

           }



      answerArea.innerHTML = answer;
  }
};


window.onload = function(){
	var chromeExtension = new APP();
	window.chromeExtension = chromeExtension;

};
