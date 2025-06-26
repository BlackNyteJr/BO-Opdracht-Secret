document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("product-container");

    // Haal ID uit de URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));

    if (!productId) {
        container.innerHTML = "<p>Product ID is missing.</p>";
        return;
    }

    fetch('js/product.json') // of './product.json' afhankelijk van je mapstructuur
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (!product) {
                container.innerHTML = "<p>Product not found.</p>";
                return;
            }

            container.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="detail-image">
                <h1>${product.name}</h1>
                <p class="product-description">${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button id="add-to-cart">Add to Cart</button>
            `;

            document.getElementById("add-to-cart").addEventListener("click", () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existing = cart.find(item => item.id === product.id);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`${product.name} toegevoegd aan winkelwagen!`);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Error loading product data.</p>";
        });
});
