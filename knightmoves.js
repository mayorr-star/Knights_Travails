const buildBoard = () => {
  const board = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      board.push([row, col]);
    }
  }
  return board;
}

class graph {
  
  buildAdjacenyList = (board = buildBoard()) => {
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
  
  breadthfirstSearch = (source, destination, graph = this.breadthfirstSearch()) => {
    const bfsInfo = [];
    for (let i = 0; i < graph.length; i++) {
      bfsInfo.push({
        distance: null,
        predecessor: null
      })
    }
    bfsInfo[source].distance = 0;
    const queue = new Queue();
    queue.enqueue(source);
  
    while (!queue.isEmpty()){
      const vertex = queue.dequeue();
      if (vertex === destination) {
        console.log(`You made it in ${bfsInfo[vertex].distance} move(s)!  Here's your path:`);
        return;
      }
      for (let i = 0; i < graph[vertex].length; i++) {
        const neighbour = graph[vertex][i];
        if (!bfsInfo[neighbour].distance) {
          bfsInfo[neighbour].distance = bfsInfo[vertex].distance + 1;
          bfsInfo[neighbour].predecessor = vertex;
          queue.enqueue(neighbour);
        }
      }
    }
  }

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


class Knight {

  knightMoves(start, end) {
    const source = getIndex(start[0], start[1]);
    const destination = getIndex(end[0], end[1]);
    breadthfirstSearch(source, destination);
  }

}
const knight = new Knight();
knight.knightMoves([0, 0], [1, 2]);
knight.knightMoves([3, 3], [0, 0]);
knight.knightMoves([3, 3], [4, 3]);
knight.knightMoves([0, 0], [7, 7]);