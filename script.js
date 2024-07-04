'use strict';

//player--active to switch player to change background color

//score--0 -> total score of player 1
//current--1  -> current score of player 1

//score--1 -> total score of player 2
//current--0  ->current score of player 2

//set the initial scores to all 0 
const player1Class = document.querySelector(".player--0");
const player2Class = document.querySelector(".player--1");
let player1TotalScore = document.querySelector("#score--0");
let player2TotalScore = document.querySelector("#score--1");

let player1CurrentScore = document.querySelector("#current--0");
let player2CurrentScore = document.querySelector("#current--1");


const setScorestoInitial = function(){
    player1CurrentScore.textContent = 0 ;
    player2CurrentScore.textContent= 0 ; 
    player1TotalScore.textContent= 0 ;
    player2TotalScore.textContent = 0 ; 
    
}

setScorestoInitial();

let scores , currentScore , playerActive , playing ; 
const init = function(){
    currentScore = 0 ; 
    scores = [0,0];
    playerActive = 0 ; //0 is player 1 is playing , 1 if player 2 is playing
    playing = true ; //if true continue playing , if false stop playing
}
init();

const diceImage = document.querySelector(".dice");
diceImage.classList.add("hidden");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const switchPlayer = function()
{
    document.getElementById(`current--${playerActive}`).textContent = 0 ;
    playerActive = playerActive === 0 ? 1 : 0 ; 
    currentScore = 0 ; 
    player1Class.classList.toggle("player--active");
    player2Class.classList.toggle("player--active");
}

btnRoll.addEventListener("click" , function(){
    if(playing){
    //1.generate random number
    const randomNumber = Math.floor(Math.random()*6) + 1 ; 

    //2.display image according to random number
    diceImage.classList.remove("hidden");
    // diceImage.src = `dice-${randomNumber}.png`;
    diceImage.setAttribute("src",`dice-${randomNumber}.png`);
    

    //3.check if rolled dice is 1 
    if(randomNumber !== 1)
    {
        currentScore += randomNumber ; 
        document.getElementById(`current--${playerActive}`).textContent = currentScore ; 
    }
    else
    {
        //switch to next player
        // document.getElementById(`current--${playerActive}`).textContent = 0 ;
        // playerActive = playerActive === 0 ? 1 : 0 ; 
        // currentScore = 0 ; 
        // player1Class.classList.toggle("player--active");
        // player2Class.classList.toggle("player--active");

        switchPlayer();
        
    }
}
});


//holding the values
btnHold.addEventListener("click" , function(){
    if(playing){
    //add current score of active player to the total score
    scores[playerActive] += currentScore ; 
    document.getElementById(`score--${playerActive}`).textContent = scores[playerActive] ; 
    //if total score >= 100
    //finish the game
    if(scores[playerActive] >= 100)
    {
        playing = false;
        diceImage.classList.add("hidden");
        document.querySelector(`.player--${playerActive}`).classList.add("player--winner");
        document.querySelector(`.player--${playerActive}`).classList.remove("player--active");
        
        
    }
    else
    //switch player
    switchPlayer();

    }
    
});

btnNew.addEventListener("click",function(){
   
    setScorestoInitial();
    document.querySelector(`.player--${playerActive}`).classList.remove("player--active");
    document.querySelector(`.player--${playerActive}`).classList.remove("player--winner");
    document.querySelector(".player--0").classList.add("player--active");
    init();
    
})

