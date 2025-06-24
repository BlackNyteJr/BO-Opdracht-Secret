function Card(name, price, image) {
  let list = document.getElementById('list');
  let div = document.createElement('article');
  div.innerHTML = `
      <img src="${image}">
            <h3 class="item-title">${name}</h3>
            <p class="item-price">$${price}</p>
            <button class="add-to-cart">Add to Cart</button>`;
  list.append(div);
  list.appendChild(div);
}

async function fetchItems() {
  const response = await fetch('js/info.json');
  const data = await response.json();
  console.log(data);
  let item = data.Items
  item.forEach(item => {
    Card(item.name, item.price, item.image);
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
  
  function showAddedAlert(itemuctName) {
    alert(`itemuct "${itemuctName}" is toegevoegd aan het winkelmandje.`);
  }
  
  function onAddToCartClick(event) {
    const itemuct = event.target.closest('.itemuct');
    if (!itemuct || itemuct.classList.contains('itemuct--not-available')) return;
    const titleEl = itemuct.querySelector('.itemuct__title');
    const itemuctName = titleEl ? titleEl.textContent.trim() : 'itemuct';
    cartCount++;
    updateCartCount();
    showAddedAlert(itemuctName);
  }
  
  function onRemoveFromCartClick(event) {
    if (cartCount === 0) return;
    cartCount--;
    updateCartCount();
  }
  
  document.querySelectorAll('.itemuct__button').forEach(button => {
    button.addEventListener('click', onAddToCartClick);
  });
  document.querySelectorAll('.itemuct__remove-button').forEach(button => {
    button.addEventListener('click', onRemoveFromCartClick);
  });
  
  updateCartCount();
})();

