/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer;

scores = [0, 0];
roundScores = 0;
activePlayer = 0;

// you can use querySelecto to select styles also
document.querySelector(".dice").style.display = "none";

document.getElementById("score-0").textContent = 0;
document.getElementById("current-0").textContent = 0;
document.getElementById("score-1").textContent = 0;
document.getElementById("current-1").textContent = 0;

document.querySelector(".btn-roll").addEventListener("click", () => {
  // 0. Local variables declarations
  var dice, currentPlayerDOM, diceDOM;
  diceDOM = document.querySelector(".dice");
  currentPlayerDOM = document.getElementById(`current-${activePlayer}`);

  // 1. Variables Assigments
  dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the results
  diceDOM.style.display = "block";
  diceDOM.src = `dice-${dice}.png`;

  // 3. Update the round score IF the rolled number was NOT a 1
  if (dice !== 1) {
    // Add score
    roundScores += dice;
    currentPlayerDOM.textContent = roundScores;
  } else {
    // Reset roundScore, reset currentPlayer roundScore, Next player
    roundScores = 0;
    currentPlayerDOM.textContent = roundScores;
    activePlayer = activePlayer === 0 ? 1 : 0;

    document.querySelector(`.player-0-panel`).classList.toggle("active");
    document.querySelector(`.player-1-panel`).classList.toggle("active");

    diceDOM = document.querySelector(".dice").style.display = "none";
  }
});
