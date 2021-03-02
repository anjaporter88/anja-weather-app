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
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
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
  celsiusTemp = response.data.main.temp;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let conditionElement = document.querySelector("#condition-today");
  conditionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#today-icon");
    if(response.data.weather[0].icon === "01d" || response.data.weather[0].icon === "01n") {
      iconElement.setAttribute("class", "fas fa-sun");
    } else if(response.data.weather[0].icon === "02d" || response.data.weather[0].icon === "02n") {
      iconElement.setAttribute("class", "fas fa-cloud-sun");
    } else if(response.data.weather[0].icon === "03d" || response.data.weather[0].icon === "03n") {
      iconElement.setAttribute("class", "fas fa-cloud");
    } else if(response.data.weather[0].icon === "04d" || response.data.weather[0].icon === "04n") {
      iconElement.setAttribute("class", "fas fa-cloud");
    } else if(response.data.weather[0].icon === "09d" || response.data.weather[0].icon === "09n") {
      iconElement.setAttribute("class", "fas fa-cloud-showers-heavy");
    } else if(response.data.weather[0].icon === "10d" || response.data.weather[0].icon === "10n") {
      iconElement.setAttribute("class", "fas fa-cloud-rain");
    } else if(response.data.weather[0].icon === "11d" || response.data.weather[0].icon === "11n") {
      iconElement.setAttribute("class", "fas fa-bolt");
    } else if(response.data.weather[0].icon === "13d" || response.data.weather[0].icon === "13n") {
      iconElement.setAttribute("class", "fas fa-snowflake");
    } else if(response.data.weather[0].icon === "50d" || response.data.weather[0].icon === "50n") {
      iconElement.setAttribute("class", "fas fa-water");
    }
}

//forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  console.log(forecast);

  let iconElement = document.querySelector("#forecast-icon");
    if(forecast.weather[0].icon === "01d" || forecast.weather[0].icon === "01n") {
      iconElement.setAttribute("class", "fas fa-sun");
    } else if(forecast.weather[0].icon === "02d" || forecast.weather[0].icon === "02n") {
      iconElement.setAttribute("class", "fas fa-cloud-sun");
    } else if(forecast.weather[0].icon === "03d" || forecast.weather[0].icon === "03n") {
      iconElement.setAttribute("class", "fas fa-cloud");
    } else if(forecast.weather[0].icon === "04d" || forecast.weather[0].icon === "04n") {
      iconElement.setAttribute("class", "fas fa-cloud");
    } else if(forecast.weather[0].icon === "09d" || forecast.weather[0].icon === "09n") {
      iconElement.setAttribute("class", "fas fa-cloud-showers-heavy");
    } else if(forecast.weather[0].icon === "10d" || forecast.weather[0].icon === "10n") {
      iconElement.setAttribute("class", "fas fa-cloud-rain");
    } else if(forecast.weather[0].icon === "11d" || forecast.weather[0].icon === "11n") {
      iconElement.setAttribute("class", "fas fa-bolt");
    } else if(forecast.weather[0].icon === "13d" || forecast.weather[0].icon === "13n") {
      iconElement.setAttribute("class", "fas fa-snowflake");
    } else if(forecast.weather[0].icon === "50d" || forecast.weather[0].icon === "50n") {
      iconElement.setAttribute("class", "fas fa-water");
    }

  forecastElement.innerHTML = `
  <div class="col-2 forecast">
    <h3 class="hour">
      Hour
    </h3>
    <i class="fas fa-sun" id="forecast-icon">${iconElement}</i>
    <div class="forecast-temp">
      ${Math.round(forecast.main.temp)}
    </div>
    <div class="forecast-condition">
        ${forecast.weather.description}
    </div>
  </div>
  `;
}

function getInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = "da345d2f1976e5624d8b30b8f0e7e000";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;
  let apiCall = `${apiUrl}&appid=${apiKey}`;
  axios.get(apiCall).then(showAll);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiCall).then(displayForecast);
}

let search2 = document.querySelector("#search-engine");
search2.addEventListener("submit", getInfo);

//real conversion
function convertTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let unit = document.querySelector("#unit");
  if (unit.innerHTML === "°C") {
    temp.innerHTML = Math.round(celsiusTemp * 9 / 5 + 32);
    unit.innerHTML = "°F";
  } else {
    temp.innerHTML = Math.round(celsiusTemp);
    unit.innerHTML = "°C";
  }
}

let celsiusTemp = null;

let convert = document.querySelector("#convert-link");
convert.addEventListener("click", convertTemp);

//current location temp
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "da345d2f1976e5624d8b30b8f0e7e000";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showAll);
}

function CurrentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", CurrentLoc);
