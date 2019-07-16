// Meme generator

function createImg(){
    var newDiv = document.createElement("div");
     var tText = document.createElement("div");
     var bText= document.createElement("div");
     var jsimg = document.createElement("img");
     var imgvalue = document.getElementById("imeme").value;
     var jsGall =  document.getElementById("gallery");
    newDiv.className = "image"; 
    tText.className = "toptext"; 
    bText.className = "bottomtext";
    jsimg.setAttribute('src', imgvalue);
    tText.innerHTML = document.getElementById("tmeme").value;
    bText.innerHTML = document.getElementById("bmeme").value;
    jsGall.appendChild(newDiv)
    newDiv.appendChild(jsimg);
    newDiv.appendChild(tText);
    newDiv.appendChild(bText);
   
    document.getElementById("tmeme").value = '';
    document.getElementById("bmeme").value = '';
    document.getElementById("imeme").value = '';
    createButton();
 }
function createButton() {
    var test = document.getElementsByClassName("Delbuttedit");
    if(test.length > 0){
        return;
    }
    var p = document.createElement('p');
    p.className = "pclass"
    var delButt = document.createElement("button"); 
    delButt.className = "Delbuttedit";
    delButt.innerHTML = "Delete";
    var body = document.getElementsByClassName("bodytext")[0];
    body.appendChild(p);
    p.appendChild(delButt);
    delButt.addEventListener ("click", function() { delImg()    }
        );
}




function delImg(){
    var pcont = document.getElementsByClassName("Delbuttedit");
    var container = document.getElementById("gallery");
    while ( container.firstChild){
        container.removeChild(container.firstChild);
    }
    pcont.removeChild(pcont.firstChild);
    return false;
}

// Memory game