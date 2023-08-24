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

    // Fetch current weather data
    const currentWeatherData = await fetchCurrentWeather(city);
    displayCurrentWeather(currentWeatherData);

    // Fetch forecast data
    const forecastData = await fetchForecast(city);
    displayForecast(forecastData);

    // Add city to search history
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        updateSearchHistory();
    }

    cityInput.value = ''; // Clear input
});
