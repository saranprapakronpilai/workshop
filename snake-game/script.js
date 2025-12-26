const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const socket = io();

const gridSize = 20;
// tileCount is managed by server (20x20)

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('gameState', (state) => {
    requestAnimationFrame(() => draw(state));
});

function draw(state) {
    // Clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Food
    if (state.food) {
        ctx.fillStyle = '#ff0055'; // Pink/Red neon
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff0055';
        ctx.fillRect(state.food.x * gridSize, state.food.y * gridSize, gridSize - 2, gridSize - 2);
        ctx.shadowBlur = 0;
    }

    // Draw Players
    const myId = socket.id;
    
    for (let id in state.players) {
        const player = state.players[id];
        
        // Update my score if it's me
        if (id === myId) {
            scoreElement.textContent = player.score;
        }

        // Set color
        ctx.fillStyle = player.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = player.color;

        // Draw Head
        ctx.fillRect(player.x * gridSize, player.y * gridSize, gridSize - 2, gridSize - 2);

        // Draw Tail
        player.tail.forEach(part => {
            ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
        });
        
        ctx.shadowBlur = 0;
    }
}

// Input handling
document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        socket.emit('keydown', e.key);
    }
});
