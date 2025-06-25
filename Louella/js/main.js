function AddCard(container, title, price, details) {
    let article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
        <h1>${title}</h1>
        <p>price : $${price},-</p>
        <p class="details">${details}</p>
    `;
    container.appendChild(article);
}

async function GetData() {
    const response = await fetch("js/index.json");
    const data = await response.json();
    
    let filteredList = data.cards.filter(product => product.price < 20)
    const squares = document.querySelectorAll(".square");

    for (let i = 0; i < data.cards.length && i < squares.length; i++) {
        AddCard(squares[i], data.cards[i].title, data.cards[i].price, data.cards[i].details);
    }
}

GetData();
