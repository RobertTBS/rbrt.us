postMessage("TEXT");

onmessage = (event) => {
  setInterval(()=> {
    postMessage("TEST");
  },1000);
};