const game = {
    initGame: function (){
        this.initBoard();
        //TODO: the game setup goes here.
        this.gameLoop(); //Use function calls like this.
    },
    gameLoop: function (){

    },
    initSnake: function (){

    },
    snakeMovement: function (){

    },
    snakeGrow: function (){

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

    }
}
game.initGame();