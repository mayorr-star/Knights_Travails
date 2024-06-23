const buildBoard = () => {
  const board = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      board.push([row, col]);
    }
  }
  return board;
}

const buildAdjacenyList = (board = buildBoard()) => {
  const adjacenyList = [];
  for (let i = 0; i < board.length; i++) {
    const neighbours = [];
    const nextMoves = getLegalMoves(board[i][0], board[i][1]);
    for (let i = 0; i < nextMoves.length; i++) {
      const x = nextMoves[i][0];
      const y = nextMoves[i][1];
      const index = getIndex(x, y)
      neighbours.push(index);
    }
    adjacenyList[i] = neighbours;
  }
  return adjacenyList;
}

const getLegalMoves = (x, y, boardSize = 8) => {
  const possibleMoves = [
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
  ];
  const nextMoves = [];
  for (move of possibleMoves) {
    const dx = x + move[0];
    const dy = y + move[1];
    if (confirmLegalCoordinates(dx) && confirmLegalCoordinates(dy)) {
      nextMoves.push([dx, dy]);
    }
  }
  return nextMoves;
}

const confirmLegalCoordinates = (coord, boardSize = 8) => {
  return coord >= 0 && coord < boardSize;
}

const getIndex = (x, y, board = buildBoard()) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === x && board[i][1] === y) {
      return i;
    }
  }
}

class Queue {
  constructor() {
    this.storage = [];
  }

  dequeue() {
    return this.storage.shift();
  }

  enqueue(item) {
    this.storage.push(item);
  }

  isEmpty() {
    return this.storage.length === 0;
  }
}