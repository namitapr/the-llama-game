$(document).ready(function(){
	var nb1 = document.getElementById('nb1');
	$(nb1).hide();
});

var nextDoc = false;
if(nextDoc){
	var s1 = document.getElementById('s1');
	s1.style.display = 'none';
}

// canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// some vars
var targetRadius = 30;
var dx = 5;
var dy = -5;
var targetsLeft = 10;
var alliesLeft = 5;
var target;
var arrow;
var bow;
var keysDown = {};
var play = true;
var interval;
var arrowY;

// graphics
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "../images/background.png";

var tR = false;
var tImg = new Image();
tImg.onload = function(){
	tR = true;
};
tImg.src = "../images/knight.png";

var aR = false;
var aImg = new Image();
aImg.onload = function(){
	aR = true;
};
aImg.src = "../images/projectiles.png";

var bR = false;
var bImg = new Image();
bImg.onload = function(){
	bR = true;
};
bImg.src = "../images/bow.png";

var lR = false;
var lImg = new Image();
lImg.onload = function(){
	lR = true;
};
lImg.src = "../images/llama.png";

// objects
target = {x:0, y:0};
arrow = {x:0, y:0};
bow = {x:32, y:canvas.height-95};
llama = {x:0, y:0};

// keyboard control
addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

// object update
function moveArrow(){
	interval = setInterval(function(){
		var i=bow.x+44, j=canvas.height-10;

		return function animate(){
			if(j>20){
				ctx.clearRect(arrow.x, arrow.y, 10, 30);
				ctx.drawImage(aImg, i, j);
				arrowY = j;
				j -= 1;
				if(score()){
					j=10;
				}
			}
		};
	}(), 1);
}

function score(){
	if(arrowY < llama.y && arrow.x < llama.x+32 && arrow.x > llama.x-32){
		alliesLeft--;
		reset();
		return 1;
	} else if (arrowY < target.y && arrow.x < target.x+32 && arrow.x > target.x-32){
		targetsLeft--;
		reset();
		return 1;
	}
	return 0;
}

// reset
var reset = function(){
	// target at random loc
	target.x = (Math.random()*(canvas.width-64));
	target.y = 32 + (Math.random()*(canvas.height-300));

	// llama at random loc
	llama.x = (Math.random()*(canvas.width-64));
	llama.y = 32 + (Math.random()*(canvas.height-300));
}


// update
var update = function(){
	//left
	if (37 in keysDown && bow.x+dx > 0){
		bow.x -= dx;
	}
	//right
	if (39 in keysDown && bow.x+dx < canvas.width){
		bow.x += dx;
	}
	//spacebar
	if (32 in keysDown){
		arrowDone = false;
		arrow.x = bow.x;
		arrow.y = canvas.height-10;
		moveArrow();
	}
};

// render
var render = function() {
	//image rendering
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	if(tR){
		ctx.drawImage(tImg, target.x, target.y);
	}
	if(aR){
		ctx.drawImage(aImg, arrow.x, arrow.y);
	}
	if(bR){
		ctx.drawImage(bImg, bow.x, bow.y);
	}
	if(lR){
		ctx.drawImage(lImg, llama.x, llama.y);
	}

	// Targets left
	ctx.fillStyle = "black";
	ctx.font = "24px garamond";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Enemies left: " + targetsLeft, 32, 32);
	ctx.fillText("Llamas left: " + alliesLeft, canvas.width-170, 32);
};

//finish
function finish(input){
	play = false;
	var c = document.getElementById('myCanvas');
	c.style.display = "none";

	if (input == 1){
	    revealNext(2, 2);
	} else {
	    revealNext(5, 2);
	}
}

// main loop
var main = function (){
	update();
	render();

	if(alliesLeft>0 && targetsLeft>0){
		requestAnimationFrame(main);
	} else if(alliesLeft == 0) {
		alert("You killed all the llamas you monster! GAME OVER...");
		finish(2);
	} else if(targetsLeft == 0){
		alert("You defeated all the enemies... CONGRATULATIONS!");
		finish(1);
	}

};

reset();
main();

function revealNext(input, part){
	var s2 = document.getElementById('s2');
	var s3 = document.getElementById('s3');
	var s4 = document.getElementById('s4');
	var s5 = document.getElementById('s5');
	var s6 = document.getElementById('s6');
	var s7 = document.getElementById('s7');
	var s8 = document.getElementById('s8');
	var nb1 = document.getElementById('nextB1');
	var bt1 = document.getElementById('nextB');

	if(part == 1){
		var s1 = document.getElementById('s1');
		s1.style.display = 'none';
	}

	s2.style.display = 'none';
	s3.style.display = 'none';
	s4.style.display = 'none';
	nb1.style.display = 'none';

	if(input == 2){
		s2.style.display = 'block';
	} else if (input == 3){
		s3.style.display = 'block';
	} else if (input == 4){
		s4.style.display = 'block';
	} else if (input == 5){
		s5.style.display = 'block';
		s6.style.display = 'none';
		s7.style.display = 'none';
		s8.style.display = 'none';
	} else if (input == 6){
		s6.style.display = 'block';
		s5.style.display = 'none';
		s7.style.display = 'none';
		s8.style.display = 'none';
	} else if (input == 7){
		s5.style.display = 'none';
		s6.style.display = 'none';
		s7.style.display = 'block';
		s8.style.display = 'none';
	} else if (input == 8){
		s5.style.display = 'none';
		s6.style.display = 'none';
		s7.style.display = 'none';
		s8.style.display = 'block';
		nb1.style.display = 'inline-block';
		$(nb1).show();
	}

	$('p').hide().fadeIn(2000);
	$('button').hide().fadeIn(2000);
}

function toNextGame(){
    nextDoc = true;
    location.href = "enemyinvasion.html";
}

function toEnd(){
	location.href = "../ending.html";
}
