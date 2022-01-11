const game = {
    initGame: function (){
        this.snakeMovement()

    },
    gameLoop: function () {
    },
    initSnake: function (){

    },
    snakeMovement: function (){
        window.addEventListener("keydown", checkKeyPress, false);
        function checkKeyPress(key){
            if(key.keyCode == "65"){
                console.log("a");
            } else if(key.keyCode == "83"){
                console.log("s")
            } else if(key.keyCode == "68"){
                console.log("d");
            } else if(key.keyCode == "87"){
                console.log("w");
            }
        }
    },
    snakeGrow: function (){

    },
    snakeDeath: function (){

    },
    initBoard: function (){

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
};
game.initGame();
