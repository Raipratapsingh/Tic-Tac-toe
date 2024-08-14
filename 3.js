document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const gameStatus = document.getElementById("game-status");
    const resetButton = document.getElementById("reset-button");
    const twoPlayerButton = document.getElementById("two-player");
    const computerButton = document.getElementById("computer");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let isGameActive = true;
    let isTwoPlayer = true;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function handleCellClick(e) {
      const index = e.target.getAttribute("data-index");
  
      if (board[index] !== "" || !isGameActive) {
        return;
      }
  
      updateCell(e.target, index);
      checkResult();
      if (!isTwoPlayer && isGameActive) {
        computerMove();
        checkResult();
      }
    }
  
    function updateCell(cell, index) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  
    function checkResult() {
      let roundWon = false;
  
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        gameStatus.textContent = `${currentPlayer === "X" ? "O" : "X"} Wins!`;
        isGameActive = false;
        return;
      }
  
      if (!board.includes("")) {
        gameStatus.textContent = "Draw!";
        isGameActive = false;
      }
    }
  
    function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X");
        cell.classList.remove("O");
      });
      currentPlayer = "X";
      isGameActive = true;
      gameStatus.textContent = "";
    }
  
    function computerMove() {
      let emptyCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
      let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomIndex] = currentPlayer;
      let cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  
    function startTwoPlayerGame() {
      isTwoPlayer = true;
      resetGame();
    }
  
    function startComputerGame() {
      isTwoPlayer = false;
      resetGame();
    }
  
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
    twoPlayerButton.addEventListener("click", startTwoPlayerGame);
    computerButton.addEventListener("click", startComputerGame);
  });
  
