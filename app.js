const api = {
    baseUrl: "https://api.openweathermap.org/data/2.5/",
    key: "6a00a45fd8b0ea17435e84a55f491303"
};

const searchBox = document.querySelector('.search-box');

const searchQuery = (event) => {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
    }
};

const getResults = (query) => {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => weather.json())
        .then(displayData);
};

const displayData = (weather) => {
    let city = document.querySelector('.city');
    let date = document.querySelector('.date');
    let currentTemp = document.querySelector('.temp');
    let weatherDescription = document.querySelector('.weather');
    let hiLowTemp = document.querySelector('.hi-low');

    let today = new Date();
    date.innerText = dateBuilder(today);
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    currentTemp.innerHTML = `${Number.parseInt(weather.main.temp).toFixed(0)}<span>°C</span>`;
    weatherDescription.innerHTML = `${weather.weather[0].main} <span><img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"></img></span>`;
    hiLowTemp.innerText = `${Number.parseInt(weather.main.temp_min).toFixed(0)}° | ${Number.parseInt(weather.main.temp_max).toFixed(0)}°`;
};

const dateBuilder = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let dayLiteral = days[date.getDay()];
    let dateLiteral = date.getDate();
    let monthLiteral = months[date.getMonth()];
    let year = date.getFullYear();

    return `${dayLiteral}, ${dateLiteral} ${monthLiteral} ${year}`;
};

searchBox.addEventListener('keypress', searchQuery);
getResults('Montevideo');
