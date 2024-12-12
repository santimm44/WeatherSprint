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

let cardOneLowTemp= document.getElementById("cardOneLowTemp");
let cardTwoLowTemp= document.getElementById("cardTwoLowTemp");
let cardThreeLowTemp= document.getElementById("cardThreeLowTemp");
let cardFourLowTemp= document.getElementById("cardFourLowTemp");
let cardFiveLowTemp= document.getElementById("cardFiveLowTemp");

let cardOneHighTemp= document.getElementById("cardOneHighTemp");
let cardTwoHighTemp= document.getElementById("cardTwoHighTemp");
let cardThreeHighTemp= document.getElementById("cardThreeHighTemp");
let cardFourHighTemp= document.getElementById("cardFourHighTemp");
let cardFiveHighTemp= document.getElementById("cardFiveHighTemp");

let cardOneDescription = document.getElementById("cardOneDescription");
let cardTwoDescription = document.getElementById("cardTwoDescription");
let cardThreeDescription = document.getElementById("cardThreeDescription");
let cardFourDescription = document.getElementById("cardFourDescription");
let cardFiveDescription = document.getElementById("cardFiveDescription");

let inputField = document.getElementById("inputField");

async function weatherForecast(searchCityName){
      let apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCityName}&appid=${APIKEY}&units=imperial`);
      let returnedData = await apiData.json();

    cityName.innerText = returnedData.name;
    todaysDate.innerText = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}th, ${currentDate.getFullYear()}`;
    dayOfWeek.innerText = `${days[currentDate.getDay()]}`;
    weatherChance.innerText = returnedData.weather[0].description; 
    lowTempToday.innerText = returnedData.main.temp_min; // not accurate. needs to be changed to the actual daily low
    highTempToday.innerText = returnedData.main.temp_max; // not accurate. needs to be changed to the actual daily high

    cardOneDay.innerText = `${days[dayOfTheWeek(1)]}`;
    cardTwoDay.innerText = `${days[dayOfTheWeek(2)]}`;
    cardThreeDay.innerText = `${days[dayOfTheWeek(3)]}`;
    cardFourDay.innerText = `${days[dayOfTheWeek(4)]}`;
    cardFiveDay.innerText =`${days[dayOfTheWeek(5)]}`;
}


function dayOfTheWeek(addedDay){
    let day = currentDate.getDay(); // returns a number between 0(sunday)-6(Saturday)
    
    let returnDay = addedDay + day;
    if (returnDay > 6){
        returnDay -= 7;
    }

    return returnDay
}

async function fiveDayWeatherInformation(searchCityName){

     let apiData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCityName}&appid=${APIKEY}&units=imperial`);
     let returnedData = await apiData.json();

    let weatherLowTemp = [];
    let weatherLowTempVar = returnedData.list[0].main.temp_min;
    let weatherHighTemp = [];
    let weatherHighTempVar = returnedData.list[0].main.temp_max;
    let weatherIcon = [];
    let weatherIconVar = "";
    let weatherdescription = [];
    let weatherdescriptionVar = ""; 
    
    //for loop... should alter the cards temp for 
    //low, high, icon, and description
    for (let i = 0; i < 40; i++){
       if(i%8==0){
        weatherLowTemp.push(weatherLowTempVar);
        weatherHighTemp.push(weatherHighTempVar);
        weatherIcon.push(returnedData.list[i].weather[0].icon);
        weatherdescription.push(returnedData.list[i].weather[0].description);


        weatherLowTempVar = returnedData.list[i].main.temp_min;
        weatherHighTempVar = returnedData.list[i].main.temp_max;
       } 
       if (weatherLowTempVar > returnedData.list[i].main.temp_min){
        weatherLowTempVar = returnedData.list[i].main.temp_min;
       }
       if(weatherHighTempVar < returnedData.list[i].main.temp_max){
        weatherHighTempVar = returnedData.list[i].main.temp_max;
        weatherdescription[i==0 ? 0 : Math.floor(i/8)] = returnedData.list[i].weather[0].description;
        weatherIcon[[i==0 ? 0 : Math.floor(i/8)]] = returnedData.list[i].weather[0].icon;
       }
       if(i==39){
        weatherLowTemp.push(weatherLowTempVar);
        weatherHighTemp.push(weatherHighTempVar);
        weatherIcon.push(weatherIconVar);
        weatherdescription.push(weatherdescriptionVar);        
       }
    }
    //Not in for loop
    cardOneLowTemp.innerText = weatherLowTemp[0];
    cardOneHighTemp.innerText = weatherHighTemp[0];
    cardOneIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[0]}@2x.png`;
    cardOneIcon.alt = weatherdescription[0];
    cardOneDescription.innerText = weatherdescription[0];

    cardTwoLowTemp.innerText = weatherLowTemp[1];
    cardTwoHighTemp.innerText = weatherHighTemp[1];
    cardTwoIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[1]}@2x.png`;
    cardTwoIcon.alt = weatherdescription[1];
    cardTwoDescription.innerText = weatherdescription[1];
    
    cardThreeLowTemp.innerText = weatherLowTemp[2];
    cardThreeHighTemp.innerText = weatherHighTemp[2];
    cardThreeIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[2]}@2x.png`;
    cardThreeIcon.alt = weatherdescription[2];
    cardThreeDescription.innerText = weatherdescription[2];

    cardFourLowTemp.innerText = weatherLowTemp[3];
    cardFourHighTemp.innerText = weatherHighTemp[3];
    cardFourIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[3]}@2x.png`;
    cardFourIcon.alt = weatherdescription[3];
    cardFourDescription.innerText = weatherdescription[3];
    
    cardFiveLowTemp.innerText = weatherLowTemp[4];
    cardFiveHighTemp.innerText = weatherHighTemp[4];
    cardFiveIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[4]}@2x.png`;
    cardFiveIcon.alt = weatherdescription[4];
    cardFiveDescription.innerText = weatherdescription[4];
    

    console.log(weatherIcon);
    console.log(weatherdescription);

    //cardOneIcon.src = `https://openweathermap.org/img/wn/@2x.png`;
}

inputField.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        //take the input value
        weatherForecast(inputField.value);
        fiveDayWeatherInformation(inputField.value);
        // pass it to the weatherAPI
    }
})

//fiveDayWeatherInformation()
//weatherForecast();