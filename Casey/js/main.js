// Update cart count badge
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

// Add item to cart with image and color
function addToCart(id, productTitle, price, image, color) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find((item) => item.title === productTitle);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, title: productTitle, price, quantity: 1, image, color });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showPopup(`${productTitle} toegevoegd aan winkelwagen.`);
}

// Create a product card and add event listener
function AddCard(id, title, price, detail, image, color = "#aaa") {
  let list = document.getElementById("cards--js");
  let article = document.createElement("article");
  article.className = "card";
  article.dataset.id = id;

  article.innerHTML = `
    <img class="productimg" src="${image}" alt="${title}">
    <a class="card-link" href="product.html?id=${id}"><h1>${title}</h1>
    <p>Price: €${price.toFixed(2)}</p>
    <p class="detail">${detail}</p></a>
    <button class="add-to-cart-btn">Add to Cart</button>
  `;
  list.appendChild(article);

  article.querySelector(".add-to-cart-btn").addEventListener("click", () => {
    addToCart(id, title, price, image, color);
  });
}

// Show popup message
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2500);
}

// Main logic inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  let allCards = [];

  async function GetData() {
    const response = await fetch("js/index.json");
    const data = await response.json();
    allCards = data.Cards;
    renderCards(allCards);
  }

  function renderCards(cards) {
    const list = document.getElementById("cards--js");
    list.innerHTML = "";
    cards.forEach(card => {
      AddCard(card.id, card.title, card.price, card.detail, card.image, card.color);
    });
  }

  // Search bar filtering by category
  document.getElementById('search-bar').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    const filtered = allCards.filter(card =>
      card.category.toLowerCase().includes(searchTerm)
    );

    renderCards(filtered);
  });

  // Category buttons filtering
  document.querySelectorAll('.button-container button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.textContent.toLowerCase();
      renderCards(allCards.filter(card => card.category.toLowerCase() === category));
      document.getElementById('search-bar').value = category;
    });
  });

  // Initialize data and cart count
  GetData();
  updateCartCount();

  // Dark mode toggle
  const themeToggle = document.getElementById('theme-toggle');

  // Apply saved dark mode preference on load
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.querySelector('header').classList.add('dark-mode');
    themeToggle.checked = true;
    // Also apply dark mode to cards & links if any
    document.querySelectorAll('.card, .card-link').forEach(el => el.classList.add('dark-mode'));
  }

  // Toggle dark mode event
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.body.classList.add('dark-mode');
      document.querySelector('header').classList.add('dark-mode');
      document.querySelectorAll('.card, .card-link').forEach(el => el.classList.add('dark-mode'));
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      document.querySelector('header').classList.remove('dark-mode');
      document.querySelectorAll('.card, .card-link').forEach(el => el.classList.remove('dark-mode'));
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
});
