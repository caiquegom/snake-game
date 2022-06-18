let stage = document.getElementById("stage");
let context = stage.getContext('2d');
let gameOver = false;

let snake = {
    posY: [0],
    posX: [0],
    newSquares: 0,
}

let movement = {
    x: 0,
    y: 1,
    actualMovement: 'ArrowDown',
    lastMovement: null,
}

let scorePoint = {
    posX: null,
    posY: null,
}

function drawSnake(i) {
    context.fillStyle = 'white'
    context.fillRect(snake.posX[i],snake.posY[i], 25,25);
    context.strokeRect(snake.posX[i],snake.posY[i], 25,25);
    context.lineWidth = 2
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
    drawScorePoint();
    move();
    verifyPoint();
    verifyBodyColision();
    verifyStageLimitColision();
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
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

function generateScorePointCoordinates() {
    do{
        scorePoint.posX = (Math.floor(Math.random() * 20)) * 25;
        scorePoint.posY = (Math.floor(Math.random() * 20)) * 25;
    } while(snake.posX.indexOf(scorePoint.posX) != -1 && snake.posY.indexOf(scorePoint.posY) != -1);
}

function drawScorePoint() {
    context.fillStyle = '#ff5b5b';
    context.fillRect(scorePoint.posX,scorePoint.posY, 25,25);
    context.fill()
}

generateScorePointCoordinates()
let updateInterval = setInterval(update, 80);

function verifyPoint() {
    if (snake.posX[0] === scorePoint.posX && snake.posY[0] === scorePoint.posY) {
        snake.newSquares++;
        generateScorePointCoordinates();
    } 
}

function verifyStageLimitColision() {
    if (snake.posX[0] < 0 || snake.posX[0] === stage.width) {
        clearInterval(updateInterval);
    } else if (snake.posY[0] < 0 || snake.posY[0] === stage.height) {
        clearInterval(updateInterval);
    }
}

function verifyBodyColision() {
    
}


