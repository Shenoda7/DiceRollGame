'use strict';

//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
let scores, currentScore, activePlayer, playingState;

function init() {
  // Reset scores and game state
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingState = true;

  // Reset UI
  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';
  diceEl.classList.add('hidden');

  //reset active player
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  //Remove winner
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Reset button cursor styles
  btnHold.style.cursor = 'pointer';
  btnRoll.style.cursor = 'pointer';
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = `${0}`;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (!playingState) return;
  //1. Generating random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  //2. display the dice roll
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  //3. check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      `${currentScore}`;
  } else {
    //switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playingState) return;
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    `${scores[activePlayer]}`;

  if (scores[activePlayer] >= 100) {
    playingState = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    // btnHold.disabled = true;
    // btnRoll.disabled = true;
    btnHold.style.cursor = 'not-allowed';
    btnRoll.style.cursor = 'not-allowed';
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
