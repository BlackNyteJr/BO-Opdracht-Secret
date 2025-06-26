document.addEventListener("DOMContentLoaded", () => {
  const itemContainer = document.querySelector(".items");
  const sortSelect = document.getElementById("sort");
  let products = [];

  // Fetch products from JSON
  fetch("js/product.json")
    .then(res => res.json())
    .then(data => {
      products = data;
      renderProducts(products);
    });

  function renderProducts(items) {
    itemContainer.innerHTML = ""; // clear current items

    items.forEach(product => {
      const article = document.createElement("article");
      article.classList.add("item");

      article.innerHTML = `
        <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}" class="item-image">
        </a>
        <h3 class="item-title">${product.name}</h3>
        <p class="item-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;

      itemContainer.appendChild(article);
    });

    setupCartButtons();
  }

  function setupCartButtons() {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const productId = parseInt(button.dataset.id);
        const product = products.find(p => p.id === productId);
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showModal(`${product.name} toegevoegd aan winkelwagen!`);
      });
    });
  }

  sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;
    let sorted = [...products];

    if (value === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (value === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    }

    renderProducts(sorted);
  });

  function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  updateCartCount(); // Init on load
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "Light Mode";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  });
});

