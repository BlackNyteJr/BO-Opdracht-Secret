document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("product-container");

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));

    if (!productId) {
        container.innerHTML = "<p>Product ID is missing.</p>";
        return;
    }

    fetch('js/product.json')
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (!product) {
                container.innerHTML = "<p>Product not found.</p>";
                return;
            }

            container.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p class="description">${product.description}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <button id="add-to-cart">Add to Cart</button>
                </div>
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
                showModal(`${product.name} toegevoegd aan winkelwagen!`);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Error loading product data.</p>";
        });
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });
});


function showModal(message) {
  const modal = document.getElementById('cart-modal');
  const modalMessage = document.getElementById('modal-message');
  const closeBtn = document.getElementById('modal-close');

  modalMessage.textContent = message;
  modal.classList.remove('hidden');

  // Auto close after 3 seconds
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 3000);

  // Manual close
  closeBtn.onclick = () => {
    modal.classList.add('hidden');
  };
}

