//current weather
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//5 day forecast
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

import { APIKEY } from "./hidden.js";

async function todaysWeather(){
    let apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.9577&lon=-121.2908&appid=${APIKEY}`);
    let returnedData = await apiData.json();

    //console.log(returnedData)
    return returnedData;
}
//todaysWeather();


async function fiveDayForecast(){
    let apiData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=37.9577&lon=-121.2908&appid=${APIKEY}`);
    let returnedData = await apiData.json();

    //console.log(returnedData);
    return returnedData;
}

//fiveDayForecast();