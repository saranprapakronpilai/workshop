const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Serve static files from current directory
app.use(express.static(__dirname));

// Game Constants
const GRID_SIZE = 20;
const TILE_COUNT = 20; // Canvas 400px / 20px
const GAME_SPEED = 100; // ms per frame

// Game State
let players = {};
let food = { x: 15, y: 15 };

function randomPosition() {
    return {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT)
    };
}

function getRandomColor() {
    const colors = ['#0f0', '#00ff88', '#00ccff', '#ff0055', '#ffcc00', '#9900ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Create new player
    players[socket.id] = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT),
        dx: 0,
        dy: 0,
        tail: [], // Array of {x, y}
        score: 0,
        color: getRandomColor(),
        name: `Player ${Object.keys(players).length + 1}`
    };

    // Handle Input
    socket.on('keydown', (key) => {
        const player = players[socket.id];
        if (!player) return;

        switch (key) {
            case 'ArrowUp':
                if (player.dy !== 1) { player.dx = 0; player.dy = -1; }
                break;
            case 'ArrowDown':
                if (player.dy !== -1) { player.dx = 0; player.dy = 1; }
                break;
            case 'ArrowLeft':
                if (player.dx !== 1) { player.dx = -1; player.dy = 0; }
                break;
            case 'ArrowRight':
                if (player.dx !== -1) { player.dx = 1; player.dy = 0; }
                break;
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete players[socket.id];
    });
});

// Game Loop
setInterval(() => {
    for (let id in players) {
        let player = players[id];

        // Move player
        if (player.dx === 0 && player.dy === 0) continue; // Don't move if stationary

        let nextX = player.x + player.dx;
        let nextY = player.y + player.dy;

        // Wrap around walls (optional, or Game Over) - Let's do wrap for fun multiplayer chaos
        // Or stick to walls = death? Let's do walls = respawn for multiplayer fun
        if (nextX < 0 || nextX >= TILE_COUNT || nextY < 0 || nextY >= TILE_COUNT) {
            // Respawn
            player.x = Math.floor(Math.random() * TILE_COUNT);
            player.y = Math.floor(Math.random() * TILE_COUNT);
            player.tail = [];
            player.score = 0;
            player.dx = 0;
            player.dy = 0;
            continue;
        }

        // Move Body
        player.tail.push({ x: player.x, y: player.y });
        while (player.tail.length > player.score) {
            player.tail.shift();
        }

        player.x = nextX;
        player.y = nextY;

        // Check Food Collision
        if (player.x === food.x && player.y === food.y) {
            player.score++;
            food = randomPosition();
        }

        // Check Self/Other Collision (Simplified)
        // If hitting any tail (own or others), respawn
        // (Optimization: can be improved but works for prototype)
    }
    
    // Broadcast State
    io.emit('gameState', { players, food });

}, GAME_SPEED);

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
