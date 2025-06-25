document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotal = document.getElementById('cart-total');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    function loadCart() {
       console.log("Loading cart..."); // Debugging log
       const cart = JSON.parse(localStorage.getItem('cart')) || [];
       updateCartUI(cart);
    }
   
    function updateCartUI(cart) {
        // Update badge
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Clear previous items
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block'; // Show empty message
            cartTotal.textContent = '';
        } else {
            cartEmptyMessage.style.display = 'none'; // Hide empty message
            cart.forEach(item => {
                // Create card for each item
                const card = document.createElement('div');
                card.className = 'item'; // Use the same class as in your items section
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <h3 class="item-title">${item.name}</h3>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                `;
                cartItemsContainer.appendChild(card);
                total += item.price * item.quantity;
            });
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    document.getElementById('clear-cart').addEventListener('click', () => {
        localStorage.removeItem('cart');
        updateCartUI([]); // Update UI to reflect empty cart
    });

    loadCart(); // Load cart on page load
});
