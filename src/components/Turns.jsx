import Square from "./Square"

const Turns = ({turn}) => {

    return( 
        <section className='turn'> 
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
        </section>
    )
}

export default Turns