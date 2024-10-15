if (window.location.toString().substring(0,18) == "https://rbrt-web.g"){alert("You are using the test site!")}
function timeto(){
let time = 0;
let now = new Date()
let to = new Date("04/23/2023"); 
let time_difference = to.getTime() - now.getTime();  
let days = time_difference / (1000 * 60 * 60 * 24);  
document.getElementById("time").innerHTML = Math.floor(days)+2+" days"
}
timeto()

function schoolstart(){
const currentDate = new Date();
const targetDate = new Date("May 28, 2025 15:15:00");
const timeDiff = targetDate.getTime() - currentDate.getTime();

const Day = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
const Hour = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const Min = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
const Sec = Math.floor((timeDiff % (1000 * 60)) / 1000);
document.getElementById("schoolstart").innerHTML = Day+" days, "+Hour+" hours, "+Min+" minutes, and "+Sec+" seconds"
}
schoolstart()
setInterval(schoolstart,1000)

function winsupport(){
const currentDate = new Date();
const targetDate = new Date("October 14, 2025");
const timeDiff = targetDate.getTime() - currentDate.getTime();

const Day = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
document.getElementById("winsupport").innerHTML = Day+" days"
}
winsupport()
setInterval(winsupport,1000)

//Weather widget code

const input = document.getElementById("CustomWeatherInput");
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    weatherFor("~CUSTOM~")
  }
});


const numberOfPeriods = 3; //Number of half days you want to show
const CitySetTo = document.getElementById("CurrentLocation")
function weatherFor(city){
  if (city != "~CUSTOM~"){ //Add an Iowa to the end of defaults
    city = city+", Iowa"
  }else{ //Set city variable to custom city
    city = document.getElementById('CustomWeatherInput').value 
  }
  city=city+", United States" //Only request cities in the USA
  
  //Get location details from OSM Nominitum. This is for the name, and the coordinates.
  let xmlhttp = new XMLHttpRequest();
  let url = "https://nominatim.openstreetmap.org/search?addressdetails=1&q="+city+"&format=jsonv2";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let cityArr=JSON.parse(xmlhttp.response);
      let SelectedCity = cityArr[0]
      CitySetTo.innerHTML = SelectedCity.name+", "+SelectedCity.address.state
      
      //Get weird coordinate data from the NWS.
      
      url = "https://api.weather.gov/points/"+SelectedCity.lat+","+SelectedCity.lon;
      let xmlhttp2 = new XMLHttpRequest();
      xmlhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let NWRPointArr = JSON.parse(xmlhttp2.response);
          let PointProperties = NWRPointArr;
          url = PointProperties.properties.forecast;
          let xmlhttp3 = new XMLHttpRequest();
          xmlhttp3.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              let WeatherArr = JSON.parse(xmlhttp3.response).properties.periods;
              WeatherArr.forEach(function(ThisTimespan,time){ //Calculate for each, I'm only using one for now
                if (time < numberOfPeriods){
                  ThisTimespan.windSpeed = parseInt(ThisTimespan.windSpeed)
                  //Calculate wind chill
                  ThisTimespan.windChill = Math.round(35.74 + (0.6215 * ThisTimespan.temperature) - (35.75 * Math.pow(ThisTimespan.windSpeed,.16)) + (0.4275 * ThisTimespan.temperature * Math.pow(ThisTimespan.windSpeed,.16)))
                  
                  //Get wind speed direction as a degree, it's annoying, I know
                  switch(ThisTimespan.windDirection){
                    case "W": ThisTimespan.windDirection = -90; break;
                    case "WNW": ThisTimespan.windDirection = -45-22.5; break;
                    case "NW": ThisTimespan.windDirection = -45; break;
                    case "NNW": ThisTimespan.windDirection = -22.5; break;
                    case "N": ThisTimespan.windDirection = 0; break;
                    case "NNE": ThisTimespan.windDirection = 22.5; break;
                    case "NE": ThisTimespan.windDirection = 45; break;
                    case "ENE": ThisTimespan.windDirection = 45+22.5; break;
                    case "E": ThisTimespan.windDirection = 90; break;
                    case "ESE": ThisTimespan.windDirection = 90+22.5; break;
                    case "SE": ThisTimespan.windDirection = 90+45; break;
                    case "SSE": ThisTimespan.windDirection = 90+45+22.5; break;
                    case "S": ThisTimespan.windDirection = 180; break;
                    case "SSW": ThisTimespan.windDirection = -90-45-22.5; break;
                    case "SW": ThisTimespan.windDirection = -90-45; break;
                    case "WSW": ThisTimespan.windDirection = -90-22.5; break;
                    default: break;
                  }
                    ThisTimespan.windDirection = ThisTimespan.windDirection-180
                  
                  if (time==0){
                    //Set stuff
                    document.getElementById("NowName").innerHTML = ThisTimespan.name
                    document.getElementById("WindSpeed").innerHTML = ThisTimespan.windSpeed
                    //Rotate wind arrow
                    document.getElementById("RotateMe").style.transform = "rotate("+ThisTimespan.windDirection+"deg)" 
                    document.getElementById("Degrees").innerHTML = ThisTimespan.temperature + "&deg;";
                    //Set wind chill
                    if (ThisTimespan.temperature <= 50 && ThisTimespan.windSpeed > 3){
                      document.getElementById("Feels").innerHTML = ThisTimespan.windChill + "&deg;";
                    }else{
                      document.getElementById("Feels").style.display = "none";
                      document.getElementById("FeelsDesc").style.display = "none";
                    }
                  }
                }
              });
              let xmlhttp4 = new XMLHttpRequest();
              url = "https://api.weather.gov/alerts/active?zone="+ PointProperties.properties.county.split("county/")[1]
              xmlhttp4.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  let AlertsArr = JSON.parse(xmlhttp4.response).features;
                  document.getElementById("AlertsBox").innerHTML = "";
                  AlertsArr.forEach(function(ThisEvent,time){
                    let p = document.createElement("p");
                    p.innerHTML = "<b>"+ThisEvent.properties.event+"</b>";
                    p.title = ThisEvent.properties.description +"\n\n" + ThisEvent.properties.instruction;
                    document.getElementById("AlertsBox").appendChild(p);
                  });
                }
              }
              xmlhttp4.open("GET", url, true);
              xmlhttp4.send();
            }
          };
          xmlhttp3.open("GET", url, true);
          xmlhttp3.send();
        }
      };
      xmlhttp2.open("GET", url, true);
      xmlhttp2.send();
    
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

weatherFor('Alleman') //Start it up