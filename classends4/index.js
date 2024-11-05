//Set variables
const spreadsheetId = '1TDUFIfatGlRZ3PD069CgLr_rFxyEbxRaH9i-AshARAs';
var offset;
let config = JSON.parse(localStorage.getItem("CEN4CONFIG")) || {};
var index;
var sysconfig;
var dayDat;
const defaultDaySheetname = "NORM";
var RptInt;
let wakeLock = null;

//Looping variables
let keeplooping = false;



//Initialize the page
new PublicGoogleSheetsParser(spreadsheetId,{sheetName:"Index"}).parse().then(function(index){
  this.index= index;
  //Fetch config
  new PublicGoogleSheetsParser(spreadsheetId,{sheetName:"Config"}).parse().then(function(sysconfig){
    this.sysconfig = sysconfig;
  //Set special message
  document.getElementById("custMessage").innerHTML = sysconfig[0]["Special Message"]
  if (sysconfig[0]["Message urgent"]){
    alert(sysconfig[0]["Special Message"])
  }
  //Set offset
  offset = sysconfig[0]["Offset"]
  //Load names
  index.forEach(function(val,i,arr){
    const option = document.createElement("option");
    option.value = val["Table Name"];
    option.innerHTML = val["Display Name"];
    option.title = val["Description"];
    document.getElementById("TypeSelect").appendChild(option);
  });
    _2();
 });
});

//Set existing configuration
function _2(){
  //Det default configuration or change nothing
  setConfig("SorE",config["SorE"] || 1)
  setConfig("DispMode",config["DispMode"] || 1)
  setConfig("TextMode",config["TextMode"] || 1)
  setConfig("NotifyMode",config["NotifyMode"] || 1)
  setConfig("TabText",config["TabText"] || 1)
  setConfig("ShowOld",config["ShowOld"] || 1)
  setConfig("refrat",config["refrat"] || sysconfig[0]["Default refresh rate (in ms)"]);
  setConfig("KeepAwake",config["KeepAwake"] || 0)
  _3()
}

//Load the day map, and see what day to load
function _3(sheetname){
  //Retrieve the day map
  new PublicGoogleSheetsParser(spreadsheetId,{sheetName:"Day Map",useFormat:false}).parse().then(function(map){
    map.forEach(function(val,index,arr){
      let time = new Date(val["Date MM/DD/YY"]).toDateString();
      if (time == new Date().toDateString() && !sheetname){
        sheetname = val["Table Name"];
      } 
    });
    if (sheetname == undefined) sheetname = defaultDaySheetname //Set it to default if blank
    _4(sheetname);
  });
}

//Initialize the day
function _4(sheetname){
  new PublicGoogleSheetsParser(spreadsheetId,{sheetName:sheetname,useFormat:false}).parse().then(function(day){
    //Set the current day to the current day via the Day Value
    index.forEach(function(index,i,arr){
      if (index["Table Name"] == sheetname){
            document.getElementById("TypeSelect").value = sheetname;
      };
    });
    dayDat = day;
    run();
  });
}


//Runs each time
function getTime(){
  clearScreen()
  let leastPD = undefined;
  let leastMS = 86400000; //24hr in ms
  let leastSet = false;
  dayDat.forEach(function(hour,i,arr){
    let pdPassed;
    var makeIt;
    //Start or end of period
    var time;
    if (config["SorE"] == 1){
      time = hour["End Time (MIL)"]
    }else{
      time = hour["Start Time (MIL)"]
    }
    //Calculate time remaining
    let now = new Date();
    let to = new Date();
    to.setHours(time.split(":")[0]);
    to.setMinutes(time.split(":")[1]);
    to.setSeconds(time.split(":")[2] || 0);
    let msTo = to.getTime()-now.getTime();
    let hr = Math.floor(msTo/3.6e6 | 0);
    let min = Math.floor(msTo%3.6e6 / 6e4 | 0);
    let sec  = Math.floor(msTo%6e4 / 1e3);
    var timeRemText;
    //Set the selected text mode
    if (config["TextMode"] == 1){
      timeRemText = hr+"H "+min+"M "+sec+"S";
    }else if(config["TextMode"] == 2){
      timeRemText = hr+":"+min+":"+sec;
    }else if (config["TextMode"] == 3){
      timeRemText = hr+"H"+min+"M"+sec+"S";
    }else if (config["TextMode"] == 4){
      timeRemText = hr+" : "+min+" : "+sec
    }else if (config["TextMode"] == 5){
      timeRemText = msTo/1000
    };
    //Calculate if this is the closest period
    if (msTo > 0 && leastSet == false){
      leastMS = msTo;
      leastPD = hour["Hour Name"];
      leastSet = true;
    }
    //Display period based on config, to only show future or past periods
    if (msTo < 0){
      pdPassed = true;
    }else{
      pdPassed = false;
    }
    if (config["ShowOld"] == 2){
      makeIt = true;
      if (pdPassed) makeIt = false;
    }else if (config["ShowOld"] == 3){
      makeIt = false;
      if (pdPassed) makeIt = true;
    }else{
      makeIt = true;
    }
    //Make elements
    //Only make elements we want
    if (makeIt == true){
      if (config["DispMode"] == 1){
        const row = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.innerHTML = hour["Hour Name"];
        td1.style.paddingRight = "50px";
        row.appendChild(td1);
        td2.innerHTML = timeRemText;
        if (leastPD == hour["Hour Name"]){
          row.style.backgroundColor = "green"
        }
        row.appendChild(td2)
        document.getElementById("output").appendChild(row); 
      }else if (config["DispMode"] == 2 && hour["Hour Name"] == leastPD){
        const span = document.createElement("span")
        span.innerHTML = timeRemText;
        span.style.fontSize = "12vw";
        span.style.fontWeight = "900";
        span.style.color = 'white';
        document.getElementById("output").appendChild(span)
      }
    }
    
    //Set the tab title
    if (config["TabText"] == 1){
      document.title = "CEN 4 - RBRT.US"
    }else{
      if (hour["Hour Name"] == leastPD){
        document.title = timeRemText
      }
    }
    if (config["KeepAwake"] == 1){
      wakeLock = navigator.wakeLock.request("screen");
    }else{
      wakeLock = null;
    }
    
    //Notifications
    function reqPerm(){
      Notification.requestPermission() 
    }
    if (config["NotifyMode"] == 2 && hour["Hour Name"] == leastPD){
      reqPerm();
      const notification = new Notification(timeRemText,{tag:'notif',body:"Period "+hour["Hour Name"]+" ends in "+timeRemText, silent:true, renotify: false, icon:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg',badge:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg'});      
    }else if (config["NotifyMode"] == 3 && hour["Hour Name"] == leastPD && msTo < 2400000){
      reqPerm();
      const notification = new Notification(timeRemText,{tag:'notif',body:"Less than 5 minutes remaining in period "+hour["Hour Name"]+"! - "+timeRemText, silent:true, renotify: false, icon:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg',badge:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg'});      
    }else if (config["NotifyMode"] == 4 && hour["Hour Name"] == leastPD && msTo < 120000){
      reqPerm();
      const notification = new Notification(timeRemText,{tag:'notif',body:"Less than 2 minutes remaining in period "+hour["Hour Name"]+"! - "+timeRemText, silent:true, renotify: false, icon:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg',badge:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg'});      
    }else if (config["NotifyMode"] == 5 && hour["Hour Name"] == leastPD && msTo < 60000){
      reqPerm();
      const notification = new Notification(timeRemText,{tag:'notif',body:"Less than 1 minute remaining in period "+hour["Hour Name"]+"! - "+timeRemText, silent:true, renotify: false, icon:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg',badge:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg'});      
    }else if (config["NotifyMode"] == 5 && hour["Hour Name"] == leastPD && msTo < 30000){
      reqPerm();
      const notification = new Notification(timeRemText,{tag:'notif',body:"Less than 30 secs remaining in period "+hour["Hour Name"]+"! - "+timeRemText, silent:true, renotify: false, icon:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg',badge:'https://cdn.glitch.com/782eb81c-c672-44cf-b500-e4669b3dc4f1/NORTHPOLK.svg'});      
    }
      
      
  })
}



//Extra functions

//Change a configuration
function setConfig(ref,val){
  if (ref=='Sheetname'){
    stop();
    _3(val)
  }else{
    config[ref] = val;
    localStorage.setItem("CEN4CONFIG",JSON.stringify(config))
    //Set the value in case it was auto set upon startup
    document.getElementById(ref).value = val;
    run()
  }
}

//Run function, resets view then runs
function run(){
  stop()
  RptInt = setInterval(getTime, config["refrat"])
}
//Stop function
function stop(){
  clearScreen()
  clearInterval(RptInt);
  custText("Loading...")
}
//Custom text instead of time
function custText(text){
  const tr = document.createElement("tr")
  const td = document.createElement("td")
  td.innerHTML = text;
  tr.appendChild(td);
  document.getElementById("output").appendChild(tr)
}
//Clear times
function clearScreen(){
  document.getElementById("output").innerHTML = ""
}