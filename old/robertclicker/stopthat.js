onmessage = function(that){
  alert("Works!")
  postMessage("alert","W")
  that.disabled = true
  var endtime = new Date().getTime()
  endtime=endtime/1000
  endtime = endtime+8 //Seconds to failure
  var d=(new Date().getTime())
  d=d/1000
  while (endtime > d){  
      var d=(new Date().getTime())
      d=d/1000
      var text=endtime-d
      postMessage("changeIt",text.toString());
      if (endtime <= d){
          that.innerHTML="Bake 12 cookies"
          that.disabled = false
        postMessage("done",undefined);
      }
  
  }   


}