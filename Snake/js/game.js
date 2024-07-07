(function () {
  let FPS = 10
  const SIZE = 40

  let board;
  let snake;
  let points;
  let fruits;
  let ultimaDirecao;
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
        snake.ultimaDirecao = snake.direction;
        snake.changeDirection(0)
        break;
      case "ArrowRight":
        snake.ultimaDirecao = snake.direction;
        snake.changeDirection(1)
        break;
      case "ArrowDown":
        snake.ultimaDirecao = snake.direction;
        snake.changeDirection(2)
        break;
      case "ArrowLeft":
        snake.ultimaDirecao = snake.direction;
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

      this.element = document.createElement("h1")
      this.element.setAttribute("id", "gameover")
      this.element.innerHTML = "Fim do jogo!"
      document.body.appendChild(this.element)
      document.getElementById("gameover").style.paddingLeft = "500px"
      document.getElementById("gameover").style.visibility = "hidden";
      document.getElementById("gameover").style.display = "none";

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
      this.ultimaDirecao = 1;
      this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
      this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0]}) td:nth-child(${field[1]})`).style.backgroundColor = this.color)
    }
    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;

      // verifica se a direção é valida, caso contrário, ignora
      if (this.direction == 0 && this.ultimaDirecao == 2 ||
        this.direction == 1 && this.ultimaDirecao == 3 ||
        this.direction == 2 && ultimaDirecao == 0 ||
        this.direction == 3 && this.ultimaDirecao == 1
      ) {
        this.direction = this.ultimaDirecao;
      }

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
      // Verifica se a cabeça da cobra está fora dos limites da tabela
      if (newHead[0] < 0 || newHead[0] >= 40 || newHead[1] < 0 || newHead[1] >= 40) {
        document.getElementById("gameover").style.visibility = "visible";
        document.getElementById("gameover").style.display = "inline";
        isPaused = true; // Pausar o jogo
        return;
      }
      // verifica se passou pelo corpo
      this.body.slice(1).forEach((e) => {
        if (JSON.stringify(newHead) == JSON.stringify(e)) {
          document.getElementById("gameover").style.visibility = "visible";
          document.getElementById("gameover").style.display = "inline";
          isPaused = true; // Pausar o jogo
          return;
        }
      })

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
      this.body.push(head)
      document.querySelector(`#board tr:nth-child(${head[0]}) td:nth-child(${head[1]})`).style.backgroundColor = this.color
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
