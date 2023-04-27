var display = document.getElementById("disp");
var computr = document.getElementById("comp")
//I was going to do 4d battleship, but I can't display it on a screen :( 
var humanLay = [
  //A      B     C     D     E     F     G     H     I     J
  [false,false,false,false,false,false,false,false,false,false,],//1
  [false,false,false,false,false,false,false,false,false,false,],//2
  [false,false,false,false,false,false,false,false,false,false,],//3
  [false,false,false,false,false,false,false,false,false,false,],//4
  [false,false,false,false,false,false,false,false,false,false,],//5
  [false,false,false,false,false,false,false,false,false,false,],//6
  [false,false,false,false,false,false,false,false,false,false,],//7
  [false,false,false,false,false,false,false,false,false,false,],//8
  [false,false,false,false,false,false,false,false,false,false,],//9
  [false,false,false,false,false,false,false,false,false,false,],//10
];
var computerLay = [
  //A      B     C     D     E     F     G     H     I     J
  [false,false,false,false,false,false,false,false,false,false,],//1
  [false,false,false,false,false,false,false,false,false,false,],//2
  [false,false,false,false,false,false,false,false,false,false,],//3
  [false,false,false,false,false,false,false,false,false,false,],//4
  [false,false,false,false,false,false,false,false,false,false,],//5
  [false,false,false,false,false,false,false,false,false,false,],//6
  [false,false,false,false,false,false,false,false,false,false,],//7
  [false,false,false,false,false,false,false,false,false,false,],//8
  [false,false,false,false,false,false,false,false,false,false,],//9
  [false,false,false,false,false,false,false,false,false,false,],//10
];
function humanDisplay(){
  display.innerHTML=""
for (let i=0;i<10;i++){
  display.innerHTML = display.innerHTML + '<p>'
  for (let j=0;j<10;j++){
  display.innerHTML = display.innerHTML + " "+humanLay[i][j].toString();
};
display.innerHTML = display.innerHTML + " </p>";
};
};

function computerDisplay(){
  computr.innerHTML=""
for (let i=0;i<10;i++){
  computr.innerHTML = computr.innerHTML + '<p>'
  for (let j=0;j<10;j++){
  computr.innerHTML = computr.innerHTML + " "+computerLay[i][j].toString();
};
computr.innerHTML = computr.innerHTML + " </p>";
};
};
humanDisplay()
computerDisplay()
//Set the computer's spcaes
function setComputer(){

function rand(){return Math.floor(Math.random()*10)}
  

  
  


}
setComputer()
