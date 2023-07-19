"use strict"
let today = document.getElementById("today");
let todayDate = document.getElementById("todayDate");
let cityLocation = document.getElementById("cityLocation");
let todayDegree = document.getElementById("todayDegree");
let todayIcon = document.getElementById("todayIcon");
let todayDescription = document.getElementById("todayDescription");
let percentage = document.getElementById("percentage");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let nextDay = document.getElementsByClassName("nextDay");
let nextDate = document.getElementsByClassName("nextDate");
let nextDayIcon = document.getElementsByClassName("nextDayIcon");
let nextDayDescription = document.getElementsByClassName("nextDayDescription");
let maxDegree = document.getElementsByClassName("max-degree");
let minDegree = document.getElementsByClassName("min-degree");
let searchBar = document.getElementById("searchBar");
let currentCity = "Cairo";
let apiResponse ;
let responseData ;
let date = new Date();
let weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let monthName = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
async function getWeatherData() {
  apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7eff5b3c1fec4428903172807212609&q=${currentCity}&days=3&aqi=no&alerts=no`);
  responseData = await apiResponse.json();
  console.log(responseData);
  displayTodayWeather();
  displayNextDaysWeather();
};
function displayTodayWeather() {
  let dateApi = responseData.forecast.forecastday[0].date;
  let date_components = dateApi.split("-");
  let current_day = date_components[2];
  today.innerHTML = weekDays[date.getDay()];
  todayDate.innerText = `${current_day} ${monthName[date.getMonth()]}`;
  cityLocation.innerHTML = responseData.location.name;
  todayDegree.innerHTML = Math.round(responseData.current.temp_c);
  todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`);
  todayDescription.innerHTML = responseData.current.condition.text;
  percentage.innerHTML = responseData.current.humidity;
  wind.innerHTML = responseData.current.wind_kph;
  compass.innerText =responseData.current.wind_dir;
};
function getNextDays(nextDateApi) {
  let d = new Date(nextDateApi);
  return d && weekDays[d.getDay()];
};
function getNextDayMonth(nextDateApi) {
  let m = new Date(nextDateApi);
  return m && monthName[m.getMonth()];
};
function displayNextDaysWeather() {
  for(let i = 0;  i < nextDay.length; i++)
  {   
      let nextDateApi = responseData.forecast.forecastday[i+1].date;
      let nextDate_components = nextDateApi.split("-");
      let next_day = nextDate_components[2];
      nextDay[i].innerHTML = getNextDays(nextDateApi);
      nextDate[i].innerHTML = `${next_day} ${getNextDayMonth(nextDateApi)}`;
      nextDayIcon[i].setAttribute("src", `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
      maxDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.maxtemp_c);
      minDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.mintemp_c);
      nextDayDescription[i].innerHTML= responseData.forecast.forecastday[i+1].day.condition.text;
  }
};
searchBar.addEventListener("keyup", function() {
  currentCity = searchBar.value;
  getWeatherData();
});
getWeatherData();