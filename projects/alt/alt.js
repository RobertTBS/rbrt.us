      let str = "";
      var colors = [];
      let currColor = -1;
    function ALT(that){
      str = "";
      for (let i=0;i<that.value.length;i++){
//        console.log(colors);
        if (that.value.substring(i,i+1) == " "){
          str=str+"<span> </span>"
        }else{ 
          str=str+'<span style="color:'+colors[currColor]+'">'+that.value.substring(i,i+1)+"</span>";
 //         console.log(currColor)
          if (currColor >= colors.length-1){
            currColor=0;
          }else{currColor++;};
        };
      };
      document.getElementById("out").innerHTML = str;
 //     console.log(document.getElementById("out").innerHTML)
    };
      ALT(document.getElementById("in"));
      
      document.getElementById("arr").value = colors;
      function set(that){
        
        //colors = [];
        
        colors=that.value.split(",");
        ALT(document.getElementById("in"));
        
      };

function copy(){
  alert(str);;
}