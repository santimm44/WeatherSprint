import { APIKEY } from "./hidden.js";

let lon = -121.2908;
let lat = 37.9577;

const currentDate = new Date();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


//list of text that will be altered
let lowTempToday = document.getElementById("lowTempToday");
let highTempToday = document.getElementById("highTempToday");
let cityName = document.getElementById("cityName");
let todaysDate = document.getElementById("todaysDate");
let weatherChance = document.getElementById("weatherChance")
let dayOfWeek = document.getElementById("dayOfWeek");
let cardOneDay = document.getElementById("cardOneDay");
let cardTwoDay = document.getElementById("cardTwoDay");
let cardThreeDay = document.getElementById("cardThreeDay");
let cardFourDay = document.getElementById("cardFourDay");
let cardFiveDay = document.getElementById("cardFiveDay");
let cardOneIcon = document.getElementById("cardOneIcon");
let cardTwoIcon = document.getElementById("cardTwoIcon");
let cardThreeIcon = document.getElementById("cardThreeIcon");
let cardFourIcon = document.getElementById("cardFourIcon");
let cardFiveIcon = document.getElementById("cardFiveIcon");



async function weatherForecast(){
    // let apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
    // let returnedData = await apiData.json();

    //cityName.innerText = returnedData.name;
    todaysDate.innerText = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}th, ${currentDate.getFullYear()}`;
    dayOfWeek.innerText = `${days[currentDate.getDay()]}`;
    //weatherChance.innerText = returnedData.weather[0].description; 
    //lowTempToday.innerText = returnedData.main.temp_min; // not accurate. needs to be changed to the actual daily low
    //highTempToday.innerText = returnedData.main.temp_max; // not accurate. needs to be changed to the actual daily high

    cardOneDay.innerText = `${days[dayOfTheWeek(1)]}`;
    cardTwoDay.innerText = `${days[dayOfTheWeek(2)]}`;
    cardThreeDay.innerText = `${days[dayOfTheWeek(3)]}`;
    cardFourDay.innerText = `${days[dayOfTheWeek(4)]}`;
    cardFiveDay.innerText =`${days[dayOfTheWeek(5)]}`;
    
    //cardOneIcon.src = `https://openweathermap.org/img/wn/${returnFiveDayData}@2x.png`
}
//weatherForecast();

function dayOfTheWeek(addedDay){
    let day = currentDate.getDay(); // returns a number between 0(sunday)-6(Saturday)
    
    let returnDay = addedDay + day;
    if (returnDay > 6){
        returnDay -= 7;
    }

    return returnDay
}

async function fiveDayWeatherInformation(){

    let apiData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    let returnedData = await apiData.json();


    for (let i = 0; i <5; i++){
        for(let j=0; j<8; j++){
            cardOneIcon.src = `https://openweathermap.org/img/wn/@2x.png`;
        }
    }
}