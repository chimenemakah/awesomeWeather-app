let currDate = document.querySelector(".date");
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekDay = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

currDate.innerHTML = `${days[weekDay]} ${hours}:${minutes}`;

function displayWeatherConditions(response) {
  console.log(response.data);
  document.querySelector("#city-result").innerHTML = response.data.name;
  celcTemp = response.data.main.temp;
  document.querySelector("#degrees").innerHTML = Math.round(celcTemp);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temp-feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    );
}

function showCity(event) {
  event.preventDefault();
  let apiKey = "5d04b7b417be82583a4d593038371ada";
  let cityName = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherConditions);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

let celcLink = document.querySelector("#celc");
let fahrLink = document.querySelector("#fahr");
let celcTemp = null;

function calcF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degrees");
  let tempF = (celcTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(tempF);
}

fahrLink.addEventListener("click", calcF);

function calcC() {
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round(celcTemp);
}
celcLink.addEventListener("click", calcC);
