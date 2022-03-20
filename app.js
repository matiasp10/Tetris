document.addEventListener('DOMContentLoaded', () => {
  const width = 10;
  const height = 20;

  const grid = document.querySelector('.container');
  let squares = document.querySelectorAll('.container div');
  const scoreDisplay = document.querySelector('.score');
  const StartBtn = document.querySelector('#start-button');

  // Tetrominoes

  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  // Elegir un numero al azar para elegir un tetrimonio

  let random = Math.floor(Math.random() * theTetrominoes.length);
  console.log(random);
  let currentPosition = 4;
  let currentRotation = 0;
  let current = theTetrominoes[random][currentRotation];

  //   Dibujar el tetrimonio
  function draw() {
    current.forEach((i) => {
      squares[currentPosition + i].classList.add('tetromino');
    });
  }

  //Desdibujar el tetrimonio

  function undraw() {
    current.forEach((i) => {
      squares[currentPosition + i].classList.remove('tetromino');
    });
  }

  //   Mover el tetromino cada segundo
  timerID = setInterval(moveDown, 1000);

  //   Funcion mover abajo
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //   Freeze function

  function freeze() {
    if (
      current.some((i) =>
        squares[currentPosition + i + width].classList.contains('taken')
      )
    ) {
      current.forEach((i) =>
        squares[currentPosition + i].classList.add('taken')
      );
      //   Comienza otro tetromino
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  // Mover el tetromino a la izquierda o derecha a menos que haya un bloqueo o este al final

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((i) => {
      (currentPosition + i) % width === 0;
    });
    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }

    if (
      current.some((i) => {
        squares[currentPosition + i].classList.contains('taken');
      })
    ) {
      currentPosition += 1;
    }
    draw();
  }
});
