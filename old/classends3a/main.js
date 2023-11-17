let ShowAllPeriods = true
let ShowLunches = false


const options = document.getElementById("Options");
const timesbox = document.getElementById("timesBox");
const embed = document.getElementById("embed")

function toggleOptions(){
  if (options.style.display !="none"){
    options.style.display="none";
    timesbox.style.height = "90%"
    embed.style.height = "90vh"
  }else{
    options.style.display ="block";
    timesbox.style.height = "65%";
    embed.style.height = "65vh";
  }
}
function AllPeriodsToggle(){
  if (ShowAllPeriods == true){
    ShowAllPeriods = false
  }else{
    ShowAllPeriods = true
  }
}
function ShowLunchesToggle(){
  if (ShowLunches == true){
    ShowLunches = false
  }else{
    ShowLunches = true
  }
}

//Switching what times you want, eg normal day, late start.
const SwitchValue = document.getElementById("DayDisplay")
let dayVal = null



function switchTo(thing,value){ //Switch to the selected day. Form is ([AUTO or null],toID)
  SwitchValue.innerHTML = value
  
  if (value=="Normal"){dayVal = 0} //Change the thing
  else if (value=="Late Start NO ADVISORY"){dayVal = 1.1}
  else if (value=="Late Start W/ ADVISORY"){dayVal = 1.2}
  else if (value=="Early Out"){dayVal = 2}
  
  if (thing == "AUTO"){
    SwitchValue.innerHTML = SwitchValue.innerHTML+" {AUTO}"
  }
}

//Auto select mondays
if (new Date().getDay() == 1){
  switchTo("AUTO",'Late start')
}else{ //Auto select normal so it says AUTO next to it
  switchTo("AUTO","Normal")
}
/*/ !TODO! 2023-24 dates auto set
const now = new Date();
if (now.getFullYear() == 2023){
  
}else if (now.getFullYear() == 2024){
   
}
*/

function timeTo(time){ //Tell until how long
  //Time is in form: Aug 29 2023 15:15
  let now = new Date()
  const months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
  let to = new Date(months[now.getMonth()]+" "+now.getDate()+" "+now.getFullYear()+" "+time).getTime(); //Make sure to add m/d/yr
  now=now.getTime();
  return((to-now)/1000) //return seconds until
}
//alert(timeTo("15:15"))