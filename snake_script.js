var gameEnd = false;
var speed = 100;
var direction = "right"
var score = 0;

var snakeLength = 1;

var snake = document.getElementById("snake");
var snakeLeft = 100;
var snakeTop = 100;

var goal = document.getElementById("goal");
var goalTop = Math.floor((Math.random() * 500) + 80);
var goalLeft = Math.floor((Math.random() * 490) + 20);
goalTop = Math.floor(goalTop / 10) * 10;
goalLeft = Math.floor(goalLeft / 10) * 10;
goal.style.top = goalTop + "px";
goal.style.left = goalLeft + "px";


function drawBoard() {
	console.log("hello");
	for (i = 0; i < 2500; i++) { 
    	var div = document.createElement("div");
		div.style.width = "10px";
		div.style.height = "10px";
		div.style.outline = "1px solid";
		div.style.float = "left";
		div.style.background = "rgba(255,0,0,.5)";
		document.getElementById("board").appendChild(div);
	}
}


function leftMove() {
	snakeLeft-=10;
    snake.style.left = snakeLeft + "px";
    follow();
}

function topMove() {
	snakeTop-=10;
    snake.style.top = snakeTop + "px";
    follow();
}

function rightmove() {
	snakeLeft+=10;
    snake.style.left = snakeLeft + "px";
    follow();
}

function downMove() {
	snakeTop+=10;
    snake.style.top = snakeTop + "px";
    follow();
}

function goalHit(){
	if(snakeTop == goalTop && snakeLeft == goalLeft){
    	goalTop = Math.floor((Math.random() * 500) + 80);
    	goalLeft = Math.floor((Math.random() * 490) + 20);
    	goalTop = Math.floor(goalTop / 10) * 10;
    	goalLeft = Math.floor(goalLeft / 10) * 10;
    	goal.style.top = goalTop + "px";
		goal.style.left = goalLeft + "px";
		document.getElementById("score").innerHTML = score+=10;
		grow();
		speed-=2;
    }
}

function grow(arg) {
	var div = document.createElement("div");
	div.style.width = "10px";
	div.style.height = "10px";
	var color = "rgb(" + (Math.floor((Math.random() * 255) + 0)) + "," + (Math.floor((Math.random() * 255) + 0)) + "," + (Math.floor((Math.random() * 255) + 0)) + ")";
	div.style.background = color;
	switch (direction) {
        case "left":
            div.style.top = document.getElementById("snake").style.top;
			div.style.left = parseInt(document.getElementById("snake").style.left) - 10 + "px";
            break;
        case "top":
        	div.style.top = parseInt(document.getElementById("snake").style.top)  - 10 + "px";
			div.style.left = document.getElementById("snake").style.left;
            break;
        case "right":
            div.style.top = document.getElementById("snake").style.top;
			div.style.left = parseInt(document.getElementById("snake").style.left)  - 10 + "px";
            break;
        case "down":
            div.style.top = parseInt(document.getElementById("snake").style.top)  - 10 + "px";
			div.style.left = document.getElementById("snake").style.left;
            break;
    }
	div.style.position = "absolute";
	div.id = "snake" + snakeLength;
	snakeLength++;
	document.body.appendChild(div);
}

function follow() {
	var tempTop = document.getElementById("snake").style.top;
	var tempLeft = document.getElementById("snake").style.left;
	var tempTopI = tempTop;
	var tempLeftI = tempLeft;
	
	for (i = 1; i < snakeLength; i++) { 
		var tempTopI = document.getElementById("snake" + i).style.top;
		var tempLeftI = document.getElementById("snake" + i).style.left;

	    document.getElementById("snake" + i).style.top = tempTop;
	    document.getElementById("snake" + i).style.left = tempLeft; 

	    tempTop = tempTopI;
	    tempLeft = tempLeftI;
	}
}

function gameOver() {
	if(snakeLeft > 500){
		gameEnd = true;
    	alert("GameOver");
    }
    if(snakeLeft < 10){
    	gameEnd = true;
    	alert("GameOver");
    }
    if(snakeTop > 570){
    	gameEnd = true;
    	alert("GameOver");
    }
    if(snakeTop < 80){
    	gameEnd = true;
    	alert("GameOver");
    }
    for (i = 2; i < snakeLength; i++) { 
    	if(document.getElementById("snake").style.top == document.getElementById("snake" + i).style.top && document.getElementById("snake").style.left == document.getElementById("snake" + i).style.left){
    		gameEnd = true;
    		alert("GameOver");
    	}
	}
}
var begin = true;
function gameLoop() {
	if(begin){
		drawBoard();
		begin = false;
	}

	moveSelection();
	if (!gameEnd){
    	setTimeout("gameLoop()", speed);
    }
}

function moveSelection() {
	switch (direction) {
        case "left":
            leftMove();
            goalHit();
            gameOver();
            break;
        case "top":
        	topMove();
            goalHit();
            gameOver();
            break;
        case "right":
            rightmove();
            goalHit();
            gameOver();
            break;
        case "down":
            downMove();
         	goalHit();
         	gameOver();
            break;
    }
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
        	if(direction != "right"){
        		direction = "left";
        	}
            break;
        case 38:
        	if (direction != "down") {
        		direction = "top";
        	}
            break;
        case 39:
           	if (direction != "left") {
        		direction = "right";
        	}
            break;
        case 40:
            if (direction != "top") {
        		direction = "down";
        	}
            break;
    }
};