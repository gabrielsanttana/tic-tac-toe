const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameStatus = document.querySelector('.gameStatus');

let hasGameStarted = true;

let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayerSymbol = 'X';

const countScore = (clickedCell, clickedCellIndex) => {
  gameState[clickedCellIndex] = currentPlayerSymbol;
  clickedCell.innerHTML = currentPlayerSymbol;
};

const printCurrentPlayerTurn = () => {
  currentPlayerSymbol = currentPlayerSymbol === 'X' ? 'O' : 'X';
  gameStatus.innerHTML = `É a vez do ${currentPlayerSymbol}`;
};

const validateGameResult = () => {
  let hasRoundFinished = false;

  for (let counter = 0; counter < winConditions.length; counter++) {
    const winCondition = winConditions[counter];

    let cell1 = gameState[winCondition[0]];
    let cell2 = gameState[winCondition[1]];
    let cell3 = gameState[winCondition[2]];

    if (cell1 === '' || cell2 === '' || cell3 === '') {
      continue;
    }

    if (cell1 === cell2 && cell2 === cell3) {
      hasRoundFinished = true;
      break;
    }
  }

  if (hasRoundFinished) {
    gameStatus.innerHTML = `${currentPlayerSymbol} ganhou!`;
    hasGameStarted = false;

    return;
  }

  drawGame();
};

const handleCellClick = (event) => {
  const clickedCell = event.target;

  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index'),
  );

  if (gameState[clickedCellIndex] !== '' || !hasGameStarted) {
    return;
  }

  countScore(clickedCell, clickedCellIndex);
  validateGameResult();
};

const drawGame = () => {
  let isDrawGame = !gameState.includes('');

  if (isDrawGame) {
    gameStatus.innerHTML = 'O jogo empatou!';
    hasGameStarted = false;

    return;
  }

  printCurrentPlayerTurn();
};

const restartGame = () => {
  hasGameStarted = true;
  currentPlayerSymbol = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];

  document.querySelectorAll('.cell').forEach((cell) => (cell.innerHTML = ''));
  gameStatus.innerHTML = `É a vez do ${currentPlayerSymbol}`;
};

gameStatus.innerHTML = `É a vez do ${currentPlayerSymbol}`;

document
  .querySelectorAll('.cell')
  .forEach((cell) => cell.addEventListener('click', handleCellClick));
document.querySelector('button').addEventListener('click', restartGame);
