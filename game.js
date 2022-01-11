const game = {
    initGame: function (){
        const move = this.snakeMovement();
        console.log(move);
    },
    gameLoop: function (){
    },
    initSnake: function (){

    },
    snakeMovement: function (){
        window.addEventListener("keydown", checkKeyPress, false);
        function checkKeyPress(key){
            let displayMove = document.getElementById("testMovement");
            if(key.keyCode == "65" && displayMove.innerText !== "d"){
                displayMove.innerText = "a";
                return "a";
            } else if(key.keyCode == "83" && displayMove.innerText !== "w"){
                displayMove.innerText = "s";
                return "s";
            } else if(key.keyCode == "68" && displayMove.innerText !== "a"){
                displayMove.innerText = "d";
                return "d";
            } else if(key.keyCode == "87" && displayMove.innerText !== "s"){
                displayMove.innerText = "w";
                return "w";
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