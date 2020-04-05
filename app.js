/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, row6twice, goalScore;

lockButtons();
document.getElementById("score-goal").disabled = "disabled";

///////////////////////////////////////////////////////////////////////////
document.querySelector(`.btn-new`).addEventListener("click", function () {
  scores = [0, 0];
  roundScores = 0;
  activePlayer = 0;
  row6twice = 0;
  document.getElementById("score-goal").disabled = "";
  document.getElementById("score-goal").value = null;
  document.getElementById("score-goal").focus();
  currentToZero();
  scoreToZero();
  unlockButtons();
  initStyleState();
});

// ////////////////////////////////////////////////////////////////////////
document.querySelector(".btn-roll").addEventListener("click", () => {
  // 0. Local variables declarations
  var dice, currentPlayerDOM, diceDOM;
  diceDOM = document.querySelector(".dice");
  goalScore = document.getElementById("score-goal").value;
  document.getElementById("score-goal").disabled = "disabled";

  // 1. Variables Assigments
  dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the results
  diceDOM.style.display = "block";
  diceDOM.src = `dice-${dice}.png`;

  row6twice = dice === 6 ? row6twice + 1 : 0;

  // 3. If dice is equal to 6 twice, reset actualPlayer score
  if (row6twice === 2) {
    document.getElementById(`score-${activePlayer}`).textContent = 0;
    // Reset roundScore, reset currentPlayer roundScore, Next player
    nextPlayer();
  }

  // 4. Update the round score IF the rolled number was NOT a 1
  else if (dice === 1) {
    // Reset roundScore, reset currentPlayer roundScore, Next player
    nextPlayer();
  } else {
    // Add score
    roundScores += dice;
    document.getElementById(
      `current-${activePlayer}`
    ).textContent = roundScores;
  }
});

// //////////////////////////////////////////////////////////////////////////
document.querySelector(".btn-hold").addEventListener("click", function () {
  // add roundScore to currentPlayer
  scores[activePlayer] += roundScores;
  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer];

  // reset roundScore data, define winner, invoke nextPlayer,
  console.log("goalscore--", goalScore);
  if (scores[activePlayer] >= goalScore) {
    // deploy winner player
    document.getElementById(`name-${activePlayer}`).textContent = "Winner";
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");

    lockButtons();
  } else {
    nextPlayer();
  }
});

// //////////////////////// HELPERS FUNCTIONS ////////////////////////////////
function nextPlayer() {
  roundScores = 0;
  row6twice = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.querySelector(`.player-0-panel`).classList.toggle("active");
  document.querySelector(`.player-1-panel`).classList.toggle("active");

  diceDOM = document.querySelector(".dice").style.display = "none";
  currentToZero();
}

function currentToZero() {
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
}

function scoreToZero() {
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
}

function lockButtons() {
  document.querySelector(`.btn-hold`).disabled = "disabled";
  document.querySelector(`.btn-roll`).disabled = "disabled";
}

function unlockButtons() {
  document.querySelector(`.btn-hold`).disabled = "";
  document.querySelector(`.btn-roll`).disabled = "";
}

function initStyleState() {
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("active");

  document.querySelector(`.player-0-panel`).classList.add("active");

  document.getElementById(`name-0`).textContent = "Player 1";
  document.getElementById(`name-1`).textContent = "Player 2";

  // you can use querySelecto to select styles also
  document.querySelector(".dice").style.display = "none";
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. 
   After that, it's the next player's turn. 
   (Hint: Always save the previous dice roll in a separate variable) xxxxxxxxx

2. Add an input field to the HTML where players can set the winning score, 
  so that they can change the predefined score of 100. (Hint: you can read 
  that value with the .value property in JavaScript. This is a good oportunity 
  to use google to figure this out :) xxxxxxxxxxx

3. Add another dice to the game, so that there are two dices now. 
  The player looses his current score when one of them is a 1. 
  (Hint: you will need CSS to position the second dice, so take a look at the CSS 
  code for the first one.)
*/
