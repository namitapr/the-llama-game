$(document).ready(function(){
    $('p').hide().fadeIn(2000);
    $('#nextB').hide().fadeIn(2000);
});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 5;
var dy = -5;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var play = true;

var bricks = [];
for(c=0; c<brickColumnCount; c++){
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++){
		bricks[c][r] = {x:0, y:0, status: 1};
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBackground(){
    var bgImg = new Image();
    bgImg.src = "../images/brickback.png";
    ctx.beginPath();
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

function drawBall(){
	ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "goldenrod";
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "cyan";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
}

function drawBricks() {
    
    // bImage.width = brickWidth;
    // bImage.height = brickHeight;

    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1){
	            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
	            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
	            bricks[c][r].x = brickX;
	            bricks[c][r].y = brickY;
                var bReady = false;
                var bImage = new Image();
                bImage.onload = function(){
                    bReady = true;
                };
                bImage.src = "../images/brick.png";
                ctx.drawImage(bImage, brickX, brickY, brickWidth, brickHeight);
	            // ctx.beginPath();
	            // ctx.rect(brickX, brickY, brickWidth, brickHeight);
	            // ctx.fillStyle = "firebrick";
	            // ctx.strokeStyle = "black";
	            // ctx.fill();
	            // ctx.stroke();
            	// ctx.closePath();
        	}
        }
    }
}

function collisionDetection(){
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			var b=bricks[c][r];
			if(b.status == 1){
				if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount){
						alert("YOU WIN, CONGRATULATIONS!");
						finish(1);
					}
				}
			}
		}
	}
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "ivory";
	ctx.fillText("Score: " +score, 8, 20);
}

function drawLives(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "ivory";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function finish(input){
    play = false;
    var c = document.getElementById('myCanvas');
    c.style.display = "none";

    var s4 = document.getElementById('s4');
    var s5 = document.getElementById('s5');
    
    if (input == 1){
        s4.style.display = "block";
        s5.style.display = "none";
        $('p').hide().fadeIn(2000);
        $('button').hide().fadeIn(2000);
    } else {
        s4.style.display = "none";
        s5.style.display = "block";
        $('p').hide().fadeIn(2000);
        $('button').hide().fadeIn(2000);
    }
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x+dx>canvas.width-ballRadius || x+dx<ballRadius){
    	dx=-dx;
    }
    if(y+dy < ballRadius){
    	dy = -dy;
    } else if(y+dy > canvas.height-ballRadius){
    	if(x > paddleX && x < paddleX + paddleWidth){
    		dy = -dy;
    	} else {
    		lives--;
    		if(!lives){
    			alert("Sorry... GAME OVER!");
    			finish(2);
    		} else {
    			alert("Oh no! You lost a life... Don't worry, you still have " + lives + " left!");
    			x=canvas.width/2;
    			y=canvas.height-30;
    			dx=5;
    			dy=-5;
    			paddleX=(canvas.width-paddleWidth)/2;
    		}
    	}
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth){
    	paddleX += 7;
    } else if(leftPressed && paddleX > 0){
    	paddleX -= 7;
    }

    x += dx;
    y += dy;

    if(play){
        requestAnimationFrame(draw);
    }
}

draw();

function revealNext(){
    var s2 = document.getElementById('s2');
    s1.style.display = 'none';
    s2.style.display = 'block';
    $('p').hide().fadeIn(2000);
    $('button').hide().fadeIn(2000);
}

function toNextGame(){
    location.href = "brickbreak.html";
}