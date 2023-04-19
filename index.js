require('dotenv').config();
const rain = require("./images/rain.png");
const clear = require("./images/clear.png");
const clouds = require("./images/clouds.png");
const drizzle = require("./images/drizzle.png");
const mist = require("./images/mist.png");
const humidity = require("./images/humidity.png");
const search = require("./images/search.png");
const snow = require("./images/snow.png");
const wind = require("./images/wind.png");

var mykey = process.env.APIKEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(`${apiUrl}&q=${city}&appid=${mykey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{

        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = clouds;
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = clear;
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = rain;
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = drizzle;
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = mist;
        }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}

searchButton.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})    