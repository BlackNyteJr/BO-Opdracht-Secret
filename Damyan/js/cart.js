document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cart-container");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        container.innerHTML = "<p>Je winkelwagen is leeg.</p>";
        return;
    }

    let total = 0;

    const html = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-image">
                <div>
                    <h3>${item.name}</h3>
                    <p>Prijs: $${item.price.toFixed(2)}</p>
                    <p>Aantal: ${item.quantity}</p>
                    <p>Subtotaal: $${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join("");

    container.innerHTML = `
        ${html}
        <hr>
        <h2>Totaal: $${total.toFixed(2)}</h2>
        <button id="clear-cart">Winkelwagen legen</button>
    `;

    document.getElementById("clear-cart").addEventListener("click", () => {
        localStorage.removeItem("cart");
        location.reload();
    });
});
