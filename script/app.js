import { APIKEY } from "./hidden.js";

let lon = -121.2908;
let lat = 37.9577;

const currentDate = new Date();

let lowTempToday = document.getElementById("lowTempToday");
let highTempToday = document.getElementById("highTempToday");
let cityName = document.getElementById("cityName");
let todaysDate = document.getElementById("todaysDate");


async function todaysWeather(){
    let apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    let returnedData = await apiData.json();

    cityName.innerText = returnedData.name;
    todaysDate.innerText = currentDate;
    lowTempToday.innerText = returnedData.main.temp_min;
    highTempToday.innerText = returnedData.main.temp_max;


    //console.log(returnedData)
    //return returnedData;
}
//todaysWeather();


async function fiveDayForecast(){
    let apiData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=37.9577&lon=-121.2908&appid=${APIKEY}`);
    let returnedData = await apiData.json();

    //console.log(returnedData);
    return returnedData;
}

//fiveDayForecast();