var mins = document.getElementById("mins");
var secs = document.getElementById("secs");
var bt = document.getElementById("apply");
  Notification.requestPermission()
function apply() {
  mins = mins.value;
  secs = secs.value;
}
/////////////////////////////////////////
//SCHEDULE FOR MONDAY
var sm_first_h = 10;
var sm_first_m = 15;
var em_first_h = 10;
var em_first_m = 44;
var sm_second_h = 10;
var sm_second_m = 48;
var em_second_h = 11;
var em_second_m = 17;
var sm_third_h = 11;
var sm_third_m = 21;
var em_third_h = 11;
var em_third_m = 50;
var sm_fourth_h = 11;
var sm_fourth_m = 54;
//LUNCHES

//
var em_fourth_h = 13;
var em_fourth_m = 3;
var sm_fifth_h = 13;
var sm_fifth_m = 7;
var em_fifth_h = 13;
var em_fifth_m = 36;
var sm_sixth_h = 13;
var sm_sixth_m = 40;
var em_sixth_h = 14;
var em_sixth_m = 9;
var sm_seventh_h = 14;
var sm_seventh_m = 13;
var em_seventh_h = 14;
var em_seventh_m = 42;
var sm_eighth_h = 14;
var sm_eighth_m = 46;
var em_eighth_h = 15;
var em_eighth_m = 15;
//SCHEDULE FOR NORMAL WEEKDAY
var s_first_h = 8;
var s_first_m = 15;
var e_first_h = 9;
var e_first_m = 1;
var s_second_h = 9;
var s_second_m = 5;
var e_second_h = 9;
var e_second_m = 51;
var s_third_h = 9;
var s_third_m = 55;
var e_third_h = 10;
var e_third_m = 41;
var s_fourth_h = 10;
var s_fourth_m = 45;
var e_fourth_h = 11;
var e_fourth_m = 31;
var s_fifth_h = 11;
var s_fifth_m = 35;
var e_fifth_h = 12;
var e_fifth_m = 45;
var s_sixth_h = 12;
var s_sixth_m = 49;
var e_sixth_h = 13;
var e_sixth_m = 35;
var s_seventh_h = 13;
var s_seventh_m = 39;
var e_seventh_h = 14;
var e_seventh_m = 25;
var s_eighth_h = 14;
var s_eighth_m = 29;
var e_eighth_h = 15;
var e_eighth_m = 15;
/////////////////////////////////////////
var time = 1;
//NOTIFY
function notify(period) {
  var mins = document.getElementById("mins").value;
  var secs = document.getElementById("secs").value;
  period = period.toString();
  const greeting = new Notification("Class ending soon", {
    body: period + " period is " + mins + " minutes from ending",
    icon: "https://www.northpolk.org/cms/lib/IA02205672/Centricity/Template/GlobalAssets/images///logos/NP_Logo_free_floating%20103.png",
  });
  setTimeout(() => greeting.close(), 5*1000);
}

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const d = new Date();
let day = d.getDay();
console.log(day);
var hour = d.getHours();
var minute = d.getMinutes();
//bt.onclick = function(){

if ((mins.value != null) | 0) {
  mins.value = 1;
} else {
  var mins = mins.value;
}
var mins = 1;

function check() {
  //Numbers
  var mins = document.getElementById("mins").value;
  var secs = document.getElementById("secs").value;
  //Check time
  const d = new Date();
  let day = d.getDay();
  var hour = d.getHours();
  var minute = d.getMinutes();
  //Do it
  if (day == 1) {
    //Monday
    if (minute == em_first_m - mins && hour == em_first_h) {
      notify("first");
    } else if (minute == em_second_m - mins && hour == em_second_h) {
      notify("second");
    } else if (minute == em_third_m - mins && hour == em_third_h) {
      notify("third");
    } else if (minute == em_fourth_m - mins && hour == em_fourth_h) {
      notify("fourth");
    } else if (minute == em_fifth_m - mins && hour == em_fifth_h) {
      notify("fifth");
    } else if (minute == em_sixth_m - mins && hour == em_sixth_h) {
      notify("sixth");
    } else if (minute == em_seventh_m - mins && hour == em_seventh_h) {
      notify("seventh");
    }
  } else if (day == 2 ||day == 3 || day == 4 || day == 5 || day == 6) {
    //Rest of week
    if (minute == e_first_m - mins && hour == e_first_h) {
      notify("first");
    } else if (minute == e_second_m - mins && hour == e_second_h) {
      notify("second");
    } else if (minute == e_third_m - mins && hour == e_third_h) {
      notify("third");
    } else if (minute == e_fourth_m - mins && hour == e_fourth_h) {
      notify("fourth");
    } else if (minute == e_fifth_m - mins && hour == e_fifth_h) {
      notify("fifth");
    } else if (minute == e_sixth_m - mins && hour == e_sixth_h) {
      notify("sixth");
    } else if (minute == e_seventh_m - mins && hour == e_seventh_h) {
      notify("seventh");
    } else if (minute == e_eighth_m - mins && hour == e_eighth_h) {
      notify("eighth");  
    }
  }
}

setInterval(function () {
  check();
}, 5000);
