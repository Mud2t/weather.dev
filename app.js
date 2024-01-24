const apiKey = '24e6f37923d7c45895217fcc313b7983';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('weatherForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const cityInput = document.getElementById('cityInput').value;
  getWeather(cityInput);
});

function getWeather(city) {
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function displayWeather(data) {
  const resultContainer = document.getElementById('weatherResult');

  if (data.cod === '404') {
    resultContainer.innerHTML = '<div class="alert alert-danger" role="alert">City not found. Please try again.</div>';
  } else {
    const weatherHTML = `
      <div class="alert alert-success" role="alert">
        <h4 class="mb-3">${data.name}, ${data.sys.country}</h4>
        <p>Temperature: ${data.main.temp} &deg;C</p>
        <p>Feels Like: ${data.main.feels_like} &deg;C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Wind Direction: ${data.wind.deg} degrees</p>
        <p>Visibility: ${data.visibility} meters</p>
        <p>Cloudiness: ${data.clouds.all}%</p>
        ${data.rain && data.rain['1h'] ? `<p>Rain (last 1h): ${data.rain['1h']} mm</p>` : ''}
        ${data.snow && data.snow['1h'] ? `<p>Snow (last 1h): ${data.snow['1h']} mm</p>` : ''}
      </div>
    `;
    resultContainer.innerHTML = weatherHTML;
  }
}

