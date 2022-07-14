const stage = document.getElementById("stage");
const context = stage.getContext('2d');

const menuOptions = document.getElementsByClassName('options')[0]
let infiniteBorder = false;
let updateInterval;

let snake = {
    posY: [250],
    posX: [0],
    newSquares: 0,
}

let movement = {
    x: 1,
    y: 0,
}

let apple = {
    posX: 300,
    posY: 250,
}

let keyControl = {
    lastKey: null,
    actualKey: null,
}

const scoreboard = document.getElementById("scoreboard");

// ================== GAME MENU ====================

context.fillStyle = '#24fa20';
context.font = '50px Arial';
context.fillText('SNAKE GAME', 80, 100);
context.fill();

restart.style.display = 'none' 

function startGame() {
    updateInterval = setInterval(update, 80);
    menuOptions.style.display = 'none';
    showScore();
    updateScore();
}

function restartGame() {
    snake = {
        posY: [250],
        posX: [0],
        newSquares: 0,
    }
    
    movement = {
        x: 1,
        y: 0,
    }
    
    apple = {
        posX: 300,
        posY: 250,
    }
    
    keyControl = {
        lastKey: null,
        actualKey: null,
    }

    startGame()
}

function changeStageMode(button) {
    infiniteBorder = !infiniteBorder;
    if (infiniteBorder === false) {
        button.innerHTML = 'Borda infinita: OFF';
    } else {
        button.innerHTML = 'Borda infinita: ON';
    }
}

// ================== ON GOING GAME =========================

function verifyKey(key) {
    keyControl.lastKey = keyControl.actualKey;
    keyControl.actualKey = key;

    switch (keyControl.lastKey) {
        case ('ArrowUp'):
            if (keyControl.actualKey == 'ArrowDown'){
                keyControl.actualKey = 'ArrowUp'
            }
            break;
        case ('ArrowDown'):
            if (keyControl.actualKey == 'ArrowUp'){
                keyControl.actualKey = 'ArrowDown'
            }
            break;
        case ('ArrowRight'):
            if (keyControl.actualKey == 'ArrowLeft'){
                keyControl.actualKey = 'ArrowRight'
            }
            break;
        case ('ArrowLeft'):
            if (keyControl.actualKey == 'ArrowRight'){
                keyControl.actualKey = 'ArrowLeft'
            }
            break;
    }
}

function drawSnake(i) {
    context.fillStyle = 'white'
    context.fillRect(snake.posX[i],snake.posY[i], 25,25);
    context.strokeRect(snake.posX[i],snake.posY[i], 25,25);
    context.lineWidth = 2;
    context.stroke();
    context.fill();
}

function drawStage() {
    context.fillStyle = 'black';
    context.fillRect(0,0, 500,500);
    context.fill();
}

function move() {
    if (snake.newSquares != 0) {
        for (let index = snake.newSquares; index > 0; index--) {
            snake.posX[index] = snake.posX[index - 1];
            snake.posY[index] = snake.posY[index - 1];
            drawSnake(index);
        }
    }

    snake.posX[0] += movement.x * 25;
    snake.posY[0] += movement.y * 25;

    drawSnake(0);
}
        

function update() {   
    drawStage();
    drawApple();
    move();
    verifyPoint();
    verifyBodyColision();
    verifyStageLimitColision(infiniteBorder);
}

document.addEventListener('keydown', function(event) {
    if (snake.newSquares > 0) {
       verifyKey(event.key);
    } else {
        keyControl.actualKey = event.key;
    }

    switch (keyControl.actualKey) {
        case ('ArrowUp'):
            movement.x = 0;
            movement.y = -1;
            break;
        case ('ArrowDown'):
            movement.x = 0;
            movement.y = 1;
            break;
        case ('ArrowRight'):
            movement.x = 1;
            movement.y = 0;
            break;
        case ('ArrowLeft'):
            movement.x = -1;
            movement.y = 0;
            break;
    }
})

function generateAppleCoordinates() {
    do{
        apple.posX = (Math.floor(Math.random() * 20)) * 25;
        apple.posY = (Math.floor(Math.random() * 20)) * 25;
    } while(snake.posX.indexOf(apple.posX) != -1 && snake.posY.indexOf(apple.posY) != -1);
}

function drawApple() {
    context.fillStyle = '#ff5b5b';
    context.fillRect(apple.posX,apple.posY, 25,25);
    context.fill()
}

function verifyPoint() {
    if (snake.posX[0] === apple.posX && snake.posY[0] === apple.posY) {
        snake.newSquares++;
        updateScore()
        generateAppleCoordinates();
    } 
}

function verifyStageLimitColision(teleport) {
    if (teleport === true) {
        teleportSnake();
    } else {
        if (snake.posX[0] < 0 || snake.posX[0] === stage.width) {
            gameOver();
        } else if (snake.posY[0] < 0 || snake.posY[0] === stage.height) {
            gameOver();
        }
    }
}

function teleportSnake() {
    for (let index in snake.posX) {

        if (snake.posX[index] < 0) {
            snake.posX[index] = 500;
        }

        if (snake.posX[index] > 500) {
            snake.posX[index] = -25;
        }

        if (snake.posY[index] < 0) {
            snake.posY[index] = 500;
        }

        if (snake.posY[index] > 500) {
            snake.posY[index] = -25;
        }
    }

}

function verifyBodyColision() {
    for (let index = 1; index < snake.posX.length; index++) {
        if (snake.posX[0] === snake.posX[index] && snake.posY[0] === snake.posY[index]) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(updateInterval);
    menuOptions.style.display = 'flex';
    start.style.display = 'none' 
    restart.style.display = 'inline-block'
}

// ================== SCORE =========================

function showScore() {
    scoreboard.style.display = 'block'
}

function updateScore() {
    scoreboard.innerHTML = `<p>Pontos: ${snake.newSquares}</p>`;
}

