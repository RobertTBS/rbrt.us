if (window.location.toString().substring(0,14) == "https://rbrt.g"){alert("You are using the test site!")}
function timeto(){
let time = 0;
let now = new Date()
let to = new Date("04/23/2023"); 
let time_difference = to.getTime() - now.getTime();  
let days = time_difference / (1000 * 60 * 60 * 24);  
document.getElementById("time").innerHTML = Math.floor(days)+2+" days"
}
