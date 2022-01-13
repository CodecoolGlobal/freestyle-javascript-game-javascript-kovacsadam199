let snakeBody, snakeTail, snakeTailLastPosition, snakeHead, fields;
let food;
let row;
let col;
let GAMESPEED = 500, speedChange = 20;
let PRESSED_LETTER = [];
const rows = 11;
const cols = 11;
let score = 0;

const game = {
    initGame: function () {
        this.initScore();
        this.initBoard();
        food = this.initFood();
        this.initSnake();

        //TODO: the game setup goes here.
        this.gameLoop(); //Use function calls like this.
        this.snakeMovement();
    },
    gameLoop: function () {
        console.log(food, 'food')
        this.snakeGrow();

    },
    initSnakeBody: function () {
        this.initSnakeHead();
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].dataset.row != food[0] || fields[i].dataset.col != food[1]) {
                fields[i].style.background = "lightgreen";
            }

        }
        for (let j = 0; j < snakeBody.length; j++) {
            row = snakeBody[j][0];
            col = snakeBody[j][1];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].dataset.row == row & fields[i].dataset.col == col) {
                    fields[i].style.background = "blue";
                    if(fields[i].dataset.row == snakeHead[0] && fields[i].dataset.col == snakeHead[1]){
                        fields[i].style.background = "yellowgreen";
                        /*let eye = document.createElement("img");
                        eye.setAttribute('id', 'eye');
                        eye.style.position = "relative";
                        eye.setAttribute('src', '../static/snake_head.png');
                        fields[i].appendChild(eye);
                        fields[i].style.display = "flex";
                        fields[i].style.justifyContent = "center";*/
                    }
                }
            }
            ;
        }
        ;

    },
    initSnake: function () {

        snakeBody = [[1, 1], [1, 2]];
        this.initSnakeHead()
        fields = document.getElementsByClassName("field");
        this.initSnakeBody();


    },

    initSnakeHead: function (){
        fields = document.getElementsByClassName("field");
        snakeHead = snakeBody[snakeBody.length - 1];
        },


    snakeMovement: function () {

        window.addEventListener("keydown", checkKeyPress, false);

        function checkKeyPress(key) {
            if (key.keyCode == "65" && preventLastPressedLetter('a') && preventOppositeLetter('a')) {
                console.log("a")
                game.resetIntervals();
                const loop = setInterval(moveLeft, GAMESPEED)
                pressedLetter("a")

            } else if (key.keyCode == "83" && preventLastPressedLetter('s') && preventOppositeLetter('s')) {
                console.log("s")
                game.resetIntervals();
                const loop = setInterval(moveDown, GAMESPEED)
                pressedLetter("s")

            } else if (key.keyCode == "68" && preventLastPressedLetter('d') && preventOppositeLetter('d')) {
                console.log("d")
                game.resetIntervals();
                const loop = setInterval(moveRight, GAMESPEED)
                pressedLetter("d")

            } else if (key.keyCode == "87" && preventLastPressedLetter('w') && preventOppositeLetter('w')) {
                console.log("w")
                game.resetIntervals();
                const loop = setInterval(moveUp, GAMESPEED)
                pressedLetter("w")
            }

        }

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
            console.log(snakeBody)
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
            console.log(PRESSED_LETTER)
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
        this.initSnakeHead();
        //snakeHead = snakeBody[snakeBody.length - 1];
        snakeTail = snakeBody[0];
        if (this.arrayEquals(food, snakeHead)) {
            snakeBody.unshift(snakeTailLastPosition)
            game.removeFood();
            game.incScore();
            do {
                food = game.initFood();
            }
            while (food == 1);
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
        for (let i=0; i<snakeBodySlice.length; i++) {
            if (this.arrayEquals(snakeBodySlice[i],snakeHead)){
                gameField.insertAdjacentHTML('beforeend', '<h1 id="crossed">Crossed</h1>');
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


    initFood: function () {
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
                fields[i].style.background = 'red'
            }
        }
        GAMESPEED = GAMESPEED - speedChange;
        return [row1, col1]

    },
    removeFood: function () {
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].dataset.row == food[0] && fields[i].dataset.col == food[1]) {
                fields[i].style.background = 'lightgreen'

            }
        }

    },
    isFood: function () {

    },
    isWall: function () {

    },
    isSnake: function () {

    },
    gameOver: function (handler) {
        window.removeEventListener("keydown", handler, false);
        this.resetIntervals();
        let gameField = document.querySelector(".game-field")
        gameField.insertAdjacentHTML('beforeend', '<button onclick="window.location.href = \'startMenu.html\'">Back to menu</button>')
        gameField.insertAdjacentHTML('beforeend', '<button onclick="window.location.href = \'index.html\'">Restart</button>')


    },

    snakeGoesFaster: function () {

    },
    //EXTRA STUFF
    score: function () {

    },
    foodDespawn: function () {

    },
    invertAxis: function () {

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
            '<h1 class="score">Score: 0</h1>'
        );

    },
    incScore: function () {
        score++;
        scoreField = document.getElementsByClassName('score')[0];
        scoreField.innerHTML=`Score: ${score}`;
    }

};
game.initGame();

