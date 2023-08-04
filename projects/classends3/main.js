const options = document.getElementById("Options")
function toggleOptions(){
  if (options.style.display !="none"){
    options.style.display="none";
  }else{
    options.style.display="block";
  }
}
function AllPeriodsToggle(){
  
}

//Switching what times you want, eg normal day, late start.
const SwitchValue = document.getElementById("DayDisplay")
let dayVal = 0
function switchTo(thing,value){
  SwitchValue.innerHTML = value
  
  if (value=="Normal"){dayVal = 0} //Change the thing
  else if (value=="Late Start"){dayVal = 1}
  else if (value=="Early Out"){dayVal = 2}
  
  if (thing == "AUTO"){
    SwitchValue.innerHTML = SwitchValue.innerHTML+" {AUTO}"
  }
}
//Auto select mondays
if (new Date().getDay() == 1){
  SwitchValue(null,'Late start')
}
// !TODO! 2023-24 dates auto set
const now = new Date();
if (now.getFullYear() == 2023){
  
}else if (now.getFullYear() == 2024){
  
}