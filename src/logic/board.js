import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras para ver si x u o gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[b] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null;
  }

  export  const checkEndGame = (newBoard) => {
    // si todas las posiciones del array new board tienen square diferentes a null, termina el juego
    return newBoard.every((Square) => Square != null)
  }