console.log("Extension loaded");
var domainNameStart ="False";
var domainName="";


var url=window.parent.location.href;

//console.log(url);
for ( var i=0; i<url.length; i++){
    if( url[i]=="." && domainNameStart=="True"){
        domainNameStart="False";
        //console.log("LOPETAN");
        break;
    }
    if(domainNameStart=="True"){
        domainName+=url[i];
        //console.log("lisan domeeninime");
    }
    if( url[i]=="." && domainNameStart=="False"){
        domainNameStart="True";
        //console.log("ALUSTAN");
    }

    //console.log(i);
}

    console.log("Domain name: "+domainName);
    if(domainName=="reddit" || domainName=="facebook"|| domainName=="instagram" || domainName=="twitch" || domainName=="youtube" || domainName=="9gag" || domainName=="hiddenlol" || domainName=="imdb" || domainName=="rottentomatoes" || domainName=="hltv"){
        console.log("PAGE BLOCKED BY EXTENSION");
        var div = document.createElement("DIV");
        div.setAttribute("id", "Blocker");


        elements=document.getElementsByTagName("div");
        scripts=document.getElementsByTagName("script");
        for(var i=0;i<elements.length;i++){
            elements[i].style.opacity="0";
            elements[i].style.width="0";
            elements[i].style.height="0";
            elements[i].style.zIndex="-100";
            // document.body.removeChild(scripts[i]);
        }
        document.body.appendChild(div);
        //div.style.opacity="1";
        document.body.style.width=window.innerWidth+"px";
        document.body.style.height=window.innerHeight+"px";
        document.body.style.position="relative";
        div.style.opacity="1";

        div.style.backgroundColor="red";
        div.style.zIndex="1000000000000";
        div.style.position="absolute";
        div.style.width="100%";
        div.style.height="100%";
		
		var message = document.createElement("p");
        div.setAttribute("id", "Blocker");
		div.appendChild(message);
		message.style.zIndex="1000000000001";
		message.style.color="white";
		message.style.fontSize="50px";
		message.style.fontFamily="Times New Roman";
		message.style.textAlign="center";
		message.innerHTML = "<br><br><br><br>PAGE BLOCKED<br>START STUDYING";
		

}	