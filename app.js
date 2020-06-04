document.addEventListener('DOMContentLoaded', ()=>{
  const gameEnvironment = document.querySelector('.gameEnvironment');
  const width =8;
  const squares=[];
  const candyColors=[
    "url(imgs/red-candy.png)", 
    "url(imgs/yellow-candy.png)", 
    "url(imgs/green-candy.png)", 
    "url(imgs/blue-candy.png)", 
    "url(imgs/purple-candy.png)", 
    "url(imgs/orange-candy.png)"
];
   let scoreDisplay = document.querySelector('.scoreValue');
   let score =0;



//Create Board
function createBoard(){
  for(let a=0; a<width*width; a++ ){
    const square = document.createElement('div');
    square.setAttribute('draggable', true);
    square.setAttribute('id', a);
    let randomColor = Math.floor(Math.random()*candyColors.length);
    square.style.backgroundImage =candyColors[randomColor];   
    gameEnvironment.appendChild(square);
    squares.push(square); 
  }
}
createBoard();

//Draggable Effect On Candies
let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;


squares.forEach(square => square.addEventListener("dragstart", dragStart));
squares.forEach(square => square.addEventListener("dragend", dragEnd));
squares.forEach(square => square.addEventListener("dragover", dragOver));
squares.forEach(square => square.addEventListener("dragleave", dragLeave));
squares.forEach(square => square.addEventListener("drop", dragDrop));
squares.forEach(square => square.addEventListener("dragenter", dragEnter));


function dragStart(){
  console.log(this.id, "dragStart");
  colorBeingDragged = this.style.backgroundImage;
  squareIdBeingDragged = parseInt(this.id);
  console.log(colorBeingDragged); 
}


function dragOver(e){
  e.preventDefault();
  console.log(this.id, "dragOver");
}
function dragLeave(){
  console.log(this.id, "dragLeave");
}
function dragEnter(e){
  e.preventDefault();
  console.log(this.id, dragEnter);
}


function dragEnd(){
  console.log(this.id, "dragEnd");
  //What is a valid move?
  let validMoves = [
    squareIdBeingDragged - 1,
    squareIdBeingDragged - width,
    squareIdBeingDragged + 1,
    squareIdBeingDragged + width
  ];
  let validMove = validMoves.includes(squareIdBeingReplaced);
  //IF a square is being replaced and it's a valid move, set the candy to be null.
  if(squareIdBeingReplaced && validMove){
    squareIdBeingDragged = null;
  }else if( squareIdBeingReplaced && !validMove){
    squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  }else{
    square[squareIdBeingDragged].style.backgroundImage = colorBeingDragged; 
  }
}


function dragDrop(){
  console.log(this.id, "dragDrop");
  colorBeingReplaced = this.style.backgroundImage;
  squareIdBeingReplaced = parseInt(this.id);
  this.style.backgroundImage = colorBeingDragged;
  squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
}


//DROP CANDIES TO THE BOTTOM WHEN THERE IS A MATCH 
//FILL EMPTY SPACES WITH A RADOMCOLOR
// I Haven't understand this logic
function moveDownCandies(){
  for(let d =0; d < 55; d++){
    if(squares[d + width].style.backgroundImage === ""){
        squares[d +width].style.backgroundImage = squares[d].style.backgroundImage;
        squares[d].style.backgroundImage = "";

        const firstRow = [0,1,2,3,4,5,6,7];
        const isFirstRow = firstRow.includes(d);

        if(isFirstRow && (squares[d].style.backgroundImage === "")){
          let randomColor = Math.floor(Math.random()*candyColors.length);
          squares[d].style.backgroundImage = candyColors[randomColor];
        }

    }
  }
}

//FOR FOUR CANDIES:
//ROWS WITH FOUR:
function checkRowForFour(){
  for(let c=0; c<60; c++){
    let rowOfFour = [c, c+1, c+2, c+3];
    let decidedColor = squares[c].style.backgroundImage;
    const isBlank = squares[c].style.backgroundImage === "";

    const invalidRowFourCount = [6,7,8,9,14,15,16,17,22,23,24,25,30,31,32,33,38,39,40,41,46,47,48,49,54,55,56,57];
    if(invalidRowFourCount.includes(c)) continue;

    if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
      score +=4;
      scoreDisplay.innerHTML = score;
      rowOfFour.forEach(index => {squares[index].style.backgroundImage = ""});
    }
  }
}
checkRowForFour();

//COLUMNS WITH FOUR:
function checkColumnForFour(){
  for(let c=0; c < 41; c++){
    let columnForFour = [c, c+width, c+width*2, c+width*3];
    let decidedColor = squares[c].style.backgroundImage;
    let isBlank = squares[c].style.backgroundImage === "";

    if(columnForFour.every(index => squares[index] === decidedColor && !isBlank )){
      score +=4;
      scoreDisplay = score;
      columnForFour.forEach(index => squares[index].style.backgroundImage = "");
    }

  }
}
checkColumnForFour();


//ROW WITH THREE MATCH, CLEAR.
function checkRowForThree(){
  for(b = 0; b<61; b++){
    let rowOfThree = [b, b+1, b+2];
    let decidedColor = squares[b].style.backgroundImage;
    const isBlank = squares[b].style.backgroundImage === "";

    const notValid = [6,7,14,15,22,33,30,31,38,39,46,47,54,55];
    if(notValid.includes(b)) continue;

    if(rowOfThree.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
      score += 3;
      scoreDisplay.innerHTML = score;
      rowOfThree.forEach(index => { squares[index].style.backgroundImage = ""})
    }
  } 
}
checkRowForThree();


//COLUMNS WITH THREE MATCH, CLEAR!
function checkColumnForThree(){
  for(b=0; b<47; b++){
    let columnOfThree = [b, b+width, b+width*2];
    let decidedColor = squares[b].style.backgroundImage;
    const isBlank = squares[b].style.backgroundImage === "";

    if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)){
      score += 3;
      scoreDisplay.innerHTML = score;
      columnOfThree.forEach( index => {squares[index].style.backgroundImage=""});
    }
  }
}
checkColumnForThree();


//Need to do our checking for matched candies everytime hroughout the game not just once.
window.setInterval(function(){
  moveDownCandies();
  checkRowForFour();
  checkColumnForFour();
  checkRowForThree();
  checkColumnForThree();
}, 100)



})