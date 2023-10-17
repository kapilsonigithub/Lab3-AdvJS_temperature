const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }

  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then((response)=>{
        console.log(response)
        displayResults(response)});
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temperature = document.querySelector('.present .temperature');
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let feels_like = document.querySelector('.present .feels_like');
    feels_like.innerHTML = `${Math.round(weather.main.feels_like)}<span>°c</span>`;

    let humidity = document.querySelector('.present .humidity');
    humidity.innerHTML = `${Math.round(weather.main.humidity)}<span>°c</span>`;

    let weather_el = document.querySelector('.present .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi_low');
    hilow.innerText = `${Math.round(weather.main.temp_max)}°c / ${Math.round(weather.main.temp_min)}°c`;
  }
  
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;}

