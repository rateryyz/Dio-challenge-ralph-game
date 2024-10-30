const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function updateLives() {
    state.values.lives--;
    state.view.lives.textContent = state.values.lives;

    if (state.values.lives <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        displayGameOver();
    }
}

function playSound() {
    let audio = new Audio("./src/sounds/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        displayGameOver();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            } else {
                updateLives();
            }
        });
    });
}

function displayGameOver() {
    document.getElementById("final-score").textContent = state.values.result;
    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("blur-background").classList.remove("hidden");
}

function initialize() {
    randomSquare();
    moveEnemy();
    addListenerHitBox();
}

document.getElementById("restart-button").addEventListener("click", () => {
    location.reload();
});

initialize();
