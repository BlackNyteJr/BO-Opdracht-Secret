document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items');

    fetch('js/product.json') // or 'product.json' if it's in the root
        .then(res => res.json())
        .then(products => {
            products.forEach(product => {
                const article = document.createElement('article');
                article.className = 'item';
                article.innerHTML = `
                    <a href="product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="item-image">
                    </a>
                    <h3 class="item-title">${product.name}</h3>
                    <p class="item-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                `;
article.title = product.description;

                itemsContainer.appendChild(article);
            });

            setupCartButtons(products); // Enable cart functionality
            updateCartCount();
        })
        .catch(err => {
            console.error('Error loading products:', err);
            itemsContainer.innerHTML = '<p>Failed to load products.</p>';
        });

    function setupCartButtons(products) {
        const buttons = document.querySelectorAll(".add-to-cart");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.getAttribute("data-id"));
                const product = products.find(p => p.id === id);
                if (!product) return;

                const productToAdd = { ...product, quantity: 1 };
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existing = cart.find(item => item.id === product.id);

                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push(productToAdd);
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                alert(`${product.name} toegevoegd aan winkelwagen!`);
                updateCartCount();
            });
        });
    }

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
});

// Show popup message
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2500);
}