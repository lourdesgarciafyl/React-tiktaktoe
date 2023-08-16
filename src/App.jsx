import "./App.css";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

import Square from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import WinnerModal from "./components/WinnerModal";
import Board from "./components/Board";
import { saveGameToStorage, resetGameStorage } from "./logic/storage";
import Turns from "./components/Turns";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem("board")
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) :  Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem("turn")
    return turnFromLocalStorage ? JSON.parse(turnFromLocalStorage) : TURNS.X
  });

  const [winner, setWinner] = useState(null); // null para no hay ganador, false si hay empate

  useEffect(()=> {
    saveGameToStorage({
      board: board,
      turn: turn
     })
  }, [turn, board])

  const updateBoard = (index) => {
    // no actualizar la posicicon si ya tiene algo
    if (board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board]; // todos los elementos van al nuevo array
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage()
  };

  return (
    <>
      <main className="board">
        <h1 className="mb-2">Tik Tak Toe</h1>
        <Board board={board} updateBoard={updateBoard}></Board>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
      </main>
    </>
  );
}

export default App;
