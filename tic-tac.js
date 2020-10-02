function Square(props) {
  //mostrar el valor del estado actual cuando es clickeado
    return (
      <button className="square" 
        //this.setState desde onClick le dice a React que re-renderice el cuadrado siempre que su button es clickeado
        //despues de la actualizacion this.state.value sera x.
        onClick={props.onClick}>
        {props.value}
      </button>
      //cuando se llama setState en un componente, React actualiza automaticamente los componentes hijos dentro del mismo tambien
    );
  }


class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      //establecer el valor por defecto
      xIsNext: true,
    };
  }
  
  //1. .slice() crear una copia del array de squares para modificarlo en vez de modificar el array existente (inmutabilidad)
  //2. retornar rapidamente ignorando un click si alguien a ganado el juego o si un cuadro ya esta rellenado
   //3. invertir el valor de xIsNext
  handleClick(i){ 
    const squares = this.state.squares.slice();    
    if(calculateWinner(squares) || squares[i]){
      return;
    }  
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  
  renderSquare(i) {
    //pasar una funcion como prop desde Board a Square y Square llamara a esta funcion cuando un cuadrado sea clickeado.
    return (
      <Square 
        //props
             value={this.state.squares[i]} 
             onClick={() => this.handleClick(i)}
      />
      );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner ' + winner;
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

//MOSTRAR CUANDO ALGUIEN GANO Y SI NO HAY MAS MOVIMIENTOS QUE HACER
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}