const url = `https://gnews.io/api/v4/search?q=`;

const API_KEY = "1038c4e42381ce597f16ce3dd1d21039";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(
        `${url}${query}&lang=en&country=in&apikey=${API_KEY}`
    );
    var data = await res.json();
    data=data["articles"]
    console.log(data);
    bindData(data);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const cardTemp = document.getElementById("template-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image) return;
        const cardClone = cardTemp.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const cardImg = cardClone.querySelector("#card-img");
    const cardTitle = cardClone.querySelector("#card-title");
    const cardSource = cardClone.querySelector("#card-source");
    const cardDesc = cardClone.querySelector("#card-desc");

    cardImg.src = article.image;
    cardTitle.innerHTML = article.title;
    cardDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone: "Asia/Jakarta",
    });

    cardSource.innerHTML = `${article.source.name} • ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
});

function reload() {
    window.location.reload();
}

const toggle = document.getElementById("modeicon");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
const logo = document.getElementById("logo");
const search = document.querySelector("input");

a = [nav, main];

toggle.addEventListener("click", () => {
    toggle.classList.toggle("bi-moon");
    if (toggle.classList.toggle("bi-brightness-high-full")) {
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove("dark");
            a[i].classList.toggle("light");
        }
        search.style.color = "gray";
        search.style.background = "white";
        logo.src = "./assets/logo_light.png";
    } else {
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove("light");
            a[i].classList.toggle("dark");
        }
        search.style.background = "rgb(18, 18, 18)";
        logo.src = "./assets/logo_dark.png";
    }
});
