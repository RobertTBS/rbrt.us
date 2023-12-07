Notification.requestPermission(); //TODO TOMORROW
const Table = document.getElementById("output");
let MultiArray = JSON.parse(document.getElementById('ArrTransfer').innerHTML); //Make a new array we can edit

let startP = 10;
document.getElementById("startP").value=10;
let showLunches = document.getElementById("LunchToggle").checked ||true;
let simple = document.getElementById("AllPeriodsToggle").checked||false;
let dateType = "NORM";
let notify = document.getElementById("Notify").checked || false;
const select = document.getElementById("startP");
let offset = 0

async function wakelock(){     //Chrome wake lock
  let wakeLock = null;
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    //alert('Wake Lock is active!');
  } catch (err) {
    // The Wake Lock request has failed - usually system related, such as battery.
    console.log(`${err.name}, ${err.message}`);
  }
}
wakelock()


function makeDate(givenDate){
  const Hr = givenDate.toString().split(",")[3] | 0;
  const Min = givenDate.toString().split(",")[4] | 0;
  const now = new Date();
  let date = new Date(now.getFullYear().toString()+"/"+(now.getMonth()+1).toString()+"/"+now.getDate().toString()+", "+Hr.toString()+":"+Min.toString())
  return new Date(date.getTime() + offset*1000)
}
if (new Date().getDay() == 1){
  dateType = "LS";
  document.getElementById("TypeSelect").value = "LS";
}

// Updte the data when it is changed
const elementToObserve = document.getElementById('ArrTransfer');
const observer = new MutationObserver(() => {
  MultiArray = JSON.parse(document.getElementById('ArrTransfer').innerHTML);
  calculate();
});
observer.observe(elementToObserve, { subtree: true, childList: true });


function calculate(){ //Runs every time the data element is changed, about once per second.
  document.getElementById("REMOVABLE").remove()
  MultiArray.forEach((innerArr, indexX) => {
    //console.log(("TYPE-"+innerArr[0]+"|PD-"+innerArr[1]))
    document.getElementById("TYPE-"+innerArr[0]+"|PD-"+innerArr[1]).parentElement.style.display='none'
  });
  
  MultiArray.forEach((innerArr, indexX) => {
    if (innerArr[0] == "OFFSET"){
      offset = innerArr[1]
    }
    if (innerArr[0] == "MESSAGE"){
      document.getElementById("custMessage").innerHTML = innerArr[1].toString()
    }
    innerArr.forEach((val,indexY) => {
      if (innerArr[0] == dateType && innerArr[indexY] != dateType){
        //console.log(innerArr[indexY])
        if (showLunches == true){ //Show if lunches available
          document.getElementById("TYPE-"+dateType+"|PD-"+innerArr[1]).parentElement.style.display='block';
        }else if (innerArr[1].charAt(0) != 'L' ){
          document.getElementById("TYPE-"+dateType+"|PD-"+innerArr[1]).parentElement.style.display='block';
        }
      }
    })
  });

  let least = [0,999999999] //PD, MS
  let leastL = [0,999999999] //For lunches
  MultiArray.forEach((innerArr, indexX) => {
    innerArr.forEach((text,indexY) => {
      //For all non-lunch periods
      if ((innerArr[startP])<least[1] && least[1] > 0 && innerArr[startP] < 0 && innerArr[0] == dateType && innerArr[1].charAt(0) != "L"){
        least[0] = innerArr[1];
        least[1] = innerArr[startP];
        document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.style.backgroundColor='green';
      }
      if ((innerArr[startP])<least[1] && least[1] > 0 && innerArr[startP] < 0 && innerArr[0] == dateType && innerArr[1].charAt(0) == "L"){
        leastL[0] = innerArr[1];
        leastL[1] = innerArr[startP];
        document.getElementById("TYPE-"+dateType+"|PD-"+leastL[0]).parentElement.style.backgroundColor='darkgreen';
      }
    })
    
    if (innerArr[1] == least[0]){
        
      //document.title = (innerArr[1]+" "+innerArr[10])
        
       //alert(least[0])
      if (least[0] == 0){
        least[0] = innerArr.length-4
      }else if (least[0] > innerArr.length-4){
        least[0] = innerArr.length-4
      }
      
      //console.log(dateType+" "+least[0])
      //document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.style.backgroundColor='green';
      if (simple){
        let children = document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.parentElement.getElementsByTagName("tr")
        for(var i=0; i<children.length; i++) {
          children[i].style.display = 'none';
        }
        document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.style.fontSize = '9.5vw';
        document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.style.fontWeight = '900';
        document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.style.display = 'block';
        document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children[0].innerHTML="";
        document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children[1].innerHTML="";
        if (startP == 10){
          document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children[2].innerHTML="";
          document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children[3].innerHTML = document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children[3].innerHTML.toString().split("S")[0]+"S"
        };
        //console.log(document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children[2].innerHTML.toString())
        if (!startP == 9){
          document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children[3].innerHTML="";
          document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children[2].innerHTML = document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children[2].innerHTML.toString().split("S")[0]+"S"
        };
        document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.style.textAlign = "center";
        document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.parentElement.style.width = '100%';
        document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.style.backgroundColor='rgba(0,0,0,0)';
      }
    }
  });
  let children = document.getElementById("TYPE-"+dateType+"|PD-"+least[0]).parentElement.children;
  let title = children[3].innerHTML.split("S")[0]+"S";
  let pd = children[1].innerHTML.split("&nbsp;")[0];
  document.title = title;
  
  function notif(){
    const notification = new Notification(title,{tag:'notif',body:"Period "+pd+" ends in "+title, silent:true, renotify: false, icon:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg',badge:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg'});  
  }
         
  if (notify==true){
  if (!("Notification" in window)) {alert("This browser does not support desktop notification")} //Check for support
  else if (Notification.permission === "granted") { //Build notification
    notif()
  }else if (Notification.permission !== "denied") { //Request permission again
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        notif()
      }
    });
  }
}
  let str = ('td'); //TODO
  let allTds = document.querySelector(".output").querySelectorAll(str)
  allTds.forEach((text, index) => {
    if (text.innerHTML.includes("S ")){
      text.innerHTML=text.innerHTML.split("S ")[0]+"S"
    }

    if (startP == 10){
      for (let i = 2; i < allTds.length ;i=i+2){
        allTds[i].innerHTML = "";
      }
    }else if (startP == 9){
      for (let i = 3; i < allTds.length ;i=i+4){
        allTds[i].innerHTML = "";
      }
    }
      
//    }
      //console.log(allTds[9].innerHTML)
    if (text.innerHTML.toString().includes(dateType) || (startP == 9 && text.toString().includes(startP))){
      text.innerHTML = "";
    }
  });
  
}
