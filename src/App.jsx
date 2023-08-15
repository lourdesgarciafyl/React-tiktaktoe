import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import Square from './components/Square'
import { TURNS, WINNER_COMBOS } from './constants'
import { checkWinner } from './logic/board'
import WinnerModal from './components/WinnerModal'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)) 
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null para no hay ganador, false si hay empate

  const checkEndGame = (newBoard) => {
    // si todas las posiciones del array new board tienen square diferentes a null, termina el juego
    return newBoard.every((Square) => Square != null)
  }
  const updateBoard = (index) => {
    // no actualizar la posicicon si ya tiene algo
    if(board[index] || winner) return; 
    
    // actualizar el tablero
    const newBoard = [...board] // todos los elementos van al nuevo array
    newBoard[index] = turn
    setBoard(newBoard)

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <>
    <main className='board'>
      <h1 className='mb-2'>Tik Tak Toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'> 
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
      </section>
      <WinnerModal 
      winner={winner}
      resetGame={resetGame}></WinnerModal>
      
    </main>
    </>
  )
}

export default App
