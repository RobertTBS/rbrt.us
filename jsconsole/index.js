//Display log

var realConsoleLog = console.log;
console.log = function () {
  var message = [].join.call(arguments, " ");
  // Display the message somewhere... (jQuery example)
  var prevmessage = $(".output").text
  makeelement()
//  $(".output").text(prevmessage+" "+message);
  realConsoleLog.apply(console, arguments);
//  prompt ($(".output").text)
  
  
          function makeelement() {  
            var btn = document.createElement("p");  
            btn.innerHTML = message;  
            btn.id="p"
            document.body.appendChild(btn);  
        }  
};

//Display WARN

var realConsoleWarnLog = console.warn
console.warn = function () {
  var warnmessage = [].join.call(arguments, " ");
  // Display the message somewhere... (jQuery example)
  var prevwarnmessage = $(".output").text
  makewarnelement()
//  $(".output").text(prevmessage+" "+message);
  realConsoleWarnLog.apply(console, arguments);
//  prompt ($(".output").text)
  
  
          function makewarnelement(){  
            var btn = document.createElement("p");  
            btn.innerHTML = warnmessage;  
            btn.style.color = "orange"
            btn.id="p"
            document.body.appendChild(btn);  
        }  
};

//Display ERROR

var realConsoleErrorLog = console.error
console.error = function () {
  var errmessage = [].join.call(arguments, " ");
  // Display the message somewhere... (jQuery example)
  var preverrmessage = $(".output").text
  makewarnelement()
//  $(".output").text(prevmessage+" "+message);
  realConsoleErrorLog.apply(console, arguments);
//  prompt ($(".output").text)
  
  
          function makewarnelement(){  
            var btn = document.createElement("p");  
            btn.innerHTML = errmessage;  
            btn.style.color = "crimson"
            btn.id="p"
            document.body.appendChild(btn);  
        }  
};


//console.log("hello", "my", "name", "is", "james");
//  ___              ___   ______
// /   \     ____  /   \      |
// \___/    /   \  \___/      |
// |  \     \___/  |  \       |
// |   \   /   \   |   \      |
// |    \  \___/   |    \     |
//
//////////////////////////////////////////////////////////
function getCookies(){
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  ///////////////////
  function saveFunction(){
    setCookie()
  }
eval(getCookie("function"))
}
//////////////////////////////////////////////////////////
//Display the terminal imputter when alt clicked
function imput() {
  var consoleimput = prompt(
    "Enter javascript commands here",
    "Enter here or paste"
  );
  console.log(">",consoleimput);
  eval(consoleimput)
}

//keys
var demo = document.getElementById("demo");
var value = 0;
var space_bar = 32;
var right_arrow = 39;
var alt = 18;

window.onkeydown = function (gfg) {
  if (gfg.keyCode === alt) {
    imput();
  }
};


function clickdo(){
  var txt = document.getElementById("TextImpt").value;
    console.log(">",txt);
  eval(txt)
  
}