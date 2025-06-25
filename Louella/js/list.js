import { products } from "./products.js";

const grid = document.getElementById("productGrid");

products.forEacht(  p =>{ 

    const card = document.createElement("a");
    card.href = `/Louella/product.html?id=${p.id}`; 

    card.className = "square";
    card.innerHTML =   `     
    
    <img src="${p.img}" alt="${p.name}">
    <span class="text1">${p.name}<br>$${p.price}</span>`;
grid.appendChild("card");

});
