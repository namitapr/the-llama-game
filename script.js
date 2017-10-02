$(document).ready(function(){
	$('p').hide().fadeIn(2000);
	$('#nextB').hide().fadeIn(2000);
});

function revealNext(input){
	var s1 = document.getElementById('s1');
	var s2 = document.getElementById('s2');
	var s3 = document.getElementById('s3');
	var s4 = document.getElementById('s4');
	var s5 = document.getElementById('s5');
	var s6 = document.getElementById('s6');
	var s7 = document.getElementById('s7');
	var bt1 = document.getElementById('nextB');

	switch(input){
		case 2:
			s1.style.display = 'none';
			s2.style.display = 'block';
			s3.style.display = 'none';
			s4.style.display = 'none';
			s5.style.display = 'none';
			s6.style.display = 'none';
			$('p').hide().fadeIn(2000);
			$('button').hide().fadeIn(2000);
			break;
		case 3:
			s1.style.display = 'none';
			s2.style.display = 'none';
			s3.style.display = 'block';
			s4.style.display = 'none';
			s5.style.display = 'none';
			s6.style.display = 'none';
			$('p').hide().fadeIn(2000);
			$('button').hide().fadeIn(2000);
			break;
		case 4:
			s1.style.display = 'none';
			s2.style.display = 'none';
			s3.style.display = 'none';
			s4.style.display = 'block';
			s5.style.display = 'none';
			s6.style.display = 'none';
			$('p').hide().fadeIn(2000);
			$('button').hide().fadeIn(2000);
			break;
		case 5:
			s1.style.display = 'none';
			s2.style.display = 'none';
			s3.style.display = 'none';
			s4.style.display = 'none';
			s5.style.display = 'block';
			s6.style.display = 'none';
			$('p').hide().fadeIn(2000);
			$('button').hide().fadeIn(2000);
			break;
		case 6:
			s1.style.display = 'none';
			s2.style.display = 'none';
			s3.style.display = 'none';
			s4.style.display = 'none';
			s5.style.display = 'none';
			s6.style.display = 'block';
			$('p').hide().fadeIn(2000);
			$('button').hide().fadeIn(2000);
			break;
		case 9:
			s1.style.display = 'none';
			s2.style.display = 'none';
			s3.style.display = 'none';
			s4.style.display = 'none';
			s5.style.display = 'none';
			s6.style.display = 'none';
			s7.style.display = 'block';
			var nb1 = document.getElementById('nextB1');
			nb1.style.display = 'inline-block';

			$('p').hide().fadeIn(2000);
			$('button').hide().fadeIn(2000);
			break;
		default:
			s1.style.display = 'none';
			s2.style.display = 'none';
			s3.style.display = 'none';
			s4.style.display = 'none';
			s5.style.display = 'none';
			s6.style.display = 'none';
			bt1.style.display = 'none';
			toTask(1);
	}
}

function toTask(input){
	switch(input){
		case 1:
			location.href = "task1/intro.html";
			break;
		case 2:
			location.href = "../task2/intro.html";
			break;
		case 3:
			location.href = "../task3/intro.html";
			break;
		default:
			location.href = "../ending.html";
	}
}

function toGame(input){
	switch(input){
		case 1:
			location.href = "brickbreak.html";
			break;
		case 2:
			location.href = "enemycapture.html";
			break;
		case 3:
			location.href = "enemyinvasion.html";
			break;
		default:
			location.href = "../start.html";;
	}
}