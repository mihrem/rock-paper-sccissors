let score = {
  wins: 0,
  losses: 0,
  ties: 0
};

let currentRound = 0;
let maxRounds = 0;

// start game
function startGame(rounds) {
  maxRounds = rounds;
  currentRound = 0;

  score = { wins: 0, losses: 0, ties: 0 };

  document.querySelector('.round-select').classList.add('hidden');
  document.querySelector('.game-area').classList.remove('hidden');

  updateScore();
  updateRound();
}

// play round
function playGame(playerMove) {
  if (currentRound >= maxRounds) return;

  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock') {
    result = computerMove === 'rock' ? 'Tie.' :
             computerMove === 'paper' ? 'You lose.' : 'You win.';
  }

  if (playerMove === 'paper') {
    result = computerMove === 'paper' ? 'Tie.' :
             computerMove === 'scissors' ? 'You lose.' : 'You win.';
  }

  if (playerMove === 'scissors') {
    result = computerMove === 'scissors' ? 'Tie.' :
             computerMove === 'rock' ? 'You lose.' : 'You win.';
  }

  if (result === 'You win.') score.wins++;
  if (result === 'You lose.') score.losses++;
  if (result === 'Tie.') score.ties++;

  currentRound++;

  updateScore();
  updateRound();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `
    You <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer
  `;

  addAnimation(result);

  if (currentRound === maxRounds) {
    endGame();
  }
}

// animation trigger
function addAnimation(result) {
  const resultEl = document.querySelector('.js-result');

  resultEl.classList.remove('win', 'lose', 'draw');

  if (result === 'You win.') resultEl.classList.add('win');
  if (result === 'You lose.') resultEl.classList.add('lose');
  if (result === 'Tie.') resultEl.classList.add('draw');
}

// update score
function updateScore() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}

// update round
function updateRound() {
  document.querySelector('.js-round').innerHTML =
    `Round ${currentRound} / ${maxRounds}`;
}

// computer move
function pickComputerMove() {
  const random = Math.random();

  if (random < 1/3) return 'rock';
  if (random < 2/3) return 'paper';
  return 'scissors';
}

// end game
function endGame() {
  document.querySelector('.game-area').classList.add('hidden');
  document.querySelector('.end-screen').classList.remove('hidden');
  document.getElementById('main-title').classList.add('hidden');

  const trophy = document.querySelector('.trophy');

  if (score.wins > score.losses) {
    trophy.classList.remove('hidden');

    document.querySelector('.js-final-result').innerHTML =
      `<span class="emoji">🎉</span> You Won!`;

  } else if (score.losses > score.wins) {
    trophy.classList.add('hidden');

    document.querySelector('.js-final-result').innerHTML =
      `<span class="emoji">😢</span> You Lost!`;

  } else {
    trophy.classList.add('hidden');

    document.querySelector('.js-final-result').innerHTML =
      `<span class="emoji">🤝</span> Draw!`;
  }
}

// restart
function restartGame() {
  document.querySelector('.end-screen').classList.add('hidden');
  document.querySelector('.round-select').classList.remove('hidden');
}