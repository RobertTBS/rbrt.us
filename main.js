if (window.location.toString().substring(0,18) == "https://rbrt-web.g"){alert("You are using the test site!")}
function timeto(){
let time = 0;
let now = new Date()
let to = new Date("04/23/2023"); 
let time_difference = to.getTime() - now.getTime();  
let days = time_difference / (1000 * 60 * 60 * 24);  
document.getElementById("time").innerHTML = Math.floor(days)+2+" days"
}
timeto()

function schoolend(){
const currentDate = new Date();
const targetDate = new Date("May 31, 2023 13:15:00");
const timeDiff = targetDate.getTime() - currentDate.getTime();

const Day = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
const Hour = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const Min = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
const Sec = Math.floor((timeDiff % (1000 * 60)) / 1000);
document.getElementById("schoolend").innerHTML = Day+" days, "+Hour+" hours, "+Min+" minutes, and "+Sec+" seconds"
}
schoolend()
setInterval(schoolend,1000)
