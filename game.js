
  
    
   

 

window.onload = init;
window.onmousemove = moveBoard;
var canvas;
var ctx;
var cW = 1000;
var cH = 800;

var bg, ball, board;

var boardX = 350;
var boardY = 700;

var ballX = 350;
var ballY = 300;

var vx = 12;
var vy = 12;

var rects = [];

function init() {
	trace("The game is ready!");
	canvas = document.getElementById("canvas");
	canvas.width = cW;
	canvas.height = cH;
	ctx = canvas.getContext("2d");
	if(!ctx) {
		return false;
	}
	bg = addImg("assets/bg.png");
	ball = addImg("assets/ball.png");
	board = addImg("assets/board.png");
	createRect();

	setInterval(gameInterval, 1000 / 60);
}

function isHitobj(x, y, w, h, a, b) {
	if(a > x && b > y && a < x + w && b < y + h) {
		return true;
	} else {
		return false;
	}
}

function textHitboard() {
	var hit = isHitobj(boardX, boardY - ball.height, board.width + ball.width, board.height, ballX, ballY);
	if(hit) {
		vy *= -1;

	}
}
//function createRect(){
//	for(var i = 0;i<6; i++){
//		var img = addImg("assets/1.png");
//		var obj = {item:img,x:(150+10)*i+20};
//		rects.push(obj);
//	}
//	drawRect();
//}
//function drawRect(){
//	 var l = rects.length;
//	 for(var i =0; i<1; i++){
//	 	var item=rects[i];
//	 	ctx,drawImage(item.item,item.x,20);
//	 }
//}
function addImg(src) {
	var img = new Image();
	img.src = src;
	return img;
	createRect()
	drawRect()
}

function createRect() {
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 6; j++) {
			var num = Math.ceil(Math.random() * 6);
			var str = "assets/" + num + ".png";
			var img = addImg(str);
			var obj = {
				item: img,
				x: (150 + 20) * j + 20,
				y: i * 60 + 30
			};
			rects.push(obj);

		}
	}

}
//画到画布上；
function drawRect() {

	for(var i = 0; i < rects.length; i++) {
		ctx.drawImage(rects[i].item, rects[i].x, rects[i].y)

	}

}

//碰撞清除

function hitRect() {
       for (var i = 0; i < rects.length; i++) {
           var item=rects[i];
          
           try{
               var hit=isHitobj(rects[i].x,rects[i].y,rects[i].item.width,rects[i].item.height,ballX,ballY);
               if (hit) {
                   rects.splice(i,1);
                   vy *= -1;
               }
           }
           catch(e){
               trace(e.toString());
           }
       }
}


function gameInterval() {
	clearCanves();
	ctx.drawImage(bg, 0, 0);
	moveBall();
	ctx.drawImage(board, boardX, boardY);
	drawRect();
	

}

function clearCanves() {
	ctx.clearRect(0, 0, cW, cH);
}

function moveBoard(e) {
	if(e.x < cW - board.width / 2 && e.x > board.width / 2) {
		boardX = e.x - board.width / 2;
	}
}

function moveBall() {
	ballX += vx;
	ballY += vy;
	if(ballX < 0) {
		ballX = 0;
		vx *= -1
	} else if(ballX > cW - ball.width) {
		ballX = cW - ball.width
		vx *= -1
	}
	if(ballY < 10) {
		ballY = 10;
		vy *= -1
	} else if(ballY > cH - ball.height) {
		ballY = cH - ball.height;
		vy *= -1
	}
ctx.drawImage(ball, ballX, ballY);
	hitRect()
 
    textHitboard()
	
}

function trace(msg) {
	console.log(msg);
}

