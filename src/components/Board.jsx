import Square from "./Square";

const Board = ({ board, updateBoard }) => {
  return (
    <>
      <h1 className="mb-2">Tik Tak Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
    </>
  );
};

export default Board;
