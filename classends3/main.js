//This is an untheftable program. It is so stupid and complicated that even I don't fully know whats going on.

//GOOGLE SHEETS FETCH
const sheetId = '14Q-XX0Vf2wf1Da-Gdc_d5F3tHVJTAg5V-vH2RWS9f0A';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'CEN 3 TIME SHEET';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
const data = []
document.addEventListener('DOMContentLoaded', init)
const output = document.querySelector('.output')
const dataTransfer = document.getElementById('ArrTransfer')


let Times = [[0]];
let validDates = [];

function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            //console.log(rep)
            const colz = [];
            //const tr = document.createElement('tr');
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                    //const th = document.createElement('th');
                    //th.innerText = column;
                    //tr.appendChild(th);
                }
            })
            //output.appendChild(tr);
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
            processRows(data);
        })
}
function processRows(json) {
  json.forEach((row,indexX) => {
//  const tr = document.createElement('tr');
    const keys = Object.keys(row);
    let tempArr = [];
    keys.forEach((key,indexY) => {
//    const td = document.createElement('td');
      tempArr[tempArr.length] = 0;
      tempArr[tempArr.length+1] = 0; 
      tempArr[indexY] = row[key];
//    td.textContent = row[key];
//    tr.appendChild(td);
    })
    Times[indexX]=tempArr;
//  output.appendChild(tr);        
  })
  setDate()
}
//DATE CALCULATIONS
function makeDate(givenDate){
  const Hr = givenDate.toString().split(",")[3] | 0;
  const Min = givenDate.toString().split(",")[4] | 0;
  const now = new Date();
  return new Date(now.getFullYear().toString()+"/"+(now.getMonth()+1).toString()+"/"+now.getDate().toString()+", "+Hr.toString()+":"+Min.toString())
}
function timeBetween(end,start){
  const StMs = start.getTime();
  const EdMs = end.getTime();
  const MsTo = EdMs-StMs;
    var hours = MsTo/3.6e6 | 0;
    var minutes  = MsTo%3.6e6 / 6e4 | 0;
    var seconds  = Math.round(MsTo%6e4 / 1e3);
  return [0,hours,minutes,seconds,MsTo];
}
function CALCDATE(startInitial,endInitial){
  const TimeArr = timeBetween(makeDate(startInitial),makeDate(endInitial));
  return /*TimeArr[0]+"D "+*/TimeArr[1]+"H "+TimeArr[2]+"M "+TimeArr[3]+"S ";
}
function START(st,end){
  const TimeArr = timeBetween(makeDate(st),new Date());
  return /*TimeArr[0]+"D "+*/TimeArr[1]+"H "+TimeArr[2]+"M "+TimeArr[3]+"S ";
}
function END(st,end){
  const TimeArr = timeBetween(makeDate(end), new Date());
  return /*TimeArr[0]+"D "+*/TimeArr[1]+"H "+TimeArr[2]+"M "+TimeArr[3]+"S ";
}
//CALCULATIONS AND ADD TO SCREEN
function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}
function setDate(){
  Times.forEach( (innerArr,indexX) => {
    innerArr.forEach((text,indexY) => {
      if (text.toString().includes("Date")){
        Times[indexX][indexY+3] = makeDate(text);
      }
    })
  })
  calc()
}
function calc(){
  output.innerHTML = '<tr id="REMOVABLE" style="background-color:#e74c3c;color:black;"><td>NORMAL DAY - 8:15 - 3:15</td><td>Period name</td><td>Time until start</td><td>Time until end</td></tr>';
  Times.forEach( (val,indexX) => {
    if (isDateValid(val[5])){
      //val[2]let to2 = CALCDATE(val[3],val[2]);
      //console.log(val[2])
      val[7] = val[2];
      val[8] = val[3];
      val[2] = START(val[2],val[3]);
      val[3] = END(val[2],val[3]);
      val[9] = new Date().getTime() - new Date(val[5]).getTime();
      val[10] = new Date().getTime() - new Date(val[6]).getTime();
    }
  })  
  
  addToScreen()
}

function addToScreen(){
  Times.forEach( (innerArr,index) => {
    let ZeroVal;
    const tr = document.createElement('tr');
    innerArr.forEach((text,index) => {
      if (index == 0){
        ZeroVal = text;
        if (text.charAt(0) == "."){ //[1] is blank, because [5] is ISLABEL.
          text = text.substring(1);
          innerArr[2]='Period name';
          innerArr[3]='Time until start';
          innerArr[4]='Time until end';
          innerArr[5]="ISLABEL"
        }
      }
      if (text != 0 && index < 5){
        const td = document.createElement('td');
          td.textContent = text+"\xa0\xa0\xa0\xa0\xa0\xa0";
        if (innerArr[5]=="ISLABEL"){
          td.style.backgroundColor='#e74c3c';
          td.style.color='black';
        }
        tr.appendChild(td);
        td.setAttribute("id", "TYPE-"+innerArr[0]+"|PD-"+innerArr[1])
      }
    })
    /*if (ZeroVal.charAt(0) == "."){              //Uncomment if you dont add the label to each day, currently on line 127 / 12 before this one
      const td = document.createElement('td');
      td.textContent = '';
      tr.appendChild(td);
    }*/
    output.appendChild(tr);
    
    
    innerArr[2]=innerArr[7];
    innerArr[3]=innerArr[8]
  })
  
  dataTransfer.innerHTML = JSON.stringify(Times);
}

//setInterval(calc,1000) 
let work = new Worker('/classends3/worker.js');
work.onmessage = (event) => {
  calc();
};
work.postMessage(0);