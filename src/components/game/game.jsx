import React, { useState } from "react";
import Board from "../board/borad";
import "./game.css";

const Game = (props) => {
    const [board, setBoard] = useState(Array.from({ length: 3 }, v => Array.from({ length: 3 }, v => ' ')));
    const [gameStarted, setGameStarted] = useState(false);
    const [playerWon, setPlayerWon] = useState(false);
    const [computerWon, setComputerWon] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const isValidMove = (i, j) => {
        if (board[i][j] === ' ') {
            return true;
        }
        return false;
    }
    const isGameFinished = () => {
        if (hasContestantWon('X')) {
            setPlayerWon(true);
            setGameStarted(false);
            return true;
        }
        if (hasContestantWon('O')) {
            setComputerWon(true);
            setGameStarted(false);
            return true;
        }
        // Check is the board is full
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (board[i][j] === ' ') {
                    return false;
                }
            }
        }
        setGameOver(true);
        setGameStarted(false);
        return true;
    }

    const hasContestantWon = (symbol) => {
        if ((board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol) ||
            (board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol) ||
            (board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol)
            ||
            (board[0][0] === symbol && board[1][0] === symbol && board[2][0] === symbol) ||
            (board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol) ||
            (board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol)
            ||
            (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) ||
            (board[2][0] === symbol && board[1][1] === symbol && board[0][2] === symbol)) {
            return true;
        }
        return false;
    }

    const computerTurn = () => {
        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        }).then(() => {
            while (true) {
                const i = Math.floor(Math.random() * 3);
                const j = Math.floor(Math.random() * 3);
                if (isValidMove(i, j)) {
                    let copy = [...board];
                    copy[i][j] = 'O';
                    setBoard(copy);
                    if (isGameFinished()) {
                        return;
                    }
                    break;
                }
            }
        });
    }

    const playerTurn = (rowIndex, colIndex) => {
        if (isValidMove(rowIndex, colIndex)) {
            let copy = [...board];
            copy[rowIndex][colIndex] = 'X';
            setBoard(copy);
            if (isGameFinished()) {
                return;
            }
            computerTurn();
            if (isGameFinished()) {
                return;
            }
        }
    }
    
    const startGame = () =>{
        setBoard(Array.from({ length: 3 }, v => Array.from({ length: 3 }, v => ' ')));
        setGameStarted(true);
        setPlayerWon(false);
        setComputerWon(false);
        setGameOver(false);
    }

    return (
        <div>
            <Board squares={board} onClick={playerTurn} isGameStarted={gameStarted}/>
            {<button onClick={startGame} disabled={gameStarted} style={{cursor: gameStarted ? 'unset': 'pointer'}} className="playButton">Play</button>}
            {playerWon && <div className="successMessage">Player won!</div>}
            {computerWon && <div className="successMessage">Computer won!</div>}
            {gameOver && <div className="errorMessage">Game ended ina tie!</div>}
        </div>
    );
}
export default Game;