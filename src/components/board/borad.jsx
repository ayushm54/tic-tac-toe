import React from "react";
import Square from "../square/square.jsx";
import "./board.css";
const Board = ({ squares, onClick, isGameStarted }) => {
    const handle = (i,j) => () =>{
        onClick(i, j);
    }
    return (
        <div className="board">
            {squares.map((row, i) => {
                return (
                    row.map((col, j) => <Square key={i+"_"+j} value={squares[i][j]} onClick={handle(i,j)} isGameStarted ={isGameStarted}/>)
                )
            })}
        </div>
    );
}

export default Board;