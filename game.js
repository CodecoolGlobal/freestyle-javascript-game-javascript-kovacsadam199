let snakeBody, snakeTail, snakeTailLastPosition, snakeHead, fields;
let food;
let row;
let col;
let GAMESPEED = 200
let PRESSED_LETTER = [];
const rows = 11;
const cols = 11;

const game = {
    initGame: function (){

        this.initBoard();
        food = this.initFood();
        this.initSnake();

        //TODO: the game setup goes here.
        this.gameLoop(); //Use function calls like this.
        this.snakeMovement();
    },
    gameLoop: function () {
        console.log(food ,'food')
        this.snakeGrow();

    },
    initSnakeBody: function () {
        for (let i = 0; i < fields.length; i++){
            if(fields[i].dataset.row!=food[0] || fields[i].dataset.col != food[1]){fields[i].style.background = "lightgreen"}

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

        snakeBody = [[1, 1], [1, 2]];
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
            snakeTailLastPosition = snakeBody.shift();
            snakeBody.push([snakeBodyX, snakeBodyY]);
            game.initSnakeBody()
            game.snakeGrow()
            game.snakeDeath()
            console.log(snakeBody)
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
        function preventOppositeLetter(letter){
            if(PRESSED_LETTER.length === 0){
                return true
            }
            if(letter === 'a' && PRESSED_LETTER[0] === 'd'){
                return false
            }
        }

    },
    resetIntervals: function () {
    const loop = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
    for(let i = 0; i < loop; i++){
        window.clearInterval(i)
        }
    },
    snakeGrow: function (){
        snakeHead = snakeBody[snakeBody.length-1];
        snakeTail = snakeBody[0];
        if (this.arrayEquals(food, snakeHead)) {
            snakeBody.unshift(snakeTailLastPosition)
            game.removeFood();
            food = game.initFood();
        };

        this.initSnakeBody()

    },
    snakeDeath: function (){
        let gameField = document.querySelector(".game-field");
        const currRow = snakeHead[0];
        const currCol = snakeHead[1];
        const firstRow = 0;
        const lastRow = rows-1;
        const firstCol = 0;
        const lastCol = cols-1;
        const snakeBodySlice = snakeBody.slice(0, -1);
        for (let i=0; i<snakeBodySlice.length; i++)
        {
            if (this.arrayEquals(snakeBodySlice[i],snakeHead)
            ) gameField.insertAdjacentHTML
            ('beforeend', '<h1 id="crossed">Crossed</h1>');
        }
        if ((currRow === firstRow || currRow === lastRow || currCol === firstCol || currCol === lastCol)
        && !document.getElementById("game-over"))
        {gameField.insertAdjacentHTML
        ('beforeend', '<h1 id="game-over">Game over</h1>');
        }



    },
    initBoard: function (){
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
        const edgeCells = [0, cols-1];
        rowElement.insertAdjacentHTML(
            'beforeend',
            `<div class="field${(edgeCells.includes(row) || edgeCells.includes(col)) ? ' edge' : ''}"
                        data-row="${row}"
                        data-col="${col}"></div>`);
    },


    initFood: function (){
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        console.log('snakebody',snakeBody)

        let fields = document.getElementsByClassName('field')

        for (let i=0; i<fields.length;i++){
            if(fields[i].dataset.row==row & fields[i].dataset.col==col){
                fields[i].style.background='red'
            }
        }
        return [row, col]

    },
    removeFood: function (){
        for(let i=0;i<fields.length;i++){
            if(fields[i].dataset.row==food[0] && fields[i].dataset.col==food[1])
            {
                fields[i].style.background='lightgreen'

            }
        }

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
    generateRandom: function (){
        //holnap
    }
};
game.initGame();
