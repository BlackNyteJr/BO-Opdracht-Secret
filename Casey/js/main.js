function AddCard(title, price, detail, image){
    let list = document.getElementById("cards--js");
    let article = document.createElement("article");
    article.innerHTML = 
            `<img class="productimg" src="${image}" alt="">
            <h1>${title}</h1>
            <p>Price: $${price}</p>
            <p>${detail}</p>`;
            article.className = "card";
    list.append(article);
    list.appendChild(article);
}

async function GetData() {
    const response = await fetch("js/index.json");
    const data = await response.json();
    for (let i = 0; i < data.Cards.length; i++) {
        AddCard(data.Cards[i].title, data.Cards[i].price, data.Cards[i].detail, data.Cards[i].image);
}}
GetData();