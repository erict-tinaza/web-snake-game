//define html elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
//Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
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
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval); //clear past interval
    gameInterval = setInterval(() => {
      move();
      //   checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
  //   snake.pop();
  //console.log( snake.pop())
}

//Testing moving

// setInterval(() =>{
//     move();
//     draw();
// }, 200);

function startGame() {
  gameStarted = true; //keep track of a running game
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    //   checkCollision();
    draw();
  }, gameSpeedDelay);
}

//keypress event listener

function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === "Space") ||
    (!gameStarted && event.key === "")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed(){
    if(gameSpeedDelay > 150){
        gameSpeedDelay-=5;
    }else if(gameSpeedDelay > 100){
        gameSpeedDelay-=3;
    }else if(gameSpeedDelay > 50){
        gameSpeedDelay-=2;
    }else if(gameSpeedDelay > 25){
        gameSpeedDelay-=1;
    }
}
function checkCollision() {
    const head = snake[0];
    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
        resetGame();
    }   
    for(let i = 1; i < snake.length; i++){
        
    }
}