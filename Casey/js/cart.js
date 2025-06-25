// Load from localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-items");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render cart items
function renderCart() {
  container.innerHTML = "";
  let total = 0;

  if (cartItems.length > 0) {
    console.log(cartItems);
    cartItems.forEach((item) => {
      const productEl = document.createElement("div");
      productEl.classList.add("cart-item");

      productEl.innerHTML = `
           <img src="${item.image}" alt="${item.title}" class="product-image" />
           <div class="product-info">
            <h2>${item.quantity || 1}x ${item.title}</h2>
            <p>€ ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
           </div>
           <div class="product-color" style="background-color: ${
             item.color || "#ccc"
           };"></div>
            <button class="remove-one-btn" data-title="${item.title}" style="
                background-color: transparent;
                border: none;
                font-size: 2.5rem;
                color: #d9534f;
                font-weight: bold;
                cursor: pointer;
                margin-right: 2rem;
                ">×</button>
                `;

      container.appendChild(productEl);
      total += item.price * (item.quantity || 1);
    });
  } else {
    container.innerHTML = "<p>Shopping Cart is empty.</p>";
  }

  // Update total price
  const totalPriceEl = document.getElementById("total-price");
  if (totalPriceEl) {
    totalPriceEl.textContent = `Total: €${total.toFixed(2)}`;
  }
}

// Clear cart function
function clearCart() {
  cartItems = [];
  localStorage.removeItem("cart");
  renderCart();
}

// Event listener for "Leeg winkelwagen"
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
}

// Initial render
renderCart();

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-one-btn")) {
    const title = e.target.getAttribute("data-title");
    const index = cartItems.findIndex((item) => item.title === title);

    if (index !== -1) {
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
      } else {
        cartItems.splice(index, 1);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    }
  }
});
