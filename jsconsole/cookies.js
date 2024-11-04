//Set cookies button
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var button = document.getElementById("btn");

button.addEventListener("click", function () {
  //alert("Made")
  var cookiename = document.getElementById("Name").value;
  var cookiecontent = document.getElementById("Content").value;
  var expire = document.getElementById("Date").value;

  const d = new Date();
  d.setTime(d.getTime() + expire * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cookiename + "=" + cookiecontent + ";" + expires + ";path=/";

  var btn = document.createElement("button");
  btn.id = cookiename;
  btn.innerHTML = cookiename;
  btn.style.display = "block";
  btn.style.margin = "0 auto";
  btn.onclick = function () {
    delet(this.id, this);
  };
  document.body.appendChild(btn);
});

//Display all cookies
let cookies = document.cookie;

let pa = document.getElementById("pa");
var out = "'" + cookies.split("=").join("' '") + "' ";
var out = cookies.split(/[;=\s]+/);

let x = out.filter((element, index) => {
  return index % 2 === 0;
});

function createButton(names) {
  names.forEach(function (y) {
    var btn = document.createElement("button");
    btn.id = y;
    btn.innerHTML = y;
    // \/ delet(this.id, this);
    btn.style.display = "block";
    btn.style.margin = "0 auto";
    btn.onclick = function () {
      delet(this.id, this);
    };
    document.body.appendChild(btn);
  });
}

createButton(x);
function delet(id, is) {
  document.cookie = id + "=nil; max-age=0; path=/;";
  //  document.cookie= id+";max-age=0"
  //  var bt = document.createElement("p")
  //  bt.innerHTML=id
  //  document.body.appendChild(bt+"")
  is.remove();
}

// [1, 3, 5, 7, 9]
