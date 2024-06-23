class Chessboard {

  constructor() {
    this.chessboard = this.buildBoard();
  }

  buildBoard = () => {
    const board = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        board.push([row, col]);
      }
    }
    return board;
  };

  confirmLegalCoordinates = (coord, boardSize = 8) => {
    return coord >= 0 && coord < boardSize;
  };

  getIndex = (x, y, board = this.chessboard) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === x && board[i][1] === y) {
        return i;
      }
    }
  };
}

class Graph {
  
  constructor() {
    this.graph = this.buildAdjacenyList();
  }

  buildAdjacenyList = (boardObj = new Chessboard()) => {
    const knight = new Knight();
    const chessboard = boardObj.chessboard;
    const adjacenyList = [];
    for (let i = 0; i < chessboard.length; i++) {
      const neighbours = [];
      const nextMoves = knight.getLegalMoves(chessboard[i][0], chessboard[i][1]);
      for (let i = 0; i < nextMoves.length; i++) {
        const x = nextMoves[i][0];
        const y = nextMoves[i][1];
        const index = boardObj.getIndex(x, y);
        neighbours.push(index);
      }
      adjacenyList[i] = neighbours;
    }
    return adjacenyList;
  };

  breadthfirstSearch = (
    source,
    destination,
    graph = this.graph
  ) => {
    const bfsInfo = [];
    for (let i = 0; i < graph.length; i++) {
      bfsInfo.push({
        distance: null,
        predecessor: null,
      });
    }
    bfsInfo[source].distance = 0;
    const queue = new Queue();
    queue.enqueue(source);

    while (!queue.isEmpty()) {
      const vertex = queue.dequeue();
      if (vertex === destination) {
        console.log(
          `You made it in ${bfsInfo[vertex].distance} move(s)!  Here's your path:`
        );
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
  };
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

  getLegalMoves = (x, y, boardSize = 8) => {
    const board = new Chessboard();
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
    for (const move of possibleMoves) {
      const dx = x + move[0];
      const dy = y + move[1];
      if (
        board.confirmLegalCoordinates(dx) &&
        board.confirmLegalCoordinates(dy)
      ) {
        nextMoves.push([dx, dy]);
      }
    }
    return nextMoves;
  };

  knightMoves(start, end) {
    const board = new Chessboard();
    const graph = new Graph();
    const source = board.getIndex(start[0], start[1]);
    const destination = board.getIndex(end[0], end[1]);
    graph.breadthfirstSearch(source, destination);
  };
}
const knight = new Knight();
knight.knightMoves([0, 0], [1, 2]);
knight.knightMoves([3, 3], [0, 0]);
knight.knightMoves([3, 3], [4, 3]);
knight.knightMoves([0, 0], [7, 7]);