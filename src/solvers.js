/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n) {
  //input: n, the size of the board and the number of pieces
  //output: matrix representing one solution
  var board = new Board({ n: n });
  var solution = [];

  //create a matrix of size n
  //iterate thru the rows
  //iterate through the columns
  //place the 1
  //test for conlicts , if true
  //remove the above 1
  //else counter ++

  //check to make sure n cases were placed, if true
  //return solution
  // var matrix = [];
  // for (i = 0; i < n; i++) {
  //   matrix.push(Array(n).fill(0));
  // }

  var counter = 0;

  for (i = 0; i < n; i++) { // for each row, y coordinates
    for (j = 0; j < n; j++) { // for each column, x coordinates
      board.togglePiece(i, j);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      } else {
        counter++;
      }
    }
  }

  for (i = 0; i < n; i++) {
    solution.push(board.get(i));
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  if (counter === n) {
    return solution;
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  //-----------------------------------------------------------------------

  //create solutionCounter, piece counter?? where this go, create empty matrix
  var solutionCount = 0;

  // create inner function
  var inner = function (matrix, rowIndex) {
    for (var col = 0; col < n; col++) {
      matrix.togglePiece(rowIndex, col);
      if (matrix.hasAnyRooksConflicts()) {
        matrix.togglePiece(rowIndex, col);
      } else {
        pieceCount++;
        if (pieceCount === n) {
          solutionCount++;
          matrix.togglePiece(rowIndex, col);
          pieceCount--;
        } else if (rowIndex + 1 < n) {
          inner(matrix, rowIndex + 1);
          matrix.togglePiece(rowIndex, col);
          pieceCount--;
        }
      }
    }
  };
  //Have an inner function (Current Matrix, Row Index)
  //for loop here to go through columns
  //create a clone
  //toggle the clones element using rowIndex and ColIndex
  //if conflcit
  //do nothing
  //if no conflict
  //counter ++
  //if counter === n
  //solncounter ++
  //else
  //call inner (ClonedMatrix, row+1)


  //start inner function, with intial inputs: iterate over rows and initialize pieceCount
  // for (var row = 0; row < n; row++) {
  var board = new Board({ n: n });
  // console.log('created new board');
  var pieceCount = 0;
  inner(board, 0);
  // }
  //return solCounter
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  // var board = new Board({ n: n });
  // var solution = [];

  // var counter = 0;

  // for (i = 0; i < n; i++) { // for each row, y coordinates
  //   debugger;
  //   for (j = 0; j < n; j++) { // for each column, x coordinates
  //     board.togglePiece(i, j);
  //     if (board.hasAnyQueensConflicts()) {
  //       board.togglePiece(i, j);
  //     } else {
  //       counter++;
  //     }
  //   }
  // }
  var solution = [];
  if (n === 2) {
    return [[0, 0], [0, 0]];
  } else if (n === 3) {
    return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  }

  var inner = function (matrix, rowIndex) {
    if (n === 0) {
      return [];
    }
    for (var col = 0; col < n; col++) {
      if (solution.length !== 0) {
        return;
      }
      matrix.togglePiece(rowIndex, col);
      if (matrix.hasAnyQueensConflicts()) {
        matrix.togglePiece(rowIndex, col);
      } else {
        pieceCount++;
        if (pieceCount === n) {
          for (i = 0; i < n; i++) {
            solution.push(board.get(i).slice());
          }
          return solution;
        } else if (rowIndex + 1 < n) {
          inner(matrix, rowIndex + 1);
          matrix.togglePiece(rowIndex, col);
          pieceCount--;
        }
      }
    }
  };

  var board = new Board({ n: n });
  var pieceCount = 0;
  inner(board, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  // original solution: 50ms
  // includes optimizations:
  //   To fit n pieces, each row needs a piece. So if a piece isn't added to a row, discontinue that branch of the tree.
  // adding optimizations:
  //   Once a piece is added to a column, no other pieces can be added to that column.
  //   ^ cuts time down to 47ms
  //   Once a piece is added, the next row cannot have a piece diagonal to it.
  //   ^ cuts time down to 42ms

  var solutionCount = 0;
  if (n === 0) { // edge case
    return 1;
  }
  // create inner function
  var inner = function (matrix, rowIndex, colObj, prevCol) {
    if (prevCol !== undefined) { // reassignation of objects in order to limit columns searched in the below for loop
      var tempCols = {};
      Object.assign(tempCols, colObj);
      delete tempCols[prevCol - 1];
      delete tempCols[prevCol + 1];
      var oldCol = colObj;
      colObj = tempCols;
    }

    for (var col in colObj) { // by now, colObj should be reduced by 1-3 items
      matrix.togglePiece(rowIndex, col);
      if (matrix.hasAnyQueensConflicts()) {
        matrix.togglePiece(rowIndex, col);
      } else { // if we keep the piece, do the following things
        pieceCount++;
        delete colObj[col]; // remove this column from the search space
        if (oldCol !== undefined) {
          delete oldCol[col];
        }
        if (pieceCount === n) { // if we found a solution, do some things
          solutionCount++;
          matrix.togglePiece(rowIndex, col);
          pieceCount--;
          if (oldCol !== undefined) {
            colObj = oldCol;
          }
          colObj[col] = col;
        } else if (rowIndex + 1 < n) { // if this board is incomplete
          if (oldCol !== undefined) {
            colObj = oldCol;
          }
          inner(matrix, rowIndex + 1, colObj, Number(col)); // call inner function on the next row of the board
          matrix.togglePiece(rowIndex, col); // going back up the stack/tree, we untoggle our piece, so we can use one board for all decision branches
          pieceCount--; // for the same reason, decrement the piece count
          colObj[col] = col; // for the same reason, add the deleted column back in
        }
      }
    }
  };



  var board = new Board({ n: n });
  var pieceCount = 0;
  var colArr = Array.from(Array(n).keys());
  var colObj = {};
  for (var ele of colArr) {
    colObj[ele] = ele;
  }
  inner(board, 0, colObj);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);

  return solutionCount;
};
