window.addEventListener('load', () => Go("Manchester"));

const API_KEY = "Your API_KEY"

async function getCity(city) {
    const query = `apikey=${API_KEY}&q=${city}`;
    const url = `http://dataservice.accuweather.com/locations/v1/search?${query}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0];
}

async function getWeather(key) {
    const query = `${key}?apikey=${API_KEY}`;
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${query}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0];
}

const searchText = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


const card = document.querySelector('.card');
const cardContent = document.querySelector('.card-content');
const cardImage = document.querySelector('#card-image');
const cardIcon = document.querySelector('#card-icon');

function fillDataInCard(data) {

    const { cardContent1, cardContent2 } = data;
    cardContent.innerHTML = `
        <h3 id="card-title">${cardContent1.EnglishName}</h3>
        <h2 id="card-desc">${cardContent2.WeatherText}</h2>
        <span id="card-temp">${cardContent2.Temperature.Metric.Value}</span><span>&deg;C</span>
    `;
    console.log(cardContent2.WeatherIcon);
    const iconSrc = `assets/${cardContent2.WeatherIcon}.svg`;
    cardIcon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if (cardContent2.IsDayTime) {
        timeSrc = 'assets/day.svg';
    } else {
        timeSrc = 'assets/night.svg';
    }
    cardImage.setAttribute('src', timeSrc);

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

async function bindData(city) {
    console.log(city);
    const cardContent1 = await getCity(city);
    const cardContent2 = await getWeather(cardContent1.Key);
    console.log(cardContent2);
    return {
        cardContent1: cardContent1,
        cardContent2: cardContent2
    }
}

searchButton.addEventListener('click', () => {
    const city = searchText.value;
    if (!city) return;
    // getCity(city);
    searchText.value = '';
    Go(city)
})

function Go(city) {
    bindData(city)
        .then(data => fillDataInCard(data))
        .catch(err => console.log(err));
}

function reload() {
    window.location.reload();
}