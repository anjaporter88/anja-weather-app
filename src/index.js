//displaying day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let dayAndTime = document.querySelector("#date");
dayAndTime.innerHTML = `${day} ${hours}:${minutes}`;

//displaying city
function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityOutput = document.querySelector("#city");
  cityOutput.innerHTML = `${city.value}`;
}

let search = document.querySelector("#search-engine");
search.addEventListener("submit", displayCity);

//displaying all info
function showAll(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let conditionElement = document.querySelector("#condition-today");
  conditionElement.innerHTML = response.data.weather[0].description;
}

function getInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = "da345d2f1976e5624d8b30b8f0e7e000";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;
  let apiCall = `${apiUrl}&appid=${apiKey}`;
  axios.get(apiCall).then(showAll);
}

let search2 = document.querySelector("#search-engine");
search2.addEventListener("submit", getInfo);

// fake conversion
function convertTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let unit = document.querySelector("#unit");
  if (Number(temp.innerHTML) === 17) {
    temp.innerHTML = 63;
    unit.innerHTML = "°F";
  } else {
    temp.innerHTML = 17;
    unit.innerHTML = "°C";
  }
}

let fakeConvert = document.querySelector("#convert-link");
fakeConvert.addEventListener("click", convertTemp);

//current location temp
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "da345d2f1976e5624d8b30b8f0e7e000";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function CurrentLoc(response) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", CurrentLoc);
