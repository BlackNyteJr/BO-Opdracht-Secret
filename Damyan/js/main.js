document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const product = {
                id: index + 1,
                name: `Shoe ${index + 1}`,
                price: index === 4 ? 99.99 : 89.99, // Adjust price for Shoe 5
                image: `img/picture${index + 1}.png`, // Include image URL
                quantity: 1
            };

            console.log("Adding to cart:", product); // Debugging log

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            console.log("Cart after addition:", cart); // Debugging log
            alert(`${product.name} toegevoegd aan winkelwagen!`);
            updateCartCount();
        });
    });

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    updateCartCount(); // Initialize cart count on page load
});
