const boardSize = 15;
let currentPlayer = 'Black';
const board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));


const boardElement = document.getElementById('board');
initializeBoard();

function initializeBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleCellClick);
      boardElement.appendChild(cell);
      const overlayText = document.getElementById('overlay-text');
      overlayText.addEventListener('click', () => {
      hideOverlay();
      resetBoard();
});
    }
  }
}

function handleCellClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (board[row][col] === null) {
    board[row][col] = currentPlayer;
    event.target.innerText = currentPlayer;

    event.target.classList.add(currentPlayer === 'Black' ? 'Black' : 'White');

    if (checkWin(row, col)) {
      showOverlay(`${currentPlayer} wins!`);
      resetBoard();
    } else {
      currentPlayer = currentPlayer === 'Black' ? 'White' : 'Black';
    }
  } else {
    alert('Cell already occupied. Choose another one.');
  }
}

function checkWin(row, col) {
  return (
    checkDirection(row, col, 1, 0) || // Horizontal
    checkDirection(row, col, 0, 1) || // Vertical
    checkDirection(row, col, 1, 1) || // Diagonal \
    checkDirection(row, col, 1, -1)   // Diagonal /
  );
}

function checkDirection(row, col, rowDir, colDir) {
  const symbol = board[row][col];
  let count = 1;

  // Check in one direction
  for (let i = 1; i < 5; i++) {
    const newRow = row + i * rowDir;
    const newCol = col + i * colDir;

    if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol] === symbol) {
      count++;
    } else {
      break;
    }
  }

  // Check in the opposite direction
  for (let i = 1; i < 5; i++) {
    const newRow = row - i * rowDir;
    const newCol = col - i * colDir;

    if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol] === symbol) {
      count++;
    } else {
      break;
    }
  }

  return count >= 5;
}

function resetBoard() {
  board.forEach(row => row.fill(null));
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('Black', 'White');
  });
  currentPlayer = 'Black';
}


function showOverlay(message){
  const overlay = document.getElementById('overlay');
  const overlayText = document.getElementById('overlay-text');
  overlayText.innerText = message;
  overlay.style.display = 'flex';
}

function hideOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
}