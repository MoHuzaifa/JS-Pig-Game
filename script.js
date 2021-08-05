"use strict";

//SELECTING ELEMENTS//
const player0EL = document.querySelector(`.player--0`);
const player1EL = document.querySelector(`.player--1`);
const score0EL = document.querySelector(`#score--0`);
const score1EL = document.getElementById(`score--1`);
const current0EL = document.getElementById(`current--0`);
const current1EL = document.getElementById(`current--1`);
const diceEL = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

const changePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle(`player--active`);
  player1EL.classList.toggle(`player--active`);
};

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

//STARTING CONDITIONS//
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add(`hidden`);

//ROLLING DICE FUNCTIONALITY//
btnRoll.addEventListener(`click`, function () {
  if (isPlaying) {
    //1) GENERATE NUMBER//
    let diceNumber = Math.trunc(Math.random() * 6) + 1;

    //2) DISPLAY DICE//
    diceEL.classList.remove(`hidden`);
    diceEL.src = `dice-${diceNumber}.png`;

    //3) CHECK IF 1 IS ROLLED//
    if (diceNumber !== 1) {
      //ADD DICE TO CURRENT SCORE//
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //SWITCH TO NEXT PLAYER//
      changePlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (isPlaying) {
    //1) ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE//
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2) CHECK IF SCORE IS 100 OR GREATER//
    if (scores[activePlayer] >= 100) {
      // FINISH THE GAME//
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle(`player--active`);

      diceEL.classList.add(`hidden`);
      isPlaying = false;
    } else {
      //3) SWITCH TO NEXT PLAYER
      changePlayer();
    }
  }
});

btnNew.addEventListener(`click`, function () {
  //RESET VARIABLES//
  isPlaying = true;
  currentScore = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;

  //RESET WINNER CLASS//
  if (player0EL.classList.contains(`player--winner`)) {
    player0EL.classList.remove(`player--winner`);
  } else if (player1EL.classList.contains(`player--winner`)) {
    player1EL.classList.remove(`player--winner`);
  }

  //RESET ACTIVE PLAYER BACKGROUND COLOR//
  if (activePlayer) {
    player1EL.classList.remove(`player--active`);
    player0EL.classList.add(`player--active`);
  } else {
    player0EL.classList.add(`player--active`);
  }

  //RESET ACTIVE PLAYER VARIABLE AND DICE//
  activePlayer = 0;
  diceEL.classList.add(`hidden`);
});
