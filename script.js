//define html elements
const board = document.getElementById("game-board");

//Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
//Draw game map
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}
//Create snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

//Set positin of the snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

//Tessting
draw();

function drawFood() {
  const foodElement = createGameElement("div", "food");

  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

//generate the fooda
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "right":
      head.x++;
      break;
    case "up":
      head.y--;
      break;
    case "left":
      head.x--;
      break;
    case "down":
      head.y++;
      break;
    default:
      break;
  }
  snake.unshift(head);
  snake.pop();
  //console.log( snake.pop())
}

//Testing moving

// setInterval(() =>{
//     move();
//     draw();
// }, 200);
