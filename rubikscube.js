var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;
var canvas = document.createElement('canvas');
canvas.id = "canvas";
canvas.setAttribute('width', bodyWidth);
canvas.setAttribute('height', bodyHeight);
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

//var times = parseInt(prompt("How many scrambles? "))
//var scramblelength = parseInt(prompt("How long should the scramble be? "));
var times = 1;
var scramblelength = 25;
var previous = -1;
var piece;
var movestr;
var result;

var large = false;
var autocorrect = false;

var prev;

var temp;
var side;
//STATE = WHITE, GREEN, YELLOW, BLUE, RED, ORANGE
var state = [];
var asdf = [];
function solvestate() {
	for (var i = 0; i < 6; i++) {
		asdf.push([]);
		for (var j = 0; j < 9; j++) {
			asdf[i].push(i+1);
		}
	}
	state = asdf;
	asdf = [];
}

function nothing() {
	//asdf
}

function stateprev(side, element, sider, elementr) {
	state[side][element] = prev[sider][elementr];
}

function rotateside(side) {
	stateprev(side, 0, side, 6);
	stateprev(side, 1, side, 3);
	stateprev(side, 2, side, 0);
	stateprev(side, 3, side, 7);
	stateprev(side, 5, side, 1);
	stateprev(side, 6, side, 8);
	stateprev(side, 7, side, 5);
	stateprev(side, 8, side, 2);
}

solvestate();
console.log(state);
var color_map = new Map();
color_map.set(1, 'white');
color_map.set(2, 'green');
color_map.set(3, 'yellow');
color_map.set(4, 'blue');
color_map.set(5, 'red');
color_map.set(6, 'orange');

var face_pos = [[200, 200], [200, 360], [200, 520], [520, 360], [360, 360], [40, 360]];

function deepcopy(item) {
	return JSON.parse(JSON.stringify(item));
}
prev = deepcopy(state);
function print(object) {
	console.log(object);
}

// face: array of 9 numbers
function drawface(ctx, face, x, y) {
	var blksize = 40;
	var blkspace = blksize + 10;
	ctx.font = '18px serif';
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			ctx.fillStyle = color_map.get(face[(i*3+j)]);
			ctx.fillRect(x+j*blkspace, y+i*blkspace, blksize, blksize);
			ctx.fillStyle = 'black';
			ctx.fillText(i*3+j, x+(j+0.3)*blkspace, y+(i+0.55)*blkspace);
		}
	}
}
function drawstate() {
	ctx.fillStyle = 'pink';
	ctx.fillRect(0, 0, 2000, 2000);
	for (var f = 0; f < 6; f++) {
		drawface(ctx, state[f], face_pos[f][0], face_pos[f][1]);
		console.log(state[f]);
	}
}

console.log(state);
console.log();
console.log("Rubik's Cube Scrambler");
console.log("Scramble the cube with green face on front and white on top.");
console.log();
drawstate();

function cuberotationU(rep) {
	for (let repper = 0; repper < rep; repper++) {
		prev = deepcopy(state);
		rotateside(0);
		stateprev(0, 8, 0, 2);
		for (var i = 0; i < 3; i++) {
			stateprev(1, i, 4, i);
			stateprev(4, i, 3, i);
			stateprev(3, i, 5, i);
			stateprev(5, i, 1, i);
		}
	}
	drawstate();
}

function cuberotationL(rep) {
	for (let repper = 0; repper < rep; repper++) {
		prev = deepcopy(state);
		rotateside(5);
		
		stateprev(1, 0, 0, 0);
		stateprev(1, 3, 0, 3);
		stateprev(1, 6, 0, 6);
		stateprev(0, 6, 3, 2);
		stateprev(0, 3, 3, 5);
		stateprev(0, 0, 3, 8);
		stateprev(3, 2, 2, 6);
		stateprev(3, 5, 2, 3);
		stateprev(3, 8, 2, 0);
		stateprev(2, 0, 1, 0);
		stateprev(2, 3, 1, 3);
		stateprev(2, 6, 1, 6);
	}
	drawstate();
}

function cuberotationF(rep) {
	for (let repper = 0; repper < rep; repper++) {
		prev = deepcopy(state);
		rotateside(1);
		
		stateprev(0, 6, 5, 8);
		stateprev(0, 7, 5, 5);
		stateprev(0, 8, 5, 2);
		stateprev(5, 2, 2, 0);
		stateprev(5, 5, 2, 1);
		stateprev(5, 8, 2, 2);
		stateprev(2, 0, 4, 6);
		stateprev(2, 1, 4, 3);
		stateprev(2, 2, 4, 0);
		stateprev(4, 0, 0, 6);
		stateprev(4, 3, 0, 7);
		stateprev(4, 6, 0, 8);
	}
	drawstate();
}

function cuberotationD(rep) {
	for (let repper = 0; repper < rep; repper++) {
		prev = deepcopy(state);
		rotateside(2);
		
		for (var i = 6; i < 9; i++) {
			stateprev(1, i, 5, i);
			stateprev(5, i, 3, i);
			stateprev(3, i, 4, i);
			stateprev(4, i, 1, i);
		}
	}
	drawstate();
}

function cuberotationR(rep) {
	for (let repper = 0; repper < rep; repper++) {
		prev = deepcopy(state);
		rotateside(4);
		
		stateprev(3, 0, 0, 8);
		stateprev(3, 3, 0, 5);
		stateprev(3, 6, 0, 2);
		stateprev(0, 8, 1, 8);
		stateprev(0, 5, 1, 5);
		stateprev(0, 2, 1, 2);
		stateprev(1, 2, 2, 2);
		stateprev(1, 5, 2, 5);
		stateprev(1, 8, 2, 8);
		stateprev(2, 2, 3, 6);
		stateprev(2, 5, 3, 3);
		stateprev(2, 8, 3, 0);
	}
	drawstate();
}

function cuberotationB(rep) {
	for (let repper = 0; repper < rep; repper++) {
		prev = deepcopy(state);
		rotateside(3);
		
		stateprev(5, 0, 0, 2);
		stateprev(5, 3, 0, 1);
		stateprev(5, 6, 0, 0);
		stateprev(0, 0, 4, 2);
		stateprev(0, 1, 4, 5);
		stateprev(0, 2, 4, 8);
		stateprev(4, 2, 2, 8);
		stateprev(4, 5, 2, 7);
		stateprev(4, 8, 2, 6);
		stateprev(2, 6, 5, 0);
		stateprev(2, 7, 5, 3);
		stateprev(2, 8, 5, 6);
	}
	drawstate();
}

//State = [white, green, yellow, blue, red, orange]
function statechange(command) {
	if (command.includes("'")) {
		if (command.includes("U")) {cuberotationU(3); }
		else if (command.includes("F")) {cuberotationF(3); }
		else if (command.includes("D")) {cuberotationD(3); }
		else if (command.includes("B")) {cuberotationB(3); }
		else if (command.includes("R")) {cuberotationR(3); }
		else if (command.includes("L")) {cuberotationL(3); }
	} else if(command.includes("2")) {
		if (command.includes("U")) {cuberotationU(2); }
		else if (command.includes("F")) {cuberotationF(2); }
		else if (command.includes("D")) {cuberotationD(2); }
		else if (command.includes("B")) {cuberotationB(2); }
		else if (command.includes("R")) {cuberotationR(2); }
		else if (command.includes("L")) {cuberotationL(2); }
	} else {
		if (command.includes("U")) {cuberotationU(1); }
		else if (command.includes("F")) {cuberotationF(1); }
		else if (command.includes("D")) {cuberotationD(1); }
		else if (command.includes("B")) {cuberotationB(1); }
		else if (command.includes("R")) {cuberotationR(1); }
		else if (command.includes("L")) {cuberotationL(1); }
	}
}
function scramble() {
	solvestate();
	result = [];
	for(let i = 0; i < scramblelength; i++) {
		//randomonizer and check if previous is not repeated by random
		do {
			piece = Math.floor(Math.random()*6);
		} while (piece == previous);
		previous = piece;
		switch(piece) {
			case 0:
				movestr = "U";
				break;
			case 1:
				movestr = "F";
				break;
			case 2:
				movestr = "D";
				break;
			case 3:
				movestr = "B";
				break;
			case 4:
				movestr = "R";
				break;
			case 5:
				movestr = "L";
				break
			default:
				console.log("Failure. A rare error 	occured.");
				break;
		}
		
		//this part lets 4x4x4 and 5x5x5 get scrambled.
		if (large) {
			if(autocorrect) {
				while (scramblelength < 31) {
					scramblelength++;
					if(scramblelength == 30) {
						console.log("Scramble length changed to 30.");
						console.log();
					}
				}
			}
			var thick = Math.floor(Math.random()*2)
			switch(thick) {
				case 0: break;
				case 1: movestr += "w"; break;
				default:
					console.log("A rare error occured.")
			}
		}

		//this part adds the direction (R2, R', or just R).
		let Num = Math.floor(Math.random()*3);
		switch(Num) {
			case 1:
			    movestr += "'";
				break;
			case 2: 
				movestr += "2";
				break;
		}
		//this part updates the list
		result.push(movestr);
		statechange(movestr);
	}
	console.log();
	console.log(result.join(" "));
	console.log();
	ctx.fillStyle = 'black';
	ctx.font = '18px serif';
	ctx.fillText(result.join(" "), 40, 700);
}
var num = 1;
document.addEventListener('mousedown', (e) => {
	num = 3;	
});
document.addEventListener('mouseup', (d) => {
	num = 1;
});


document.addEventListener('keydown', (event) => {
	console.log(event.code);
	if (event.code == 'KeyU') {
		cuberotationU(num);
	} else if (event.code == 'KeyF') {
		cuberotationF(num);
	} else if (event.code == 'KeyD') {
		cuberotationD(num);
	} else if (event.code == 'KeyB') {
		cuberotationB(num);
	} else if (event.code == 'KeyL') {
		cuberotationL(num);
	} else if (event.code == 'KeyR') {
		cuberotationR(num);
	} else if (event.code == 'Enter') {
		scramble();
	} else if (event.code == 'Space') {
		solvestate(); drawstate();
	}	
	ctx.font = '30px Serif';
	ctx.fillText('Press R, U, L, D, F, and B to turn a face clockwise.', 720, 200);
	ctx.fillText('Press space to reset cube, and press enter to scramble.', 700, 230);
	ctx.fillText('Hold mouse while pressing key to turn counterclockwise!', 680, 260);
});

ctx.font = '30px Serif';
ctx.fillText('Press R, U, L, D, F, and B to turn a face clockwise.', 720, 200);
ctx.fillText('Press space to reset cube, and press enter to scramble.', 700, 230);
ctx.fillText('Hold mouse while pressing key to turn counterclockwise!', 680, 260);
