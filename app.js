const colors = ['green', 'red', 'yellow', 'blue'];
let sequence = [];
let playerSequence = [];
let level = 0;
let score = 0; // New score variable

const startButton = document.getElementById('start-button');
const statusText = document.getElementById('status');
const scoreText = document.getElementById('score'); // New score display element
const colorButtons = document.querySelectorAll('.color-button');

startButton.addEventListener('click', startGame);

function startGame() {
    level = 0;
    score = 0; // Reset score at the start of the game
    sequence = [];
    playerSequence = [];
    statusText.textContent = 'Game Started!';
    scoreText.textContent = `Score: ${score}`; // Display the initial score
    nextRound();
}

function nextRound() {
    level++;
    score += 10; // Increase score by 10 points each level
    playerSequence = [];
    statusText.textContent = `Level ${level}`;
    scoreText.textContent = `Score: ${score}`; // Update score display
    sequence.push(colors[Math.floor(Math.random() * 4)]);
    playSequence();
}

function playSequence() {
    let i = 0;
    const intervalId = setInterval(() => {
        const color = sequence[i];
        flashColor(color);
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
        }
    }, 600);
}

function flashColor(color) {
    const button = document.getElementById(color);
    button.style.opacity = '1';
    setTimeout(() => {
        button.style.opacity = '0.8';
    }, 300);
}

colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const color = e.target.id;
        playerSequence.push(color);
        flashColor(color);
        checkSequence();
    });
});

function checkSequence() {
    const lastIndex = playerSequence.length - 1;
    if (playerSequence[lastIndex] !== sequence[lastIndex]) {
        statusText.textContent = 'Game Over! Press Start to try again';
        return;
    }
    if (playerSequence.length === sequence.length) {
        setTimeout(nextRound, 1000);
    }
}