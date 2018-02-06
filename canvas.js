var canvas, ctx;
var ballX = 50; 
var bally = 50; 
var ballSpeedX = 10;
var ballSpeedY = 4;
var stick1Y = 250;
var stick2Y = 250;
var paddleHeight = 100;
var paddle2Height = 100 
var paddleWidth = 10;
var score1 = 0;
var score2 = 0;
var chickenDinner = 3;
var winScreen = false;
var is2Playas = false


// mouse movement
function calculateMousePos (evt){
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return {
				x:mouseX,
				y:mouseY
		};

}

function restartClick(evt){
	if (winScreen){
		score1 = 0;
		score2 = 0;
		winWinScreen = false;
	}
}
window.onload = function () {
	document.getElementById('title').style.display = 'block';
	// document.getElementById('gameDiv').style.display = 'none';
}

document.getElementById('start-game-button').onclick = function (e) {
		canvas = document.getElementById('gameCanvas');		
		ctx = canvas.getContext('2d');

		document.getElementById('title').style.display = 'none';
		// document.getElementById('gameDiv').style.display = 'block';

		console.log(document.querySelector('input[name="cuantosPlayas"]:checked').value);

		var framesPerSecond = 30;
		setInterval(function (){
			moveEverything();
			drawEverything();
		}, 1000/framesPerSecond);

		canvas.addEventListener('mousemove', function (evt) {
			var mousePos = calculateMousePos(evt);
			stick1Y = mousePos.y-(paddleHeight*0.5);

		canvas.addEventListener('mousedown', restartClick)

		});
}



	function callBoth(){
		moveEverything();
		drawEverything();

	}

	function AIBaby(){
//tricky tricky - want it to aim for the center of the stick - take away the plus/minus
		var rtStickCenter = stick2Y + (paddleHeight*0.5);
		if (rtStickCenter < bally-35) {
			stick2Y += 6;
		}else if (stick2Y > bally + 35){
			stick2Y -= 6;
			}
		}


	// bodies in motion
	function moveEverything(){
		// AIBaby();
		keysWork()
		ballX += ballSpeedX;
		bally += ballSpeedY;
			
		if (ballX < 0){

//need to know if ball is above the bottom and below the top of the paddle 
// we add paddleHeight to get the bottom because Y goes down as it increases
// if ball hits below zero and is not between the the paddle Y then score, check winner, and reset.
			if( bally > stick1Y && bally < stick1Y + paddleHeight) {
				ballSpeedX = - ballSpeedX;

					var deltaY = bally -(stick1Y + paddleHeight/2);
					ballSpeedY =deltaY * 0.35;
			} else{
				score2 ++;
				ballReset();
			}
		}
		if (ballX > canvas.width){
			if( bally > stick2Y && bally < stick2Y + paddleHeight) {
				ballSpeedX = - ballSpeedX;
				var deltaY = bally-(stick2Y + paddleHeight/2);
					ballSpeedY =deltaY * 0.35;
			} else{
				score1 ++;
				ballReset();
			}
		}

// below is to make sure the ball doesn't go above or below the ceiling or floor. 
		if (bally<0){
			ballSpeedY = -ballSpeedY;
		}
		if (bally > canvas.height){
			ballSpeedY = -ballSpeedY;
		}

	}
	

	function drawCenterLine () {
		for (var i=0;i<canvas.height; i+=40){
// -1 on the x coordinate because 2px width line so push the line off-center by half the width
// use hangman line method
			drawBox (canvas.width/2-1, i, 2, 20, 'white');
		}
	}

	function drawEverything(){

		// black canvas
		drawBox(0, 0, canvas.width, canvas.height, 'black');

		if (winScreen){
			ctx.fillStyle = 'white';
			if (score1 >= chickenDinner) {
				ctx.fillText("Human prevails", (canvas.width/2-100), 200);
				ctx.font="30px Arial";
			}else if (score2 >= chickenDinner) {
				ctx.fillText("You have been terminated!!!!",(canvas.width/2-100), 200);
				ctx.font="30px Arial";
			}
			
			ctx.fillText("click to continue", (canvas.width/2-100), 400);
//break is used when you want to exit from loop, while return is used to go back to the step where it was called or to stop further execution.

			return;
		}

		// center line
		drawCenterLine ();
		// the ball baby
		drawCircle(ballX, bally, 10,'green');
				

		// left side paddle - player 1 - mouse
		drawBox(0, stick1Y, paddleWidth, paddleHeight, 'white');
		// Right side paddle - player 2 -subtract the width of the paddle
		drawBox(canvas.width-paddleWidth, stick2Y, paddleWidth, paddle2Height, 'white');
		
		ctx.fillText(score1, 100, 100);
		ctx.fillText(score2, canvas.width-100, 100);

	}



		


		function drawBox(bx, by, width, height, drawColor){
		ctx.fillStyle = drawColor;
		ctx.fillRect(bx, by, width, height);
	}


	//cirlce's have an x,y located at their center
	function drawCircle(cx, cy, radius, drawColor){
		ctx.fillStyle = drawColor;
		ctx.beginPath();
		ctx.arc(cx, cy, radius, 0, Math.PI*2, true);
		ctx.fill();		

}

// function for ball to reset after score
function ballReset (){
	if (score1 >= chickenDinner || score2 >= chickenDinner) {
		// score1 = 0;
		// score2 = 0;
		winScreen = true;
	}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;

}



// function moveArrows(e){
// 	// alert(e.keyCode)
// // 38 = up arrow key
// 	if (e.keyCode = 38){
// 		stick2Y +=6;
// 	}
// // 40 = down arrow key
// 	if (e.keyCode = 40){
// 		stick2Y-= 6;
// 	}
// 	canvas.height=canvas.height;
// 	ctx.
// }

// document.onkeydown = moveArrows;
function keysWork(){
	document.addEventListener('keydown', function (evt){
	var keyPress = String.fromCharCode(evt.keyCode);
	if(keyPress == "L"){
		stick2Y += 15;
	} else if(keyPress == "P"){
		stick2Y -= 15;
	}
});
}




