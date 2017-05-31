console.log("loaded extension");
alert("Images are saved to your firebase");
var body = document.getElementsByTagName('body')[0];
var imagesrc = body.getElementsByTagName('img');
var divsrc = body.getElementsByTagName('div');

var zip = new JSZip();
var count = 0;
var date = new Date();

date = date.toLocaleDateString('en-GB');
date = date.replace(/\//g, '-');

var zipFilename = window.location.href + date + ".rar";
zipFilename = zipFilename.substring(zipFilename.lastIndexOf("//") + 2);

var img = zip.folder("images");
var urls = [];
for (var i = 0; i < imagesrc.length; i++) {

    urls.push(imagesrc[i].src);
    toImg(imagesrc[i]);

}

var storageRef = firebase.storage().ref();

function toImg(image) {
    toDataUrl(image.src, function(base64Img) {

        var blob = dataURLtoBlob(base64Img);

        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        if (blob.size < 10000) {
            storageRef.child('images/' + zipFilename + '/' + 'small' + '/' + id).put(blob);
        } else {
            storageRef.child('images/' + zipFilename + '/' + id).put(blob);
        }
    });
}


function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}

//console.log(blob);
//console.log(storageRef);
urls.forEach(function(url) {
    var filename;
    if (url.indexOf('jpg') != -1 || url.indexOf('JPG') != -1) {
        filename = url.substring(url.lastIndexOf('/') + 1);
        filename = filename.substr(0, filename.indexOf('jpg') + 3);
        console.log(filename);
    }

    if (url.indexOf('png') != -1) {
        filename = url.substring(url.lastIndexOf('/') + 1);
        filename = filename.substr(0, filename.indexOf('png') + 3);
    }

    if (url.indexOf('images') != -1) {
        filename = url.substring(url.lastIndexOf('/') + 1) + ".jpg";
    }

    // loading a file and add it in a zip file
    JSZipUtils.getBinaryContent(url, function(err, data) {
        if (err) {
            throw err; // or handle the error
        }
        img.file(filename, data, {
            binary: true
        });
        count++;
        if (count == urls.length) {
            zip.generateAsync({
                    type: "blob"
                })
                .then(function(content) {
                    saveAs(content, zipFilename);
                });
        }
    });


});
