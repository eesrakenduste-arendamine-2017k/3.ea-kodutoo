document.addEventListener("spfdone", process);
document.addEventListener("DOMContentLoaded", process);
document.onload = process();
function process() {
    console.log("loaded extension!");
    let div = document.createElement('div');
    div.id = 'discogs';
    div.style.padding = "10px 10px 10px 0px";
    document.getElementById("watch7-user-header").appendChild(div);
    let element = document.getElementById("eow-title");
    let elementTitle = document.getElementById("eow-title").title;
    //on hover change cursor to pointer
    element.style.cursor = 'pointer';
    //on mouse over change color to gray
    element.onmouseover = function () {
        element.style.color = 'gray';
    };
    //back to black
    element.onmouseout = function () {
        element.style.color = 'black';
    };

    //Discogs search
    fetch('https://api.discogs.com/database/search?q=' + elementTitle + '&token=MgXEXtEsiKFHKaOPPQtzPraAOhHDxMHWXHxBgQrb')
        .then(res => res.json())
        .then(function(data) {
            let query = (data)
            let id
            if (query.results.length>0) {
                 let id = query.results[0].id
                let uri = query.results[0].uri
                let URL = "https://www.discogs.com"+uri
                element.addEventListener("click", function(){
                    window.open(URL);
                });
                fetch('https://api.discogs.com/releases/'+id+'?eur')
                    .then(res => res.json())
                    .then(function(data) {
                        let want
                        let have
                        let country
                        let style
                        let year
                        let lowestPrice
                        let masterQuery = data
                        if (typeof masterQuery.lowest_price !== 'undefined' && masterQuery.lowest_price !== null ) {
                            lowestPrice = masterQuery.lowest_price
                        }else{
                            lowestPrice = "-"
                        }

                        if (typeof masterQuery.styles !== 'undefined' && masterQuery.styles !== null ) {
                            style = masterQuery.styles[0]
                        }else{
                            style = "-"
                        }
                        if (typeof masterQuery.year !== 'undefined' && masterQuery.year !== null ) {
                            year = masterQuery.year
                        }else{
                            year = "-"
                        }
                        if (typeof masterQuery.community.have !== 'undefined' && masterQuery.community.have !== null ) {
                            have =  masterQuery.community.have
                        }else{
                            have = "-"
                        }
                        if (typeof masterQuery.community.want !== 'undefined' && masterQuery.community.want !== null ) {
                            want =  masterQuery.community.want
                        }else{
                            want = "-"
                        }
                        if (typeof masterQuery.country !== 'undefined' && masterQuery.country !== null ) {
                            country =  masterQuery.country
                        }else{
                            country = "-"
                        }
                        div.innerHTML = "<ul><li>Want : "+want+"</li><li>Have: "+have+"</li><li>Lowest price: "+lowestPrice+"€"+
                            "</li><li>Country: "+country+"</li><li>Style: "+style+"</li><li> Year: "+year+"</li></ul>"
                        firebase.initializeApp(config);
                        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                            return v.toString(16);
                        });
                        firebase.database().ref('discogs/' + id).set({
                            date: new Date(),
                            title: elementTitle
                        });
                    })

            }else{
                console.log("not found on discogs")
            }
        });

}