const apiKey = '1355bcfc098f8643a94ff3dcb00a65a7';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const searchHistory = [];

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city === '') {
        return;
    }

    const currentWeatherData = await fetchCurrentWeather(city);
    displayCurrentWeather(currentWeatherData);

    const forecastData = await fetchForecast(city);
    displayForecast(forecastData);

    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        updateSearchHistory();
    }

    cityInput.value = ''; 
});

async function fetchCurrentWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        return null;
    }
}

async function fetchForecast(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        return null;
    }
}

function displayCurrentWeather(data) {

    if (!data) {
        
        return;
    }

    currentWeatherSection.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon">  
    `;
}

function displayForecast(data) {

    if (!data) {
        
        return;
    }

    const originalForecastItems = data.list;

    const forecastItems = originalForecastItems.filter((item, index) => { return index % 8 === 0;
    });
    
    forecastSection.innerHTML = `
        <h2>5-Day Forecast</h2>
        <div id="forecast">
            ${forecastItems.map(item => `
                <div>
                    <p>Date: ${item.dt_txt}</p>
                </div>
                <br>
                <div>
                    <p>Temperature: ${item.main.temp} °C</p>
                </div>
                <br>
                <div>
                    <p>Humidity: ${item.main.humidity}%</p>
                </div>
                <br>
                <div>
                    <p>Wind Speed: ${item.wind.speed} m/s</p>
                </div>
                <br>
                <div>
                    <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="weather icon">
                </div>
                <br>
            `).join('')}
        </div>
    `;
    console.log(forecastItems);
    console.log(originalForecastItems);
    console.log(data);
}

function updateSearchHistory() {
   
    const historyList = document.getElementById('search-history');
    historyList.innerHTML = searchHistory.map(city => `<p>${city}</p>`).join('');
}


function init() {
  
    const storedSearchHistory = localStorage.getItem('searchHistory');
    if (storedSearchHistory) {
        searchHistory = JSON.parse(storedSearchHistory);
        updateSearchHistory();
    }
}

init();