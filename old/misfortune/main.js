const canvas = document.getElementById("spinner");
const ctx = canvas.getContext("2d");
let colors = [];
let angles = [];

function draw() {
  //alert(angles+"___"+colors)
  // Temporary variables, to store each arc angles
  var beginAngle = 0;
  var endAngle = 0;
  
  // Iterate through the angles
  for(var i = 0; i < angles.length; i = i + 1) {
    // Begin where we left off
    beginAngle = endAngle;
    // End Angle
    endAngle = endAngle + angles[i];
    
    ctx.beginPath();
    // Fill color
    ctx.fillStyle = colors[i % colors.length];
    
    // Same code as before
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, beginAngle, endAngle);
    ctx.lineTo(200, 200);
    ctx.stroke();
    ctx.font="30px Arial"
    ctx.fillText("Test", 0,0);
    ctx.translate( 200, 200 );
    ctx.rotate(100 * Math.PI / 180);
    // Fill
    ctx.fill();
  }
}

let thingtoreturn;
function counter(thing){
  while (thing>5){
    thing=thing-6
  }
    thingtoreturn=thing
  
  return thingtoreturn;
}

function stuffs(list){
  ctx.reset()
  let input = list.value;
  //alert(input)
  angles=[];
  colors=[];
  let clr = ["red","orange","yellow","green","blue","purple"];
  let arr = input.split(",");
  for (let i = 0; i<arr.length;i++){
    //alert(arr.length)
    angles[i]=Math.PI*((1/arr.length)*2);
    colors[i]=clr[counter(i)];
    
  }
  draw()
}

let rot = 0;
function rotate(){
  if (rot > 360){rot=0}
  document.getElementById("spin").style.transform = "rotateY("+rot+"deg)";
  rot++
}
rotate()
setInterval(rotate,10)