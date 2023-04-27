function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
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
var clickstoday = parseInt(getCookie('cookies'))
if (clickstoday == NaN || clickstoday == null || clickstoday == '' || ! clickstoday){clickstoday=0}
  document.getElementById("clickstoday").innerHTML = clickstoday

function goclick(that){
    stopthat(that)
  var clickstoday = parseInt(getCookie('cookies'))
  if (clickstoday == NaN || clickstoday == null || clickstoday == '' || ! clickstoday){clickstoday=0}
  clickstoday = parseInt(clickstoday) + 12
  setCookie('cookies',clickstoday,'99999999999999')
  document.getElementById("clickstoday").innerHTML = clickstoday
}
function stopthat(that){
  var worker= new Worker('./stopthat.js');
  worker.postMessage(that);  
  
  worker.onmessage = function(f,value){
  if (f=="changeIt"){
    that.innerHTML=value
  }
  if (f=="done"){
  worker.close()
  that.innerHTML="Bake 12 cookies"
  }
  if (f==alert){
    alert(value)
  }
};
}

function changeRate(){
  //  return Math.random() * (max - min) + min
  var rate = Math.ceil((Math.random() * (5 - 0.10) + 0.10)*100)/100
  setCookie("rate", rate, 1)
  document.getElementById('rate').innerHTML=rate+""
}
changeRate()

//Cookie to money
function cookieToMoney(){
  var money = parseInt(getCookie('money'))
  var rate = parseInt(getCookie('rate'))
  if (parseInt(getCookie('cookies')) > 0){
  money = Math.ceil(money+(parseInt(getCookie('cookies'))*rate)*100)/100
  setCookie('money', (parseInt(getCookie('money'))+money) , '99999999999999')
  document.getElementById("money").innerHTML = "Money: $"+parseInt(getCookie('money'))
  setCookie('cookies', 0 , '99999999999999')
  var clickstoday = 0
  document.getElementById("clickstoday").innerHTML = clickstoday}
//Set cookie automatically
document.getElementById('money').innerHTML = 'Money: $'+parseInt(getCookie('money'))
  
 if (parseInt(getCookie('cookies')) > 1000000000000000){ //Stop if too much money
    setCookie('money', 0 , "99999999999999")
    document.getElementById('money').innerHTML="Money: $"+money
    setCookie('cookies', 0 , "99999999999999999999")
    alert("You have too much money. Get robbed!")
    window.location.reload()
  }
}

//Taxes every 30 seconds
function tax(){
  var money = parseInt(getCookie('money'))
  var rate = 1000
  money=money-rate
  setCookie('money', money, '99999999')
  document.getElementById('money').innerHTML="Money: $"+money
  if (money<0){
    setCookie('money', 0 , "99999999999999")
    document.getElementById('money').innerHTML="Money: $"+money
    setCookie('cookies', 0 , "99999999999999999999")
    alert("You have gone bankrupt! Lose everything!")
    window.location.reload()
  }
  money=1000
}
  var money = parseInt(getCookie('money'))
  document.getElementById("money").innerHTML = "Money: $"+money
  if (money == 'NaN' || money == null || money == '' || ! money){money=0; setCookie('money', 0, "99999999999999999999999"); document.getElementById("money").innerHTML="Money: $0.00";}
  if (document.getElementById('money').innerHTML == 'Money: $NaN'){money=0; setCookie('money', 0, "99999999999999999999999"); document.getElementById("money").innerHTML="Money: $0.00";}

//Running code
window.setInterval('changeRate()', 10000);
window.setInterval('tax()', 30000);