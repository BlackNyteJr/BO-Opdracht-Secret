function Card(name, price, image) {
  let list = document.getElementById('list');
  let div = document.createElement('article');
  div.innerHTML = `
      <img src="img/picture1.png" alt="Damyan's Shoes" class="item-image">
            <h3 class="item-title">${name}</h3>
            <p class="item-price">$${price}</p>
            <button class="add-to-cart">Add to Cart</button>`;
  list.append(div);
  list.appendChild(div);
}

async function fetchItems() {
  const response = await fetch('js/info.json');
  const data = await response.json();
  // how to sort items vvv
  data.Items.sort((a, b) => a.price - b.price);
   // Sort items by price ^^^
  let prod = data.Items
  prod.forEach(prod => {
    Card(prod.name, prod.price, prod.image);
  });
}

fetchItems();


(() => {
  const cartCountEl = document.getElementById('cart-count');
  let cartCount = 0;

  function updateCartCount() {
    cartCountEl.textContent = cartCount;
    const cart = document.querySelector('.cart');
    cart.setAttribute('aria-label', `Shopping cart with ${cartCount} item${cartCount !== 1 ? 's' : ''}`);
  }
  
  function showAddedAlert(productName) {
    alert(`Product "${productName}" is toegevoegd aan het winkelmandje.`);
  }
  
  function onAddToCartClick(event) {
    const product = event.target.closest('.product');
    if (!product || product.classList.contains('product--not-available')) return;
    const titleEl = product.querySelector('.product__title');
    const productName = titleEl ? titleEl.textContent.trim() : 'Product';
    cartCount++;
    updateCartCount();
    showAddedAlert(productName);
  }
  
  function onRemoveFromCartClick(event) {
    if (cartCount === 0) return;
    cartCount--;
    updateCartCount();
  }
  
  document.querySelectorAll('.product__button').forEach(button => {
    button.addEventListener('click', onAddToCartClick);
  });
  document.querySelectorAll('.product__remove-button').forEach(button => {
    button.addEventListener('click', onRemoveFromCartClick);
  });
  
  updateCartCount();
})();

