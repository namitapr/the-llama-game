// canvas creation
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// some vars
var dx = 2;
var dy = -2;
var play = true;
var timeLeft = 12000;
var enemiesLeft = 5;

// background
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "../images/background.png";

// luffy
var hReady = false;
var hImage = new Image();
hImage.onload = function(){
	hReady = true;
};
hImage.src = "../images/llama.png";

// enemies
var eReady = false;
var eImage = new Image();
eImage.onload = function(){
	eReady = true;
};
eImage.src = "../images/knight.png";

// game objects
var hero = {
	speed: 256,
	x: 0,
	y: 0
};
var enemy = {
	x: 0,
	y: 0
};

// keyboard controls
var keysDown = {};

addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

// Reset the game
var reset = function(){
	if(enemiesLeft < 1){
		alert("Congratulations!! You captured all the enemies!");
		finish(1);
	}

	hero.x = canvas.width/2;
	hero.y = canvas.height/2;

	//enemy at random loc
	enemy.x = 32 + (Math.random()*(canvas.width-64));
	enemy.y = 32 + (Math.random()*(canvas.height-64));
};

// update objects
var update = function(modifier){
	//coordinates
	if(enemy.x+dx>canvas.width-32 || enemy.x+dx<32){
			dx=-dx;
	}
	if(enemy.y+dy>canvas.height-32 || enemy.y+dy<32){
		dy=-dy;
	}

	//up
	if (38 in keysDown){
		hero.y -= hero.speed*modifier;
		enemy.x += dx;
		enemy.y += dy;
	}
	//down
	if (40 in keysDown){
		hero.y += hero.speed*modifier;
		enemy.x += dx;
		enemy.y += dy;
	}
	//left
	if (37 in keysDown){
		hero.x -= hero.speed*modifier;
		enemy.x += dx;
		enemy.y += dy;
	}
	//right
	if (39 in keysDown){
		hero.x += hero.speed*modifier;
		enemy.x += dx;
		enemy.y += dy;
	}

	//collision?
	if(
		hero.x <= (enemy.x + 32)
		&& enemy.x <= (hero.x + 32)
		&& hero.y <= (enemy.y + 32)
		&& enemy.y <= (hero.y + 32)
	) {
		--enemiesLeft;
		reset();
	}

};

//draw everything
var render = function() {
	//image rendering
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if(hReady){
		ctx.drawImage(hImage, hero.x, hero.y);
	}
	if(eReady){
		ctx.drawImage(eImage, enemy.x, enemy.y);
	}

	// Score
	var score = enemiesLeft;
	ctx.fillStyle = "black";
	ctx.font = "24px garamond";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Enemies left: " + score, 32, 32);
};

//finish
function finish(input){
	play = false;
    var c = document.getElementById('myCanvas');
    c.style.display = "none";

    var s4 = document.getElementById('s4');
    var s5 = document.getElementById('s5');
    
    if (enemiesLeft<1){
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

// main loop
var main = function (timer){
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	if(timeLeft > 0 && play){
		drawTimeLeft();
		requestAnimationFrame(main);
	} else if(timeLeft <= 0) {
		alert("Oh-oh! It looks like you ran out of time... GAME OVER");
		finish(2);
	}

};

var startTime;
var currentTime;

function drawTimeLeft(){
	var elapsed=parseInt((new Date() - startTime)/1000);
	timeLeft = 30-elapsed;
	ctx.save();
	ctx.font = "24px garamond";
	ctx.fillText("Time left: " + timeLeft, canvas.width-170, 32);
	ctx.restore();
}

var then = Date.now();
startTime = new Date();
reset();
main();

function revealNext(input){
    var s2 = document.getElementById('s2');
    var s3 = document.getElementById('s3');
    
    if(input == 2){
		s1.style.display = 'none';
		s2.style.display = 'block';
		s3.style.display = 'none';
	} else {
		s1.style.display = 'none';
		s2.style.display = 'none';
		s3.style.display = 'block';
	}

    $('p').hide().fadeIn(2000);
    $('button').hide().fadeIn(2000);
}

function toNextGame(){
    location.href = "enemycapture.html";
}