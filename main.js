var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var sizeInput = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var newGame = document.getElementById('new-game');
var scoreLabel = document.getElementById('score');
var score = 0;
var size = 4;
var cells = [];

canvas.width = 400;
canvas.height = 400;
var width = canvas.width / size - 5;
var fontSize;
var loss = false;

createCells();
drawAllCells();


//changer la taille du jeu 
changeSize.onclick = function () {
	if (sizeInput.value >= 2 && sizeInput.value <= 20) {
		size = sizeInput.value;
		width = canvas.width / size - 6;
		console.log(sizeInput.value);
		canvasClean();
		startGame();
	}
}

//Lance une partie 
newGame.onclick = function () {
	startGame();
}

//Fonction qui permet de crée un objet cell en lui attribuant une valeur et ces coordonnées
function cell(row, coll) {
	this.value = 0;	
	this.x = coll * width + 5 * (coll + 1); //On calcul les coordonnées x et y de la case
	this.y = row * width+ 5 * (row + 1);
}

//Rempli le tableau cells
function createCells(){
	for(var i =0; i < size; i++){
		cells[i]= [];
		for (var j = 0; j < size; j++){
			cells[i][j] = new cell(i, j);
		}
	}
}

//Dessine une cellule
function drawCell(cell){

	context.beginPath();
	context.rect(cell.x, cell.y, width, width);

	switch (cell.value){
		case 0 : context.fillStyle = '#A9A9A9'; break;
		case 2 : context.fillStyle = '#e6abcb'; break;
		case 4 : context.fillStyle = '#e27baa'; break;
		case 8 : context.fillStyle = '#de4983'; break;
		case 16 : context.fillStyle = '#d52049'; break;
		case 32 : context.fillStyle = '#ae1b47'; break;
		case 64 : context.fillStyle = '#e535b1'; break;
		case 128 : context.fillStyle = '#c92794'; break;
		case 256 : context.fillStyle = '#a31f75'; break;
		case 512 : context.fillStyle = '#87175f'; break;
		case 1024 : context.fillStyle = '#961651'; break;
		case 2048 : context.fillStyle = '#1E90FF'; break;
		case 4096 : context.fillStyle = '#87175f'; break;
		default : context.fillStyle = '#ff0080';
	}

	context.fill();

	if(cell.value){
		fontSize = width / 2;
		context.font = fontSize + 'px Arial';
		context.fillStyle = 'black';
		context.textAlign = 'center';
		context.fillText(cell.value, cell.x + width/2, cell.y + width /2 + width/7);
	}
}

//Dessine la grille
function drawAllCells (){
	var i, j;

	for(i=0; i < size; i++){
		for(j=0; j < size; j++){
			drawCell(cells[i][j]);
		}
	}
}


function canvasClean() {
	context.clearRect(0, 0, 500, 500);
}


document.onkeydown = function (event) {
	if (!loss) {
		if (event.keyCode === 38 || event.keyCode === 87) {
			moveUp(); 
		} else if (event.keyCode === 39 || event.keyCode === 68) {
			moveRight();
		} else if (event.keyCode === 40 || event.keyCode === 83) {
			moveDown(); 
		} else if (event.keyCode === 37 || event.keyCode === 65) {
			moveLeft(); 
		}
		scoreLabel.innerHTML = 'Score : ' + score;
	}
}

function startGame() {
	createCells();
	drawAllCells();
	pasteNewCell();
	pasteNewCell();

	score = 0;
	scoreLabel.innerHTML = 'Score : ' + score;
	canvas.style.opacity = '1';
	loss = false;
}

function finishGame() {
	canvas.style.opacity = '0.5';
	loss = true;
}

function drawAllCells() {
	var i, j;
	for(i = 0; i < size; i++) {
		for(j = 0; j < size; j++) {
			drawCell(cells[i][j]);
		}
	}
}

function pasteNewCell() {
	var countFree = 0;
	var i, j;
	for(i = 0; i < size; i++) {
		for(j = 0; j < size; j++) {
			if(!cells[i][j].value) {
				countFree++;
			}
		}
	}
	if(!countFree) {
		finishGame();
		return;
	}
	while(true) {
		var row = Math.floor(Math.random() * size);
		var coll = Math.floor(Math.random() * size);
		if(!cells[row][coll].value) {
			cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
			drawAllCells();
			return;
		}
	}
}

function moveRight () {
	var i, j;
	var coll;
	for(i = 0; i < size; i++) {
		for(j = size - 2; j >= 0; j--) {
			if(cells[i][j].value) {
				coll = j;
				while (coll + 1 < size) {
					if (!cells[i][coll + 1].value) {
						cells[i][coll + 1].value = cells[i][coll].value;
						cells[i][coll].value = 0;
						coll++;
					} else if (cells[i][coll].value == cells[i][coll + 1].value) {
						cells[i][coll + 1].value *= 2;
						score +=  cells[i][coll + 1].value;
						cells[i][coll].value = 0;
						break;
					} else {
						break;
					}
				}
			}
		}
	}
	pasteNewCell();
}

function moveLeft() {
	var i, j;
	var coll;
	for(i = 0; i < size; i++) {
		for(j = 1; j < size; j++) {
			if(cells[i][j].value) {
				coll = j;
				while (coll - 1 >= 0) {
					if (!cells[i][coll - 1].value) {
						cells[i][coll - 1].value = cells[i][coll].value;
						cells[i][coll].value = 0;
						coll--;
					} else if (cells[i][coll].value == cells[i][coll - 1].value) {
						cells[i][coll - 1].value *= 2;
						score +=   cells[i][coll - 1].value;
						cells[i][coll].value = 0;
						break;
					} else {
						break; 
					}
				}
			}
		}
	}
	pasteNewCell();
}

function moveUp() {
	var i, j, row;
	for(j = 0; j < size; j++) {
		for(i = 1; i < size; i++) {
			if(cells[i][j].value) {
				row = i;
				while (row > 0) {
					if(!cells[row - 1][j].value) {
						cells[row - 1][j].value = cells[row][j].value;
						cells[row][j].value = 0;
						row--;
					} else if (cells[row][j].value == cells[row - 1][j].value) {
						cells[row - 1][j].value *= 2;
						score +=  cells[row - 1][j].value;
						cells[row][j].value = 0;
						break;
					} else {
						break; 
					}
				}
			}
		}
	}
	pasteNewCell();
}

function moveDown() {
	var i, j, row;
	for(j = 0; j < size; j++) {
		for(i = size - 2; i >= 0; i--) {
			if(cells[i][j].value) {
				row = i;
				while (row + 1 < size) {
					if (!cells[row + 1][j].value) {
						cells[row + 1][j].value = cells[row][j].value;
						cells[row][j].value = 0;
						row++;
					} else if (cells[row][j].value == cells[row + 1][j].value) {
						cells[row + 1][j].value *= 2;
						score +=  cells[row + 1][j].value;
						cells[row][j].value = 0;
						break;
					} else {
						break; 
					}
				}
			}
		}
	}
	pasteNewCell();
}