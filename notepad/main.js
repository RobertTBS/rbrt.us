function saveData(text, filename) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
}

function openFile(){
var file = document.getElementById("file").files[0];
var reader = new FileReader();
reader.onload = function (e) {
  var textArea = document.getElementById("TextImpt");
  textArea.value=e.target.result
  document.getElementById("Title").value=file.name
  document.getElementById("theLabel").innerHTML="Select file - "+file.name
  
};
reader.readAsText(file);
}

function changeSize(thatV){
var impt = document.getElementById("TextImpt")
impt.style.fontSize = thatV+'pt'
}

function changeFont(that){
var TextImpt = document.getElementById("TextImpt")
var fonts = [
  {id:"RO",font:"'Roboto',sans-serif"},
  {id:"RM",font:"'Roboto Mono', monospace"},
  {id:"OP",font:"'Overpass',sans-serif"},
  {id:"PS",font:"'Press Start 2P',cursive"},
  {id:"NO",font:""},
  {id:"CS",font:"'ComicSans',sans-serif"},
  {id:"NR",font:"'TimesNewRoman',sans-serif"},
  
]//  {id:"6",font:"'Roboto',sans-serif"},
fonts.forEach(function(val,index,arr){
if (val.id == that.value){
  TextImpt.style.fontFamily=val.font
}  
})
}