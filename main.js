var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var size = 4;
var cells = [];

canvas.width = 500;
canvas.height = 505;
var cellWidth = canvas.width / size - 5;

startGame();

function startGame(){
	createCells();
	drawAllCells();
}


//Fonction qui permet de crée un objet cell en lui attribuant une valeur et ces coordonnées
function cell(row, coll) {
	this.value = 0;	
	this.x = coll * cellWidth + 5 * (coll + 1); //On calcul les coordonnées x et y de la case
	this.y = row * cellWidth + 5 * (row + 1);
}

//rempli le tableau cemms
function createCells(){
	for(var i =0; i < size; i++){
		cells[i]= [];
		for (var j = 0; j < size; j++){
			cells[i][j] = new cell(i, j);
		}
	}
}

//dessine une cellule
function drawCell(cell){

	context.beginPath();
	context.rect(cell.x, cell.y, cellWidth, cellWidth);

	switch (cell.value){
		case 0: context.fillStyle = "#D58490";
		case 2: context.fillStyle = "#D58490";
		case 4: context.fillStyle = "#F5DEB3";
		case 8: context.fillStyle = "#F5DEB3";
		case 16: context.fillStyle = "#F5DEB3";
		case 32: context.fillStyle = "#F5DEB3";
		case 64: context.fillStyle = "#F5DEB3";
		case 128: context.fillStyle = "#F5DEB3";
		case 246: context.fillStyle = "#F5DEB3";
		case 512: context.fillStyle = "#F5DEB3";
		case 1024: context.fillStyle = "#F5DEB3";
		case 2048: context.fillStyle = "#F5DEB3";
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