(function () {
  let FPS = 10
  const SIZE = 40

  let board;
  let snake;
  let points;
  let fruits;
  let pontuacao = '00000';
  let framesContados = 0;

  function init() {
    points = new Points()
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]])
    fruits = new Fruits([[parseInt(Math.random() * 20), parseInt(Math.random() * 20)]]);
    isPaused = false;
    IdIntervalo = setInterval(run, 1000 / FPS);
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
    constructor() {
      this.element = document.createElement("h1")
      this.element.setAttribute("id", "pontos")
      this.element.innerHTML = `${pontuacao}`
      document.body.appendChild(this.element)
    }
    addPoint(ponto) {
      pontuacao = parseInt(pontuacao) + ponto;
      pontuacao = pontuacao.toString().padStart(5, '0');
      document.getElementById("pontos").innerHTML = `${pontuacao}`;
    }
  }

  class Fruits {
    constructor(position) {
      this.position = position;
      const numAleatorio = Math.random();
      if (numAleatorio < 2 / 3) {
        this.color = "#222";
      } else {
        this.color = "#FF0000";
      }

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
      const oldTail = this.body.shift()
      document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color
      document.querySelector(`#board tr:nth-child(${oldTail[0]}) td:nth-child(${oldTail[1]})`).style.backgroundColor = board.color
    }
    changeDirection(direction) {
      this.direction = direction
    }
    adicionar() {
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
      document.querySelector(`#board tr:nth-child(${newHead[0]}) td:nth-child(${newHead[1]})`).style.backgroundColor = this.color
    }
  }

  function run() {
    if (!isPaused) {
      snake.walk()
      if (JSON.stringify(snake.body[0]) == JSON.stringify(fruits.showPosition())) {
        if (fruits.color === '#222') {
          points.addPoint(1);
        } else {
          points.addPoint(2);
        }

        let posNew = randomNumber()
        if (snake.body.includes(posNew)) {
          posNew = randomNumber()
        } else {
          fruits = new Fruits(posNew);
        }
        snake.adicionar((fruits.showPosition()[0]))

      }
      framesContados++;
      if (framesContados % 60 === 0) {
        FPS += 1;
        clearInterval(IdIntervalo);
        IdIntervalo = setInterval(run, 1000 / FPS);
      }

    }
  }

  function randomNumber() {
    return [[parseInt(Math.random() * 20), parseInt(Math.random() * 20)]];
  }

})()
