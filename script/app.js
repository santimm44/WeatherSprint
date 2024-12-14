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
let mainWeatherIcon = document.getElementById("mainWeatherIcon");

async function weatherForecast(searchCityName) {
    let apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCityName}&appid=${APIKEY}&units=imperial`);
    let returnedData = await apiData.json();

    cityName.innerText = returnedData.name;
    todaysDate.innerText = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}th, ${currentDate.getFullYear()}`;
    dayOfWeek.innerText = `${days[currentDate.getDay()]}`;
    mainWeatherIcon.src = `https://openweathermap.org/img/wn/${returnedData.weather[0].icon}@2x.png`;
    mainWeatherIcon.alt = returnedData.weather[0].description;
    weatherChance.innerText = `${returnedData.main.temp}°F ${returnedData.weather[0].description}`;
    lowTempToday.innerText = `${returnedData.main.temp_min}°F`; // not accurate. needs to be changed to the actual daily low
    highTempToday.innerText = `${returnedData.main.temp_max}°F`; // not accurate. needs to be changed to the actual daily high

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

    //for loop to alter the cards
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
    cardOneLowTemp.innerText = `${weatherLowTemp[0]}°F`;
    cardOneHighTemp.innerText = `${weatherHighTemp[0]}°F`;
    cardOneIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[0]}@2x.png`;
    cardOneIcon.alt = weatherdescription[0];
    cardOneDescription.innerText = weatherdescription[0];

    cardTwoLowTemp.innerText = `${weatherLowTemp[1]}°F`;
    cardTwoHighTemp.innerText = `${weatherHighTemp[1]}°F`;
    cardTwoIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[1]}@2x.png`;
    cardTwoIcon.alt = weatherdescription[1];
    cardTwoDescription.innerText = weatherdescription[1];

    cardThreeLowTemp.innerText = `${weatherLowTemp[2]}°F`;
    cardThreeHighTemp.innerText = `${weatherHighTemp[2]}°F`;
    cardThreeIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[2]}@2x.png`;
    cardThreeIcon.alt = weatherdescription[2];
    cardThreeDescription.innerText = weatherdescription[2];

    cardFourLowTemp.innerText = `${weatherLowTemp[3]}°F`;
    cardFourHighTemp.innerText = `${weatherHighTemp[3]}°F`;
    cardFourIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[3]}@2x.png`;
    cardFourIcon.alt = weatherdescription[3];
    cardFourDescription.innerText = weatherdescription[3];

    cardFiveLowTemp.innerText = `${weatherLowTemp[4]}°F`;
    cardFiveHighTemp.innerText = `${weatherHighTemp[4]}°F`;
    cardFiveIcon.src = `https://openweathermap.org/img/wn/${weatherIcon[4]}@2x.png`;
    cardFiveIcon.alt = weatherdescription[4];
    cardFiveDescription.innerText = weatherdescription[4];
}

inputField.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weatherForecast(inputField.value);
        fiveDayWeatherInformation(inputField.value);
    }
})

let hideCreatedElements = false;
inputField.addEventListener("click", function () {
    //drop down will populate the favorites of the user

    createElements();

    if (hideCreatedElements == false) {
        searchbar.classList.add("drop-down__hide-div");
        hideCreatedElements = true;
    }
    else if (hideCreatedElements == true) {
        searchbar.classList.remove("drop-down__hide-div");
        hideCreatedElements = false;
        listenToDocument = false;
    }
})
let listenToDocument = false;
document.addEventListener("click", function () {
    //this function will add a class to hide the drop down
    if (hideCreatedElements == false && listenToDocument == true) {
        searchbar.classList.add("drop-down__hide-div");
        hideCreatedElements = true;
        listenToDocument = false;
    }
    else {
        listenToDocument = true;
    }
})

favoriteDiv.addEventListener("click", function () {
    //function will change the star icon to solid and add city to the favorite or remove it from the favorites
    let favoriteDiv = document.getElementById("favoriteDiv");
    let currentSVG = favoriteDiv.querySelector("svg");

    if (currentSVG.classList.contains("star-regular")) {
        favoriteDiv.innerHTML = `<svg class="star star-favorite" alt="star icon - favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`;
        saveToLocalStorage(cityName.innerText);
    } else {
        favoriteDiv.innerHTML = `<svg class="star star-regular" alt="star icon - regular" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>`;
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
    let favoriteHeader = document.createElement("p");
    let favoriteHeaderDiv = document.createElement("div");

    favoriteHeader.innerText = "Favorites";
    favoriteHeader.className = "favorite-header";
    favoriteHeaderDiv.className = "drop-down__create-div";
    searchbar.appendChild(favoriteHeaderDiv);
    favoriteHeaderDiv.appendChild(favoriteHeader);
    searchbar.innerHTML = ``;

    favoriteList.map(cities => {
        let p = document.createElement("p");
        let div = document.createElement("div");
        const refreshSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let starSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        refreshSVG.setAttribute("viewBox", "0 0 512 512");
        refreshSVG.innerHTML = `<path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>`;
        refreshSVG.classList.add("icon-small")

        starSVG.setAttribute("viewBox", "0 0 576 512");
        starSVG.innerHTML = `<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>`
        starSVG.classList.add("star-favorite", "icon-small");

        div.className = "drop-down__create-div";
        div.id = cities;
        p.innerText = cities;
        div.style.justifyContent = "space-between";

        searchbar.appendChild(div);
        div.appendChild(refreshSVG);
        div.appendChild(p);
        div.appendChild(starSVG);

        starSVG.addEventListener("click", function () {
            if (starSVG.classList.contains("star-regular")) {
                starSVG.innerHTML = `<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>`;
                starSVG.classList.add("star-favorite");
                starSVG.classList.remove("star-regular");
                saveToLocalStorage(p.innerText);
            } else {
                starSVG.innerHTML = `<path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>`;
                starSVG.classList.add("star-regular", "icon-small")
                starSVG.classList.remove("star-favorite");
                alert(starSVG.classList);
                removeFromLocalStorage(cities);
            }
        })

        document.getElementById(cities).addEventListener("click", function () {
            weatherForecast(p.innerText);
            fiveDayWeatherInformation(p.innerText);
        })
    })
}

navigator.geolocation.getCurrentPosition(success, errorFunct)

async function success(position) {

    let lon = position.coords.longitude;
    let lat = position.coords.latitude;


    let fetchdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    let apiData = await fetchdata.json();

    let retrievedCityName = apiData.name;
    alert(retrievedCityName)
    weatherForecast(retrievedCityName);
    fiveDayWeatherInformation(retrievedCityName);
}

function errorFunct() {
    //return a default. The first city in storage
    let favoriteList = getFromLocalStorage();

    weatherForecast(favoriteList[0]);
    fiveDayWeatherInformation(favoriteList[0]);
}
