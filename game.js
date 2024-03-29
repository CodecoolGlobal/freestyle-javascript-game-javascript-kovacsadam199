let snakeBody, snakeTail, snakeTailLastPosition, snakeHead, fields, food, row, col, GAMESPEED = 500, speedChange = 20,
    score;
let PRESSED_LETTER = [];
const rows = 21;
const cols = 21;

const scoreSound = new Audio('sound_effects/mixkit-extra-bonus-in-a-video-game-2045.wav');
const gameOverSound = new Audio('sound_effects/mixkit-sad-game-over-trombone-471.wav');

const game = {

    initGame: function () {
        if (window.location.href !== 'index.html') window.location.change = 'startMenu.html';
        this.initScore();
        this.initBoard();
        food = this.initFood();
        invertFood = this.initFood('yellow');
        this.initSnake();

        //TODO: the game setup goes here.
        this.gameLoop(); //Use function calls like this.
        this.snakeMovement();
    },
    gameLoop: function () {
        this.snakeGrow();
    },
    initSnakeBody: function () {
        this.initSnakeHead();
        let old_eye = document.getElementById('eye');
        if (old_eye) old_eye.remove();
        this.removeTail();
        for (let j = 0; j < snakeBody.length; j++) {
            row = snakeBody[j][0];
            col = snakeBody[j][1];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].dataset.row == row & fields[i].dataset.col == col) {
                    fields[i].style.background = "darkgreen";
                    if (fields[i].dataset.row == snakeHead[0] && fields[i].dataset.col == snakeHead[1]) {
                        fields[i].style.background = "lightgreen";
                        let eye = document.createElement("img");
                        eye.setAttribute('id', 'eye');
                        eye.style.position = "relative";
                        eye.setAttribute('src', '../static/snake_head.png');
                        fields[i].appendChild(eye);
                        fields[i].style.display = "flex";
                        fields[i].style.justifyContent = "center";
                    }
                }
            }
            ;
        }
        ;
    },

    initSnake: function () {
        snakeBody = [[1, 1], [1, 2]];
        snakeTailLastPosition = snakeBody[0]
        this.initSnakeHead()
        fields = document.getElementsByClassName("field");
        this.initSnakeBody();
    },
    initSnakeHead: function () {
        fields = document.getElementsByClassName("field");
        snakeHead = snakeBody[snakeBody.length - 1];
    },
    snakeMovement: function (key1 = '65', key2 = '83', key3 = '68', key4 = '87') {
        window.addEventListener("keydown", checkKeyPress, false);

        function checkKeyPress(key) {
            if (key.keyCode == key1 && preventLastPressedLetter('a') && preventOppositeLetter('a')) {
                game.resetIntervals();
                const loop = setInterval(moveLeft, GAMESPEED)
                pressedLetter("a")

            } else if (key.keyCode == key2 && preventLastPressedLetter('s') && preventOppositeLetter('s')) {
                game.resetIntervals();
                const loop = setInterval(moveDown, GAMESPEED)
                pressedLetter("s")

            } else if (key.keyCode == key3 && preventLastPressedLetter('d') && preventOppositeLetter('d')) {
                game.resetIntervals();
                const loop = setInterval(moveRight, GAMESPEED)
                pressedLetter("d")

            } else if (key.keyCode == key4 && preventLastPressedLetter('w') && preventOppositeLetter('w')) {
                game.resetIntervals();
                const loop = setInterval(moveUp, GAMESPEED)
                pressedLetter("w")
            }
        }

        movement = checkKeyPress

        function moveRight() {
            let x = snakeBody[snakeBody.length - 1][0];
            let y = snakeBody[snakeBody.length - 1][1] + 1;
            changeSnakesPosition(x, y)
        }

        function moveLeft() {
            let x = snakeBody[snakeBody.length - 1][0]
            let y = snakeBody[snakeBody.length - 1][1] - 1
            changeSnakesPosition(x, y)
        }

        function moveUp() {
            let x = snakeBody[snakeBody.length - 1][0] - 1;
            let y = snakeBody[snakeBody.length - 1][1];
            changeSnakesPosition(x, y)
        }

        function moveDown() {
            let x = snakeBody[snakeBody.length - 1][0] + 1;
            let y = snakeBody[snakeBody.length - 1][1];
            changeSnakesPosition(x, y)
        }

        function changeSnakesPosition(snakeBodyX, snakeBodyY) {
            snakeTailLastPosition = snakeBody.shift();
            snakeBody.push([snakeBodyX, snakeBodyY]);
            game.initSnakeBody()
            game.snakeGrow()
            game.snakeDeath(checkKeyPress)
        }

        function preventLastPressedLetter(letter) {
            if (PRESSED_LETTER.length === 0) {
                return true
            }
            if (letter === PRESSED_LETTER[0]) {
                return false
            }
            return true
        }

        function pressedLetter(letter) {
            PRESSED_LETTER.push(letter);
            if (PRESSED_LETTER.length > 1) {
                PRESSED_LETTER.shift()
            }
        }

        function preventOppositeLetter(letter) {
            if (PRESSED_LETTER.length === 0) {
                return true
            }
            if (letter === 'a' && PRESSED_LETTER[0] === 'd') {
                return false
            } else if (letter === 'd' && PRESSED_LETTER[0] === 'a') {
                return false
            } else if (letter === 'w' && PRESSED_LETTER[0] === 's') {
                return false
            } else if (letter === 's' && PRESSED_LETTER[0] === 'w') {
                return false
            }
            return true
        }
    },
    resetIntervals: function () {
        const loop = window.setInterval(function () {
        }, Number.MAX_SAFE_INTEGER);
        for (let i = 0; i < loop; i++) {
            window.clearInterval(i)
        }
    },
    snakeGrow: function () {
        snakeHead = snakeBody[snakeBody.length - 1];
        snakeTail = snakeBody[0];
        if (this.arrayEquals(food, snakeHead)) {
            window.removeEventListener("keydown", movement);
            this.snakeMovement();
            snakeBody.unshift(snakeTailLastPosition)
            game.removeFood(food);
            game.incScore(1);
            do {
                food = game.initFood();
            }
            while (food == 1);
        }
        if (this.arrayEquals(invertFood, snakeHead)) {
            window.removeEventListener("keydown", movement);
            this.snakeMovement('68', '87', '65', '83');
            snakeBody.unshift(snakeTailLastPosition)
            game.removeFood(invertFood);
            game.incScore(3);
            do {
                invertFood = game.initFood('yellow');
            }
            while (invertFood == 1);
        }
        this.initSnakeBody()
    },
    snakeDeath: function (handler) {
        let gameField = document.querySelector(".game-field");
        const currRow = snakeHead[0];
        const currCol = snakeHead[1];
        const firstRow = 0;
        const lastRow = rows - 1;
        const firstCol = 0;
        const lastCol = cols - 1;
        const snakeBodySlice = snakeBody.slice(0, -1);
        for (let i = 0; i < snakeBodySlice.length; i++) {
            if (this.arrayEquals(snakeBodySlice[i], snakeHead)) {
                gameField.insertAdjacentHTML('beforeend', '<h1 id="crossed">Game over</h1>');
                this.gameOver(handler)
            }
        }
        if ((currRow === firstRow || currRow === lastRow || currCol === firstCol || currCol === lastCol)
            && !document.getElementById("game-over")) {
            gameField.insertAdjacentHTML
            ('beforeend', '<h1 id="game-over">Game over</h1>');
            this.gameOver(handler)
        }
    },
    initBoard: function () {
        let gameField = document.querySelector(".game-field");
        this.setGameFieldSize(gameField, rows, cols);
        let cellIndex = 0
        for (let row = 0; row < rows; row++) {
            const rowElement = this.addRow(gameField);
            for (let col = 0; col < cols; col++) {
                this.addCell(rowElement, row, col);
                cellIndex++;

            }
        }
    },
    setGameFieldSize: function (gameField, rows, cols) {
        gameField.style.width = (gameField.dataset.cellWidth * rows) + 'px';
        gameField.style.height = (gameField.dataset.cellHeight * cols) + 'px';
    },
    addRow: function (gameField) {
        gameField.insertAdjacentHTML(
            'beforeend',
            '<div class="row"></div>'
        );
        return gameField.lastElementChild;
    },
    addCell: function (rowElement, row, col) {
        const edgeCells = [0, cols - 1];
        rowElement.insertAdjacentHTML(
            'beforeend',
            `<div class="field${(edgeCells.includes(row) || edgeCells.includes(col)) ? ' edge' : ''}"
                        data-row="${row}"
                        data-col="${col}"></div>`);
    },
    initFood: function (color = 'red') {
        let check = 0;
        let row1 = this.generateRandom(1, rows - 2);
        let col1 = this.generateRandom(1, cols - 2);
        let fields = document.getElementsByClassName('field')
        if (snakeBody) {
            for (let i = 0; i < snakeBody.length; i++) {
                if (snakeBody[i].includes(row1) & snakeBody[i].includes(col1)) {
                    check = 1
                }
            }
        }
        if (check == 1) {
            return 1
        }
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].dataset.row == row1 & fields[i].dataset.col == col1) {
                fields[i].style.background = color
            }
        }
        if (GAMESPEED >= 130) {
            GAMESPEED = GAMESPEED - speedChange;
        }
        return [row1, col1]
    },
    removeFood: function (position) {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].dataset.row == position[0] && fields[i].dataset.col == position[1]) {
                fields[i].style.background = 'lightgreen'
            }
        }

    },

    removeTail: function () {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].dataset.row == snakeTailLastPosition[0] && fields[i].dataset.col == snakeTailLastPosition[1]) {
                fields[i].style.background = 'lightgreen'
            }
            ;
        }
        ;
    },
    gameOver: function (handler) {
        gameOverSound.play();
        window.removeEventListener("keydown", handler, false);
        this.resetIntervals();
        let gameField = document.querySelector(".game-field")
        gameField.insertAdjacentHTML('afterbegin', '<button onclick="window.location.href = \'index.html\'">Restart</button>')
    },
    arrayEquals: function (a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    },
    generateRandom: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    },
    initScore: function (gameField) {
        gameField = document.querySelector(".game-field");
        score = 0;
        gameField.insertAdjacentHTML(
            'beforeend',
            '<h2 class="score">Score: 0</h2>'
        );
    },
    incScore: function (times) {
        score += times;
        scoreSound.play();
        scoreField = document.getElementsByClassName('score')[0];
        scoreField.innerHTML = `Score: ${score}`;
    }
};
game.initGame();
