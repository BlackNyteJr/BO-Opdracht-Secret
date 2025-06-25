fetch('js/index.json')
  .then(response => response.json())
  .then(data => {
    const products = data.Cards;

    function getProductById(id) {
      return products.find(p => p.id.toString() === id.toString());
    }

    function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href = 'cart.html'; // Redirect to cart page
    }

    function renderProduct(product) {
      if (!product) {
        document.getElementById('product-container').innerHTML = '<p>Product not found.</p>';
        return;
      }

      document.getElementById('product-container').innerHTML = `
        <a href="index.html">← Back to Accessories</a>
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}" />
        </div>
        <div class="product-info">
          <h1 class="product-title">${product.title}</h1>
          <p class="product-price">€${product.price.toFixed(2)},-</p>
          <p class="product-detail">${product.detail}</p>
          <p class="product-description">${product.description}</p>
          <button class="add-to-cart">Add to Cart</button>
        </div>  
      `;

      document.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart(product);
      });
    }

    // Get product from URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = getProductById(productId);

    renderProduct(product);
  });
