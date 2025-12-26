const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let snake = [];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let gameInterval;
let isGameRunning = false;

// Initialize High Score display
highScoreElement.textContent = highScore;

function initGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    draw();
}

function startGame() {
    if (isGameRunning) return;
    initGame();
    isGameRunning = true;
    startBtn.style.display = 'none'; // Hide button during game
    // Start moving right by default
    dx = 1; 
    dy = 0;
    gameInterval = setInterval(gameLoop, 100);
}

function gameOver() {
    clearInterval(gameInterval);
    isGameRunning = false;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
        alert(`New High Score! ${score}`);
    } else {
        alert(`Game Over! Your Score: ${score}`);
    }

    startBtn.textContent = 'Play Again';
    startBtn.style.display = 'inline-block';
}

function gameLoop() {
    update();
    draw();
}

function update() {
    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }

    // Check self collision
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    // Clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = '#ff0055'; // Pink/Red neon
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff0055';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    ctx.shadowBlur = 0;

    // Draw snake
    ctx.fillStyle = '#0f0'; // Green neon
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#0f0';
    snake.forEach((part, index) => {
        // Head is slightly brighter
        if (index === 0) ctx.fillStyle = '#ccffcc';
        else ctx.fillStyle = '#0f0';
        
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });
    ctx.shadowBlur = 0;
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Make sure food doesn't spawn on snake
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) {
            placeFood();
        }
    });
}

// Input handling
document.addEventListener('keydown', (e) => {
    if (!isGameRunning) return;

    switch (e.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

startBtn.addEventListener('click', startGame);

// Initial draw
initGame();