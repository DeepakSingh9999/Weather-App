let id = '9ed0b12a6b8e0c60064a487e9deb5e5d';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let url2 = 'https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=50&lon=50&appid=' + id;




let main = document.querySelector('main');
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let visibility = document.getElementById('visibility');
let wind = document.getElementById('wind');
let aqi = document.getElementById('aqi');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(valueSearch.value != ''){
        searchWeather();
    }
})

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.cod == 200){
            city.querySelector('figcaption').innerText = data.name;
            city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
            temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            temperature.querySelector('figcaption span').innerText = data.main.temp;

            let str = data.weather[0].description;
            let newString = str.replace(/^\w/, c => c.toUpperCase());
            description.innerText = newString;

            clouds.innerText = data.clouds.all;
            humidity.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;
            visibility.innerText = data.visibility/1000;
            wind.innerText = data.wind.speed;
            mintemp.innerText = data.main.temp_min;
        }
        
        else{
            //false
            main.classList.add('error');
            setTimeout(() => {
                main.classList.remove('error');
            }, 1000);
        }

        valueSearch.value = '';
    })
}




const initApp = () => {
    valueSearch.value = 'Washington';
    searchWeather();
}

initApp();