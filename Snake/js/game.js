(function () {
  let FPS = 10
  const SIZE = 40

  let board;
  let snake;
  let points;
  let fruits;
  let pontuacao = '00000';

  function init() {
    points = new Points(pontuacao)
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]])
    fruits = new Fruits();
    isPaused = false;
    setInterval(run, 1000 / FPS);
  }

  // botão start e pause
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "s":
        init()
        break;
      case "p":
        if (isPaused == false) {
          isPaused = true;
          break;
        }
        else {
          isPaused = false;
          break;
        }
      default:
        break;
    }
  })

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snake.changeDirection(0)
        break;
      case "ArrowRight":
        snake.changeDirection(1)
        break;
      case "ArrowDown":
        snake.changeDirection(2)
        break;
      case "ArrowLeft":
        snake.changeDirection(3)
        break;
      default:
        break;
    }
  })

  class Points {
    constructor(pontuacao) {
      this.element = document.createElement("h1")
      this.element.setAttribute("id", "pontos")
      this.element.innerHTML = `${pontuacao}`
      document.body.appendChild(this.element)
    }
    addPoint() {
      const soma = parseInt(pontuacao) + 300;
      const somaFormatada = soma.toString().padStart(5, '0');
      document.getElementById("pontos").innerHTML = `${somaFormatada}`;
    }
  }

  class Fruits {
    constructor() {
      this.position = [[parseInt(Math.random() * 20), parseInt(Math.random() * 20)]];
      this.color = "#222";
      this.position.forEach(field => document
        .querySelector(`#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`).style.backgroundColor = this.color)
    }
    showPosition() {
      return this.position[0];
    }
  }

  class Board {
    constructor(size) {
      this.element = document.createElement("table")
      this.element.setAttribute("id", "board")
      this.color = "#ccc";
      document.body.appendChild(this.element)
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr")
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field)
        }
      }
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
      this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`).style.backgroundColor = this.color)
    }
    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]]
          break;
        case 1:
          newHead = [head[0], head[1] + 1]
          break;
        case 2:
          newHead = [head[0] + 1, head[1]]
          break;
        case 3:
          newHead = [head[0], head[1] - 1]
          break;
        default:
          break;
      }
      this.body.push(newHead)
      console.log(JSON.stringify(fruits.showPosition()))
      const oldTail = this.body.shift()
      document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color
      document.querySelector(`#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`).style.backgroundColor = board.color

      // caso passou na pontuação
      if (JSON.stringify(newHead) == JSON.stringify(fruits.showPosition())) {
        points.addPoint();
      }
    }
    changeDirection(direction) {
      this.direction = direction
    }
  }

  function run() {
    if (!isPaused) {
      snake.walk()
    }
  }

  function randomNumber() {
    return Math.floor(Math.random() * (SIZE - 0)) + 0;
  }

})()
