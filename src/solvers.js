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
  var solutionCount = undefined;
  // var board = new Board({ n: n });
  // var pieceCount = 0;

  // // reusing code from previous function
  // for (i = 0; i < n; i++) { // for each row, y coordinates
  //   for (j = 0; j < n; j++) { // for each column, x coordinates
  //     board.togglePiece(i, j);
  //     if (board.hasAnyRooksConflicts()) {
  //       board.togglePiece(i, j);
  //     } else {
  //       counter++;
  //     }
  //   }
  // }

  // if (counter === n) {
  //   // return solution;
  // }

  //-----------------------------------------------------------------------

  //Have an inner function (Current Matrix, Row Index/Coordintes to start from)
    //creates n children/clones
      //fills in one row of the matrix, for this child and tests it
        //if fails stop and go back to next child
      //else dig deeper, increase the pieceCount
      // .
      // .
      // .
    //if solution is found, increase the Solutioncount

  // recursive inner function is passed a current matrix and a row index
    // for i < n (iterate through the columns)
      // toggle i-th element
      // if no conflicts
        // create clone
        // increase piece count
        // call self recursively with new row index
      // if conflicts, do nothing--the branch will fall off
    // once i = n, if piece count = n, increase solutionCount




  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
