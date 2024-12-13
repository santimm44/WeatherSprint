import { APIKEY } from "./hidden.js";

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

let cardOneLowTemp = document.getElementById("cardOneLowTemp");
let cardTwoLowTemp = document.getElementById("cardTwoLowTemp");
let cardThreeLowTemp = document.getElementById("cardThreeLowTemp");
let cardFourLowTemp = document.getElementById("cardFourLowTemp");
let cardFiveLowTemp = document.getElementById("cardFiveLowTemp");

let cardOneHighTemp = document.getElementById("cardOneHighTemp");
let cardTwoHighTemp = document.getElementById("cardTwoHighTemp");
let cardThreeHighTemp = document.getElementById("cardThreeHighTemp");
let cardFourHighTemp = document.getElementById("cardFourHighTemp");
let cardFiveHighTemp = document.getElementById("cardFiveHighTemp");

let cardOneDescription = document.getElementById("cardOneDescription");
let cardTwoDescription = document.getElementById("cardTwoDescription");
let cardThreeDescription = document.getElementById("cardThreeDescription");
let cardFourDescription = document.getElementById("cardFourDescription");
let cardFiveDescription = document.getElementById("cardFiveDescription");

let inputField = document.getElementById("inputField");
let searchbar = document.getElementById("searchbar");

async function weatherForecast(searchCityName) {
    let apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCityName}&appid=${APIKEY}&units=imperial`);
    let returnedData = await apiData.json();

    cityName.innerText = returnedData.name;
    todaysDate.innerText = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}th, ${currentDate.getFullYear()}`;
    dayOfWeek.innerText = `${days[currentDate.getDay()]}`;
    weatherChance.innerText = returnedData.weather[0].description;
    lowTempToday.innerText = returnedData.main.temp_min; // not accurate. needs to be changed to the actual daily low
    highTempToday.innerText = returnedData.main.temp_max; // not accurate. needs to be changed to the actual daily high

    let cityArray = getFromLocalStorage();
    if (cityArray.includes(cityName.innerText)) {
        favoriteDiv.innerHTML = `<svg class="star star-favorite" alt="star icon - favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`;
    }
    else {
        favoriteDiv.innerHTML = `<svg class="star star-regular" alt="star icon - regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>`;
    }

    cardOneDay.innerText = `${days[dayOfTheWeek(1)]}`;
    cardTwoDay.innerText = `${days[dayOfTheWeek(2)]}`;
    cardThreeDay.innerText = `${days[dayOfTheWeek(3)]}`;
    cardFourDay.innerText = `${days[dayOfTheWeek(4)]}`;
    cardFiveDay.innerText = `${days[dayOfTheWeek(5)]}`;
}

function dayOfTheWeek(addedDay) {
    let day = currentDate.getDay(); // returns a number between 0(sunday)-6(Saturday)

    let returnDay = addedDay + day;
    if (returnDay > 6) {
        returnDay -= 7;
    }

    return returnDay
}

async function fiveDayWeatherInformation(searchCityName) {

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
    for (let i = 0; i < 40; i++) {
        if (i % 8 == 0) {
            weatherLowTemp.push(weatherLowTempVar);
            weatherHighTemp.push(weatherHighTempVar);
            weatherIcon.push(returnedData.list[i].weather[0].icon);
            weatherdescription.push(returnedData.list[i].weather[0].description);


            weatherLowTempVar = returnedData.list[i].main.temp_min;
            weatherHighTempVar = returnedData.list[i].main.temp_max;
        }
        if (weatherLowTempVar > returnedData.list[i].main.temp_min) {
            weatherLowTempVar = returnedData.list[i].main.temp_min;
        }
        if (weatherHighTempVar < returnedData.list[i].main.temp_max) {
            weatherHighTempVar = returnedData.list[i].main.temp_max;
            weatherdescription[i == 0 ? 0 : Math.floor(i / 8)] = returnedData.list[i].weather[0].description;
            weatherIcon[[i == 0 ? 0 : Math.floor(i / 8)]] = returnedData.list[i].weather[0].icon;
        }
        if (i == 39) {
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
}

inputField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        //take the input value
        // pass it to the weatherAPI
        weatherForecast(inputField.value);
        fiveDayWeatherInformation(inputField.value);
    }
})


inputField.addEventListener("click", function () {
    //i want to create a dropdown when user clicks the search bar
    //drop down will populate the favorites of the user

    createElements();
})

favoriteDiv.addEventListener("click", function () {
    //Below should change the star icon to solid and add something to the favorite or remove it from the favorites
    let favoriteDiv = document.getElementById("favoriteDiv");
    let currentSVG = favoriteDiv.querySelector("svg");

    if (currentSVG.classList.contains("star-regular")) {
        favoriteDiv.innerHTML = `<svg class="star star-favorite" alt="star icon - favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`;
        //beneath I will need to add the city to the list of favorites in the local storage
        //saveToLocalStorage() //pass in city name to create key
        saveToLocalStorage(cityName.innerText);
    } else {
        favoriteDiv.innerHTML = `<svg class="star star-regular" alt="star icon - regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>`;
        //beneath I will need to remove the city from the list of favorites in the local storage.
        //removeFromLocalStorage() //pass in city name to remove key
        removeFromLocalStorage(cityName.innerText);
    }
})

function saveToLocalStorage(storeCityName) {
    let cityArray = getFromLocalStorage();

    if (!cityArray.includes(storeCityName)) {
        cityArray.push(storeCityName);
    }

    localStorage.setItem("storedCityNames", JSON.stringify(cityArray));

}

function removeFromLocalStorage(removeCityName) {
    let cityArray = getFromLocalStorage();

    let nameIndex = cityArray.indexOf(removeCityName);

    cityArray.splice(nameIndex, 1);

    localStorage.setItem("storedCityNames", JSON.stringify(cityArray));
}

function getFromLocalStorage() {
    let localStorageData = localStorage.getItem("storedCityNames");

    if (localStorageData == null) {
        return []
    }
    return JSON.parse(localStorageData);
}

function createElements() {
    let favoriteList = getFromLocalStorage();

    favoriteList.map(cities => {
        console.log(cities)
        let p = document.createElement("p");
        let div = document.createElement("div");
        div.className = "drop-down__create-div";
        div.id = cities;
        p.innerText = cities;


        searchbar.appendChild(div);
        div.appendChild(p);

        document.getElementById(cities).addEventListener("click", function () {
            weatherForecast(p.innerText);
            fiveDayWeatherInformation(p.innerText);
        })
    })
}