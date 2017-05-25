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
    let stripedTitle = elementTitle.replace(/ *\([^)]*\) */g, "");
    //Discogs search
    let URL = "https://www.discogs.com/search/?q=" + stripedTitle;
    element.addEventListener("click", function(){
        window.open(URL);
    });
    fetch('https://api.discogs.com/database/search?q=' + elementTitle + '&token=MgXEXtEsiKFHKaOPPQtzPraAOhHDxMHWXHxBgQrb')
        .then(res => res.json())
        .then(function(data) {
            let query = (data)
            let id = query.results[0].id
            fetch('https://api.discogs.com/releases/'+id+'?eur')
                .then(res => res.json())
                .then(function(data) {
                    console.log(id)
                    let masterQuery = (data)
                    let lowestPrice = masterQuery.lowest_price
                    let style = masterQuery.styles[0]
                    let year = masterQuery.year
                    let have = masterQuery.community.have
                    let want = masterQuery.community.want
                    let country = masterQuery.country
                    div.innerHTML = "<ul><li>Want : "+want+"</li><li>Have: "+have+"</li><li>Lowest price: "+lowestPrice+"€"+
                        "</li><li>Country: "+country+"</li><li>Style: "+style+"</li><li> Year: "+year+"</li></ul>"
                })
        });
    firebase.initializeApp(config);
    let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    firebase.database().ref('discogs/' + id).set({
        date: new Date(),
        title: elementTitle,
        query: stripedTitle,
        url: URL
    });
}