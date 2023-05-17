const width = 9;
const inRow = 3;
let arr = [];
let selected = [];
const tableItems=document.getElementById("tableItems");
let plr = "";
const player = document.getElementById("player");
const types=["X","O"]
const O = document.getElementById("O");
const X = document.getElementById("X");
let onP = 0; //Curr plr
let selectable=true;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift(); else return undefined
}
function setCookie(name,value) {
  var expires = "";
  const days = 999;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString(); 
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const xScr = getCookie("X")
const oScr = getCookie("O")
if (xScr==undefined&&oScr==undefined){
  O.innerHTML="0";
  setCookie("O",0)
  X.innerHTML="0";
  setCookie("X",0)
}else{
  O.innerHTML=oScr;
  X.innerHTML=xScr;
}

for (let i = 0; i < width; i++){
  arr[i]=i+10000;
  selected[i]=i+10000;
}
function reset(){
  for (let i = 0; i < width; i++){
    document.getElementById(i).innerHTML=" "
    arr[i]=i+10000;
    selected[i]=i+10000;
  }
  selectable=true
}
function resetS(){
  X.innerHTML = 0;
  O.innerHTML = 0;
  setCookie("O",0);
  setCookie("X",0);
}

function swPlr(){
  if (plr==types[0]){
    plr=types[1];
    onP=1;
  }else if(plr==types[1]){
    plr=types[0];
    onP=0;
  }else{
    plr=types[0];
    onP=0;
  }
  player.innerHTML = "Player "+plr;
  
};
swPlr();

function select(num){
  let next = false;
  if (selectable==true){
    if (selected[num] != true){
      selected[num]=true;
      arr[num] = plr
      document.getElementById(num).innerHTML = plr;
      next = true;
    }else{
      alert("Already selected!");
    }
    for (let i = 0; i<width; i++){
      if (arr[i]==arr[i+1]&&arr[i+1]==arr[i+2]){
        alert(plr+" WON!")
        document.getElementById(plr).innerHTML++
        if (plr=="X"){
          setCookie("X",document.getElementById(plr).innerHTML)
        }else{
          setCookie("O",document.getElementById(plr).innerHTML)
        }
        selectable=false
        return 0;
      }//3 in a row
    } 
  }
  if (next==true){
      swPlr()
  }
}

//Startup
for (let i = 0; i<width; i++){
  let p = document.createElement("th");
  p.innerHTML = " ";
  p.id = i;
  let but = document.createElement("button");
  but.onclick=function(){select(i)};
  but.appendChild(p)
  tableItems.appendChild(but);
}