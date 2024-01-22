var input = document.getElementById("city");
var btn = document.getElementById("btn");
var dayName = document.getElementById("day");
var dateNum = document.getElementById("date");
var locationName = document.getElementById("location");
var degreeNum = document.getElementById("degree");
var statusName = document.getElementById("status");
var firstImg = document.getElementById("firstImg");
var humidity = document.getElementById("humidity");
var speed = document.getElementById("speed");
var direction = document.getElementById("direction");
var maxDegree = document.getElementsByClassName("degree-2");
var minDegree = document.getElementsByClassName("num");
var txtDegree = document.getElementsByClassName("txt");
var imgData = document.getElementsByClassName("img-data");
var monthNum = document.querySelector(".month-num");
var month = document.querySelector(".month");
var nxtDay = document.getElementsByClassName("nxtDay");

async function getCity(city) {
  var list = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ee52f97537b342b5afc120655242101&q=${city}&days=3`
  );
  var cities = await list.json();
  return cities;
}

function todayData(info) {
  var newDate = new Date();
  dayName.innerText = newDate.toLocaleDateString("en-US", { weekday: "long" });
  monthNum.innerText = newDate.getDate();
  month.innerText = newDate.toLocaleDateString("en-US", { month: "long" });
  locationName.innerText = info.location.name;
  degreeNum.innerText = info.current.temp_c;
  firstImg.setAttribute("src", info.current.condition.icon);
  statusName.innerText = info.current.condition.text;
  humidity.innerText = info.current.humidity + "%";
  speed.innerText = info.current.wind_kph;
  direction.innerText = info.current.wind_dir;
}

function nextDayData(info) {
  var forecastData = info.forecast.forecastday;
  for (var i = 0; i < 2; i++) {
    var nxtDate = new Date(forecastData[i + 1].date);
    nxtDay[i].innerText = nxtDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    maxDegree[i].innerText = forecastData[i + 1].day.maxtemp_c;
    minDegree[i].innerText = forecastData[i + 1].day.mintemp_c;
    txtDegree[i].innerText = forecastData[i + 1].day.condition.text;
    imgData[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
  }
}

async function displayProgarm(city = "cairo") {
  var data = await getCity(city);
  todayData(data);
  nextDayData(data);
}
displayProgarm();

input.addEventListener("input", function () {
  var city = input.value;
  displayProgarm(city);
});
