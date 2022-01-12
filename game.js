let snakeBody, snakeHead, snakeTail, snakeTailLastPosition, fields;
let food;
let row;
let col;
let GAMESPEED = 200
let PRESSED_LETTER = [];

const game = {
    initGame: function () {
        this.initBoard();
        this.initSnake();
        //TODO: the game setup goes here.
        this.gameLoop(); //Use function calls like this.
        this.snakeMovement();
    },
    gameLoop: function () {
        this.snakeGrow();

    },
    initSnakeBody: function () {
        for (let i = 0; i < fields.length; i++){
            fields[i].style.background = "lightgreen"
        }
        for (let j = 0; j < snakeBody.length; j++) {
            row = snakeBody[j][0];
            col = snakeBody[j][1];
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].dataset.row == row & fields[i].dataset.col == col) {
                    fields[i].style.background = "blue";
                }
            }
            ;
        }
        ;
    },
    initSnake: function () {

        snakeBody = [[0, 1], [0, 2]];
        fields = document.getElementsByClassName("field");
        this.initSnakeBody();


    },
    snakeMovement: function () {
        window.addEventListener("keydown", checkKeyPress, false);
        function checkKeyPress(key) {
            if (key.keyCode == "65" && preventLastPressedLetter('a')) {
                console.log("a")
                game.resetIntervals();
                const loop = setInterval(moveLeft, GAMESPEED)
                pressedLetter("a")

            } else if (key.keyCode == "83" && preventLastPressedLetter('s')) {
                console.log("s")
                game.resetIntervals();
                const loop = setInterval(moveDown, GAMESPEED)
                pressedLetter("s")

            } else if (key.keyCode == "68" && preventLastPressedLetter('d')) {
                console.log("d")
                game.resetIntervals();
                const loop = setInterval(moveRight, GAMESPEED)
                pressedLetter("d")

            } else if (key.keyCode == "87" && preventLastPressedLetter('w')) {
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
            let x = snakeBody[snakeBody.length - 1][0]-1;
            let y = snakeBody[snakeBody.length - 1][1];
            changeSnakesPosition(x, y)

        }
        function moveDown() {
            let x = snakeBody[snakeBody.length - 1][0]+1;
            let y = snakeBody[snakeBody.length - 1][1];
            changeSnakesPosition(x, y)

        }
        function changeSnakesPosition(snakeBodyX, snakeBodyY){
            snakeBody.shift();
            snakeBody.push([snakeBodyX, snakeBodyY]);
            game.initSnakeBody()
        }
        function preventLastPressedLetter(letter){
            if(PRESSED_LETTER.length === 0){
                return true
            }
            if(letter === PRESSED_LETTER[0]){
                return false
            }
            return true
        }
        function pressedLetter(letter){
            PRESSED_LETTER.push(letter);
            if(PRESSED_LETTER.length > 1){
                PRESSED_LETTER.shift()
            }
            console.log(PRESSED_LETTER)
        }

    },
    resetIntervals: function () {
    const loop = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
    for(let i = 0; i < loop; i++){
        window.clearInterval(i)
        }
    },
    snakeGrow: function (){
        food = [0, 1];
        snakeTailLastPosition = [0, 3];
        snakeHead = snakeBody[0];
        if (this.arrayEquals(food, snakeHead)) {
            snakeBody.push(snakeTailLastPosition)
        };
        this.initSnakeBody();
    },
    snakeDeath: function (){

    },
    initBoard: function (){
        const rows = 10;
        const cols = 10;

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
        rowElement.insertAdjacentHTML(
            'beforeend',
            `<div class="field"
                        data-row="${row}"
                        data-col="${col}"></div>`);
    },

    initFood: function (){

    },
    removeFood: function (){

    },
    isFood: function (){

    },
    isWall: function (){

    },
    isSnake: function (){

    },
    gameOver: function (){

    },
    snakeGoesFaster: function (){

    },
    //EXTRA STUFF
    score: function (){

    },
    foodDespawn: function (){

    },
    invertAxis: function (){

    },
    arrayEquals: function (a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);

    },
};
game.initGame();
