import { useState } from 'react'
import './App.css'

const TURNS = {
  X: "x",
  O: "o"
}

const Square = ({ children, updateBoard, index, isSelected}) => {
  const className = `square ${isSelected ? `is-selected` : ``}`

  const handleClick = () => {
    updateBoard(index);
  }

  return ( 
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)) 
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null para no hay ganador, false si hay empate

  const checkWinner = (boardToCheck) => {
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
      setWinner(newWinner)
    }
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
    </main>
    </>
  )
}

export default App
