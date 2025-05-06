
// Function that gets the weather 
function getWeather(){
// defining the open weather map api key. 
// Now that it is defined and linked we can use this api to do different tasks that the program needs
    const apiKey = '2879283429a34e4755b1890a52597b4c';
    const city = document.getElementById('city').value;

// Creating city variable that will store the city entered by the User
    //checking if the input recied by user is empty and alerting the user accordingly
    if (!city) {
        alert('Please enter a city');
        return;
    }

    //constructing the URLs for the current weather and the forecast based on entered city and api key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    //now we fetch the data using the current URL
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data: ', error);
            alert('Error fetching current weather data. Please try again.');
        });

        //fetching the hourly forecast data
        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                displayHourlyForecast(data.list);
            })
            .catch(error => {
                console.error('Error fetching hourly forecast data:', error);
                alert('Error fetching hourly forecast data. Please try again.');

            });


function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Ensures that all weather info is displayed clearly 
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404'){
        weatherInfoDiv.innerHTML = '<p>The city entered is not recognized.</p>';
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
        const temperatureHTML = `
        <p>${temperature}°C</p>
        `;
    
        const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();

    }
}
    function displayHourlyForecast(hourlyData){

        const hourlyForecastDiv = document.getElementById('hourly-forecast');
        const next24Hours = hourlyData.slice(0,8);

        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000);
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

            const hourlyItemHtml = `
            <div class="hourly-item">
                <p><span>${hour}:00</span></p>

                <img src="${iconUrl}" alt = "Hourly Weather Icon">
                                   
                <p><span>${temperature}°C </span></p>
                </div>
                `;
                hourlyForecastDiv.innerHTML += hourlyItemHtml;



        });

    }
    function showImage(){
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';
    }
  



}

