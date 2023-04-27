var mins = document.getElementById("mins");
var secs = document.getElementById("secs");
var bt = document.getElementById("apply");
  Notification.requestPermission()
function apply() {
  mins = mins.value;
  secs = secs.value;
};
var leasth;
var leastm;
/////////////////////////////////////////
var wkday = [
  {pd:'1',sh:'08',sm:'15',eh:'09',em:'01'},
  {pd:'2',sh:'09',sm:'05',eh:'09',em:'51'},
  {pd:'3',sh:'09',sm:'55',eh:'10',em:'41'},
  {pd:'4',sh:'10',sm:'45',eh:'11',em:'31'},
  {pd:'5',sh:'11',sm:'35',eh:'12',em:'45'}, //Lunches are here
  //{pd:'L1',sh:'11',sm:'33',eh:'11',em:'58'},
  //{pd:'L2',sh:'11',sm:'55',eh:'12',em:'20'},
  //{pd:'L3',sh:'12',sm:'20',eh:'12',em:'45'},
  {pd:'6',sh:'12',sm:'49',eh:'13',em:'35'},
  {pd:'7',sh:'13',sm:'39',eh:'14',em:'25'},
  {pd:'8',sh:'14',sm:'29',eh:'15',em:'15'}
]; //{pd:'',sh:'',em:'',eh:'',em:''}, period,starthour,startminute,endhour,endminute
var mnday = [
  {pd:'1',sh:'10',sm:'15',eh:'10',em:'44'},
  {pd:'2',sh:'10',sm:'48',eh:'11',em:'17'},
  {pd:'3',sh:'11',sm:'21',eh:'11',em:'50'}, //Lunches are commented because they lengthen the page very long.
  //{pd:'L1',sh:'11',sm:'52',eh:'12',em:'17'},
  //{pd:'L2',sh:'12',sm:'14',eh:'12',em:'39'},
  //{pd:'L3',sh:'12',sm:'38',eh:'13',em:'03'},
  {pd:'4',sh:'11',sm:'54',eh:'13',em:'03'},
  {pd:'5',sh:'13',sm:'07',eh:'13',em:'36'},
  {pd:'6',sh:'13',sm:'40',eh:'14',em:'09'},
  {pd:'7',sh:'14',sm:'13',eh:'14',em:'42'},
  {pd:'8',sh:'14',sm:'46',eh:'15',em:'15'}
];
//Fo rthe button highlighting
var c0 = document.getElementById('c0') //start of period
var c1 = document.getElementById('c1') //end of period
var c2 = document.getElementById('c2') //show notifications
var c3 = document.getElementById('c3') //hide notifications
var c4 = document.getElementById('c4') //show lunches
var c5 = document.getElementById('c5') //hide lunches
var se=1
var sl=0
var sh=0
function click0(){
  c0.style="background-color:#444444"
  c1.style="background-color:white"
  se=0
}
function click1(){
  c1.style="background-color:#444444"
  c0.style="background-color:white"
  se=1
}
function click2(){
  c2.style="background-color:#444444"
  c3.style="background-color:white"
  sl=1
}
function click3(){
  c3.style="background-color:#444444"
  c2.style="background-color:white"
  sl=0
}
function click4(){
  c4.style="background-color:#444444"
  c5.style="background-color:white"
  sl=0
}
function click5(){
  c5.style="background-color:#444444"
  c4.style="background-color:white"
  sl=0
}


var greeting;
function notif(pd,time){//notifications
 //   greeting = new Notification(time, {
 //   body: pd+": "+time,
 //   icon: "https://www.northpolk.org/cms/lib/IA02205672/Centricity/Template/GlobalAssets/images///logos/NP_Logo_free_floating%20103.png",
 //   silent:true, //Only for chrome based bowsers
 // });

  
  if (sl==0){ //off
    //greeting.close()
  }else{      //on
    greeting = new Notification(time, {
    body: "pd "+pd+": "+time,
    tag:"notiffff",
    renotify: false,
    icon: "https://www.northpolk.org/cms/lib/IA02205672/Centricity/Template/GlobalAssets/images///logos/NP_Logo_free_floating%20103.png",
    silent:true, //Only for chrome based bowsers
    id: "notiffff"
  });
    //    setTimeout(closenotif,840)
}}/*
function closenotif(){
    greeting.close()
   }*/

var now = new Date();
function addToday(hr,min){
 hr=hr.toString();
 min=min.toString();
 now = new Date();
 var month = now.getMonth()+1
 var n = now.getTime();
 var day = now.getDate()
 if(day<10){day = "0"+now.getDate()} //CHANGED HERE 12/12/22
 if(month<10){month="0"+month.toString()} //CHANGED 1/4/23
 var today = now.getFullYear().toString()+"-"+(month).toString()+"-"+day+"T"+hr+":"+min
 today=today.toString();
 today = new Date(today);
 today = today-n;
  
if (today>0){
 var minutes = Math.floor(today/1000);
 var secs = (minutes%60);
 minutes = Math.floor(minutes/60);
 var hours = Math.floor(minutes/60)}
else{
   var minutes = Math.ceil(today/1000);
 var secs = (minutes%60);
 minutes = Math.ceil(minutes/60);
 var hours = Math.ceil(minutes/60)}
  
 minutes = (minutes%60)
 var time = (hours+"H:"+minutes+"M:"+secs+"S"); //OLD
 //var time = (hours+":"+minutes+":"+secs) //SIMPLIFIED
 return time;
}

var leastpd=0 
function least(){
  now = new Date();
  if (se==0){
    if (now.getDay()==1){
      var theleast = 0-now.getTime()*200;//set to some absurd number that 1st period will always be greater than
      mnday.forEach(function(val,index,arr){``
      now = new Date();
      var day = now.getDate();if(day<10){day = "0"+now.getDate()}
      var month = now.getMonth()+1;if(month<10){month="0"+month.toString()}
      var valpd = new Date(now.getFullYear().toString()+"-"+(month).toString()+"-"+day+"T"+val.sh+":"+val.sm).getTime()
      //lert(now.getTime()-valpd)
      if ((now.getTime() - valpd)>theleast && (now.getTime() - valpd) < 0){
        theleast = now.getTime() - valpd
        leastpd = val.pd
      }

      });
      mnday.forEach(function(val,index,arr){
        if (val.pd == leastpd){document.getElementById("pd"+leastpd).style.color="green";
                               document.title=addToday(val.sh,val.sm).toString()
                               notif(leastpd,addToday(val.eh,val.em).toString()) //SET TIME OF CLOSEST
        }else{document.getElementById("pd"+val.pd).style.color="white"}
      })
    }else if(now.getDay()==2|3|4|5|6){
      var theleast = 0-now.getTime()*200;//set to some absurd number that 1st period will always be greater than
      wkday.forEach(function(val,index,arr){
      now = new Date();
      var day = now.getDate();if(day<10){day = "0"+now.getDate()}
      var month = now.getMonth()+1;if(month<10){month="0"+month.toString()}
      var valpd = new Date(now.getFullYear().toString()+"-"+(month).toString()+"-"+day+"T"+val.sh+":"+val.sm).getTime()
      //lert(now.getTime()-valpd)
      if ((now.getTime() - valpd)>theleast && (now.getTime() - valpd) < 0){
        theleast = now.getTime() - valpd
        leastpd = val.pd
      }

      });
      wkday.forEach(function(val,index,arr){
        if (val.pd == leastpd){document.getElementById("pd"+leastpd).style.color="green";
                               document.title=addToday(val.sh,val.sm).toString()
                               notif(leastpd,addToday(val.eh,val.em).toString()) //SET TIME OF CLOSEST
        }else{document.getElementById("pd"+val.pd).style.color="white"}
      })
    }
  }else if (se==1){///////////////////////////////////////////////////
      if (now.getDay()==1){
      var theleast = 0-now.getTime()*200;//set to some absurd number that 1st period will always be greater than
      mnday.forEach(function(val,index,arr){
      now = new Date();
      var day = now.getDate();if(day<10){day = "0"+now.getDate()}
      var month = now.getMonth()+1;if(month<10){month="0"+month.toString()}
      var valpd = new Date(now.getFullYear().toString()+"-"+(month).toString()+"-"+day+"T"+val.eh+":"+val.em).getTime()
      //lert(now.getTime()-valpd)
      if ((now.getTime() - valpd)>theleast && (now.getTime() - valpd) < 0){
        theleast = now.getTime() - valpd
        leastpd = val.pd
      }

      });
      mnday.forEach(function(val,index,arr){
        if (val.pd == leastpd){document.getElementById("pd"+leastpd).style.color="green";
                               document.title=addToday(val.eh,val.em).toString()
                               leasth=val.eh //SET TIME OF CLOSEST
                               leastm=val.em
        }else{document.getElementById("pd"+val.pd).style.color="white";}
      })
      notif(leastpd,addToday(leasth,leastm).toString())

    }else if(now.getDay()==2|3|4|5|6){
      var theleast = 0-now.getTime()*200; //set to some absurd number that 1st period will always be greater than
      wkday.forEach(function(val,index,arr){
      now = new Date();
      var day = now.getDate();if(day<10){day = "0"+now.getDate()}
      var month = now.getMonth()+1;if(month<10){month="0"+month.toString()}
      var valpd = new Date(now.getFullYear().toString()+"-"+(month).toString()+"-"+day+"T"+val.eh+":"+val.em).getTime()
      //alert(now.getTime()-valpd)
      if ((now.getTime() - valpd)>theleast && (now.getTime() - valpd) < 0){
        theleast = now.getTime() - valpd
        leastpd = val.pd
      }

      });
      wkday.forEach(function(val,index,arr){
        if (val.pd == leastpd){document.getElementById("pd"+leastpd).style.color="green";
                               document.title=addToday(val.eh,val.em).toString()
                               leasth=val.eh
                               leastm=val.em
        }else{document.getElementById("pd"+val.pd).style.color="white"}
      })
     notif(leastpd,addToday(leasth,leastm).toString())
    }
  }
} 
function go(){
now = new Date();
if(se==1){ //START OR END OF PERIOD 
 if (now.getDay()==1){
  mnday.forEach(function(val,index,arr){
   update(val.pd,val.eh,val.em)
  });
 }else if(now.getDay()==2|3|4|5|6){
  wkday.forEach(function(val,index,arr){
   update(val.pd,val.eh,val.em)
  })}
}else if (se==0){
 if (now.getDay()==1){
  mnday.forEach(function(val,index,arr){
   update(val.pd,val.sh,val.sm)
  });
 }else if(now.getDay()==2|3|4|5|6){
  wkday.forEach(function(val,index,arr){
   update(val.pd,val.sh,val.sm)
})}}} //END OF SE, END OF FUNCTION
click1()
click3()
click5()
function doit(){
  go();least()
//doit()
}


//while (true==true){doit}
setInterval(doit,1100)

function update(vpd,h,m){
         if (document.getElementById('pd'+vpd)){
        document.getElementById("pd"+vpd).innerHTML = 'Period '+vpd+": "+addToday(h,m);
       } else{
       var ele = document.createElement('p');
       ele.id = "pd"+vpd;
       ele.style="font-family:'Overpass',sans-serif; color:white";
       ele.innerHTML = 'Period '+vpd+": "+addToday(h,m);
       document.body.appendChild(ele); 
}}