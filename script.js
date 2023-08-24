const apiKey = process.env.OPENWEATHERMAP_API_KEY;
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