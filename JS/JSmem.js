//variables
var flippedCard = false;
var firstCard, secondCard;
var freezeBlock = false;
var default_score = 150;
var storAge = localStorage.getItem('mem_HS');
var tally = 0;
var second = 0, minute = 0;
var timerSet = false;
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
};




function delImg(){ //delete images in meme generator
    var pcont = document.getElementsByClassName("Delbuttedit");
    var container = document.getElementById("gallery");
    while ( container.firstChild){
        container.removeChild(container.firstChild);
    }
    pcont.removeChild(pcont.firstChild);
    return false;
};

// Memory game
window.onload = function highscore_tester(){
    storAge = localStorage.getItem('mem_HS');
    if(storAge === null){
        localStorage.setItem('mem_HS',default_score);
        document.getElementById('hsShowcase').innerHTML = default_score;
    } else {
        document.getElementById('hsShowcase').innerHTML = storAge;
    }
    
}

function startdegamep() {
    var elemental = document.getElementById("header");
    document.getElementById('startbutton').innerHTML = "Restart"; //fun text things
    document.getElementById('restart_startext').innerHTML = "click button to restart game" //fun text stuff
    elemental.scrollIntoView(); //places the screen at the memory card game board
    const cards = document.querySelectorAll('.card');
    var i = 0;
    for (let i = 0; i < cards.length; i++) { //adds the click feature
        cards[i].addEventListener('click', cardFlip) //adds all the card flips
        cards[i].children[1].classList.remove('hidden');// cover the cards again if it has been restarted
        let randomNum = Math.floor(Math.random() * 20); //shuffling cards
        cards[i].style.order = randomNum; //placing the random order in here
    }
    tally = 0; //reseting values
    document.getElementById("counter").innerHTML = 00;
    timer(); //starts timer
};
function timer() { //start the timer
    second = 0;
    minute = 0;
    var timerVar = document.getElementById("timer");
    if(!timerSet){
        var intervaltime = setInterval(function() {
        second++;
        if (second == 60) {
            minute ++;
            second = 0
        } if (minute == 60) {
            hour++;
            minute = 0;
        }
        minute = leadingZeroTime(minute);  //removes extra leading 0s
        second = leadingZeroTimeSec(second);//adds 0 if there is no 0 before the number 1-9
        timerVar.innerHTML = minute + ":" +second;
    }, 1000);
        timerSet = true;
    };
};
function leadingZeroTimeSec(num){ //second adjustments
    if(num < 10) { 
        num = "0"+ num;
    }
     return num;
}
function leadingZeroTime(minNum){ //minute adjustments
    if(minNum.length < 2) {
        minNum = "0" + minNum;
    } else if(minNum.length > 2 && minNum[0] === "0" ) {
        minNum = slice[1];
    }
    return minNum;
}
function cardFlip() {
    if(freezeBlock){ //stops the game from continueing untill cards are flipped back
        return;
    }
    if(firstCard === this){ //makes sure there isn't the same card
        return;
    }
    let backFace = this.getElementsByClassName("back");
    var counterClick = document.getElementById("counter").innerHTML;
    counterClick = parseInt(counterClick);

    this.classList.toggle('flip');
    backFace[0].classList.toggle('hidden');
    document.getElementById("counter").innerHTML = counterClick +1;
    flipCard(this);
}

function flipCard(card){
    if(freezeBlock){
        return;
    }
    card.classList.add("flip");

    if(!flippedCard){ //first card flip
        flippedCard = true;
        firstCard = card;
    } else { //second card flip
        secondCard = card;
        freezeBlock = true;
        setTimeout(check, 1000); //pauses for a second before checking
    }


}

function check(){
    if(firstCard.dataset.cardtype === secondCard.dataset.cardtype){
        firstCard.removeEventListener('click', cardFlip);
        secondCard.removeEventListener('click', cardFlip);
        tally = tally + 2;
        if(tally === 20){ 
            winStatus();
        }
    } else {
        firstCard.children[1].classList.remove('hidden');
        firstCard.classList.remove('flip');
        secondCard.children[1].classList.remove('hidden');
        secondCard.classList.remove('flip');
    }
freezeBlock = false;
flippedCard = false;
firstCard = null;
}

function winStatus() {
    var testscore = localStorage.getItem('mem_HS');
    var finalClick = parseInt(document.getElementById('counter').innerHTML);
    if(finalClick < parseInt(testscore)){
        localStorage.setItem('mem_HS', finalClick);
        alert('You have the highest score !');
        document.getElementById('hsShowcase').innerHTML = finalClick;
    } else {
        alert('Congrats you have completed the game!');
    }
    timerSet = false; //makes it so we can intialize timer again
}

