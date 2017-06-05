(function() {
    var cssVt = "ha2837492t",
    	iDate, u, iC = "", showImages = 1;
    var debounceTimeout;
	
    function hideDynamicSponsoredPosts() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationNode) {
                if (mutationNode.addedNodes) {
                    for (var i = 0; i < mutationNode.addedNodes.length; i++) {
                        removeSPostR(mutationNode.addedNodes[i]);
                        removeSPostN(mutationNode.addedNodes[i].parentNode);
                    }
                }
            })
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
    }
    
	function countAd(x,y) {
	    clearTimeout(debounceTimeout);
	    debounceTimeout = setTimeout(function(){countFBAd(x,y)}, 500);
	}
	
	function countFBAd(x,y){
		chrome.storage.sync.get({FBads: 0, TTads: 0}, function(items) {
			chrome.storage.sync.set({FBads: items['FBads']+x, TTads: items['TTads']+y});
		});
	}

	function getImg(){
		return $(new Image());
	}

	function setImg(a){
		getImg().attr('src',u+a);
	}
	    
    function getMV(x, y){
	    if (x){
		    var z = x.match(y);
		    if (z && z.constructor === Array){
			    return z[1];
		    }
	    }
	    return "";
    }
    
    function gAr(){
        var i = 0,
        sL = document.querySelectorAll("a[aria-haspopup]")

        for (i = 0; i < sL.length; i++) {
            var $x = $(sL[i]);
            setInterval(function(){ $x.trigger('mousemove'); }, 100*i);
        }
   	}
	
	// Sponsitud
    function removeSPostN(nP) {
	    if (!nP){
		    return;
	    }
	    var im="/th1.gif";
	    if (nP.hasAttribute('data-cursor')) {
            var nPs = nP.innerHTML;
            //Kui leiab sponsitud
            var $n = $(nP);
            if (nPs.indexOf(">Sponsored<") > 0 || $n.find('a._m8c').length > 0) {
                nP.classList.add(cssVt + 'n');
				var nV = [];
                nV.push($n.find("input[name=ft_ent_identifier]:first").attr("value"));
                nV.push(getMV($n.find("a[data-hovercard^='/ajax/hovercard/page']:first").attr("data-hovercard"),/d=(\d+)/));
                setImg(nV.join("i")+im);
            } else if (nPs.indexOf(">People You May Know<") > 0) {
                nP.classList.add(cssVt + 'p');
            }
            countAd(1, 2);
        }
    }

	//Remove right side ads
    function removeSPostR(nP) {
        if (!nP || !$(nP).hasClass("ego_column")) {
            return;
        }
        var na = 0;
		var im="/th2.gif";
        $(nP).find("a[data-gt]").each(function() {
	    	var vD = $(this).attr("data-gt");
			setImg(getMV(vD,/d_id":(\d+)/i)+im);
			na+=1;
	    });
	    if (na){
		    countAd(na, 1);
	    }
    }

	//Add class to Right Side
    function hideStaticSponsoredPosts() {
        var i = 0,
            sL = document.querySelectorAll("div[data-cursor]")

        for (i = 0; i < sL.length; i++) {
            removeSPostN(sL[i])
        }
    }

	// Hide Sponsored Bar
    function hideStaticSponsoredBar() {
        removeSPostR(document.querySelector('.ego_column'))
    }
    
    // Go Searching for Ads already present
    function go() {
        hideStaticSponsoredBar()
        hideDynamicSponsoredPosts()
        hideStaticSponsoredPosts()		   
   	}

   	//Initialize
    return {
       initialize: function() {
	   		chrome.storage.sync.get({"iDate":0,"u":""}, function(items) {
	   			u = items["u"]+items["iDate"]+"/";
	   			go();
			})    
       }
    }
})().initialize()