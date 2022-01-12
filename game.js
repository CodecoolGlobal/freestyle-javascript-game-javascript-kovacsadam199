let snakeBody, snakeHead, snakeTail, snakeTailLastPosition, fields;
let food;
let row;
let col;
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
        //this.snakeDeath();

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

            if (key.keyCode == "65") {
                moveLeft()
                game.initSnakeBody()
                game.snakeGrow()
                console.log("a");
            } else if (key.keyCode == "83") {
                moveDown()
                game.initSnakeBody()
                game.snakeGrow()
                console.log("s")
            } else if (key.keyCode == "68") {
                moveRight()
                game.initSnakeBody()
                game.snakeGrow()
                console.log("d");
            } else if (key.keyCode == "87") {
                moveUp()
                game.initSnakeBody()
                game.snakeGrow()
                console.log("w");
            }
            game.snakeDeath()
            console.log(snakeBody)
        }
        function moveRight() {
            let move = [];
            move.push(snakeBody[snakeBody.length - 1][0], snakeBody[snakeBody.length - 1][1] + 1);
            snakeTail= snakeBody.shift();
            snakeBody.push(move)
        }
        function moveLeft() {
            let move = [];
            move.push(snakeBody[snakeBody.length - 1][0], snakeBody[snakeBody.length - 1][1] - 1);
            snakeTail= snakeBody.shift();
            snakeBody.push(move)
        }
        function moveUp() {
            let move = [];
            move.push(snakeBody[snakeBody.length - 1][0]-1, snakeBody[snakeBody.length - 1][1]);
            snakeTail= snakeBody.shift();
            snakeBody.push(move)
        }
        function moveDown() {
            let move = [];
            move.push(snakeBody[snakeBody.length - 1][0]+1, snakeBody[snakeBody.length - 1][1]);
            snakeTail= snakeBody.shift();
            snakeBody.push(move)
        }
    },
    snakeGrow: function (){
        snakeTailLastPosition = snakeBody[0];
        snakeHead = snakeBody[snakeBody.length-1];
        if (this.arrayEquals(food, snakeHead)) {
            snakeBody.unshift(snakeTail)
            for(let i=0;i<fields.length;i++){
            if(fields[i].dataset.row==food[0] && fields[i].dataset.col==food[1])
            {
                fields[i].style.background='lightgreen'
                food = game.initFood();
            }
        };
        };
        console.log(snakeBody,'snakebody',food,'food')
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

        let fields = document.getElementsByClassName('field')

        for (let i=0; i<fields.length;i++){
            if(fields[i].dataset.row==row & fields[i].dataset.col==col){
                fields[i].style.background='red'
            }
        }
        return [row, col]

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
