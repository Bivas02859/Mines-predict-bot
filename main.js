
const gridElement = document.getElementById('grid');
const statusElement = document.getElementById('status');
const suggestionElement = document.getElementById('suggestion');

const GRID_SIZE = 5;
const NUM_MINES = 3;
const totalTiles = GRID_SIZE * GRID_SIZE;

let mines = new Set();
let clicked = new Set();

function generateMines() {
  mines.clear();
  while (mines.size < NUM_MINES) {
    const pos = Math.floor(Math.random() * totalTiles);
    mines.add(pos);
  }
}

function drawGrid() {
  gridElement.innerHTML = '';
  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = clicked.has(i) ? (mines.has(i) ? 'X' : '✓') : i + 1;
    if (clicked.has(i)) {
      tile.classList.add(mines.has(i) ? 'mine' : 'safe', 'clicked');
    }
    tile.onclick = () => handleClick(i);
    gridElement.appendChild(tile);
  }
  suggestTiles();
}

function handleClick(index) {
  if (clicked.has(index)) return;
  clicked.add(index);
  if (mines.has(index)) {
    statusElement.textContent = 'Boom! You hit a mine.';
  } else {
    statusElement.textContent = 'Safe! Keep going.';
  }
  drawGrid();
}

function suggestTiles() {
  const suggestions = [];
  for (let i = 0; i < totalTiles; i++) {
    if (!clicked.has(i) && !mines.has(i)) {
      suggestions.push(i + 1);
    }
  }
  suggestionElement.textContent = 'Suggested Safe Tiles: ' + suggestions.slice(0, 5).join(', ');
}

generateMines();
drawGrid();
