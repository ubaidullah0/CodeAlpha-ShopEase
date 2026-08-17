document.addEventListener('DOMContentLoaded', async () => {
    const productsContainer = document.getElementById('products-grid');
    const featuredContainer = document.getElementById('featured-products');
    const productDetailsContainer = document.getElementById('product-details-container');

    // Render a single product card
    function createProductCard(product) {
        return `
            <div class="card">
                <img src="${product.image_url || 'https://via.placeholder.com/300x200'}" alt="${product.name}" class="card-image">
                <div class="card-content">
                    <div class="card-category">${product.category || 'General'}</div>
                    <h3 class="card-title">${product.name}</h3>
                    <div class="card-price">$${Number(product.price).toFixed(2)}</div>
                    <a href="product-details.html?id=${product.id}" class="btn btn-primary btn-block">View Details</a>
                </div>
            </div>
        `;
    }

    // Load all products (Products Page)
    if (productsContainer) {
        try {
            productsContainer.innerHTML = '<p>Loading products...</p>';
            const products = await fetchAPI('/products');
            
            if (products.length === 0) {
                productsContainer.innerHTML = '<p>No products found.</p>';
                return;
            }

            productsContainer.innerHTML = products.map(createProductCard).join('');
        } catch (error) {
            productsContainer.innerHTML = `<p class="error-msg" style="display:block">Failed to load products: ${error.message}</p>`;
        }
    }

    // Load featured products (Home Page)
    if (featuredContainer) {
        try {
            featuredContainer.innerHTML = '<p>Loading products...</p>';
            const products = await fetchAPI('/products');
            // Just take first 4 for featured
            const featured = products.slice(0, 4);
            
            if (featured.length === 0) {
                featuredContainer.innerHTML = '<p>No products found.</p>';
                return;
            }

            featuredContainer.innerHTML = featured.map(createProductCard).join('');
        } catch (error) {
            featuredContainer.innerHTML = `<p class="error-msg" style="display:block">Failed to load products.</p>`;
        }
    }

    // Load single product details
    if (productDetailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            productDetailsContainer.innerHTML = '<p>Product not found.</p>';
            return;
        }

        try {
            const product = await fetchAPI(`/products/${productId}`);
            
            let html = `
                <img src="${product.image_url || 'https://via.placeholder.com/500'}" alt="${product.name}" class="product-details-img">
                <div>
                    <p class="card-category">${product.category || 'General'}</p>
                    <h1 style="margin-bottom: 0.5rem">${product.name}</h1>
                    <p class="card-price" style="font-size: 2rem; margin-bottom: 1.5rem;">$${Number(product.price).toFixed(2)}</p>
                    
                    <p style="margin-bottom: 2rem; line-height: 1.6;">${product.description}</p>
                    
                    <div style="margin-bottom: 1.5rem">
                        <strong>Availability:</strong> 
                        <span style="color: ${product.stock > 0 ? 'var(--success-color)' : 'var(--error-color)'}">
                            ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>
            `;

            if (product.stock > 0) {
                html += `
                    <div class="quantity-selector">
                        <button class="quantity-btn" id="qty-minus">-</button>
                        <input type="number" id="qty-input" class="quantity-input" value="1" min="1" max="${product.stock}" readonly>
                        <button class="quantity-btn" id="qty-plus">+</button>
                    </div>
                    <button id="add-to-cart-btn" class="btn btn-primary" style="width: 200px;">Add to Cart</button>
                `;
            } else {
                html += `<button class="btn btn-outline" disabled>Out of Stock</button>`;
            }

            html += `</div>`;
            productDetailsContainer.innerHTML = html;

            // Setup quantity and cart listeners
            if (product.stock > 0) {
                const qtyInput = document.getElementById('qty-input');
                const btnMinus = document.getElementById('qty-minus');
                const btnPlus = document.getElementById('qty-plus');
                const btnAdd = document.getElementById('add-to-cart-btn');

                btnMinus.addEventListener('click', () => {
                    let val = parseInt(qtyInput.value);
                    if (val > 1) qtyInput.value = val - 1;
                });

                btnPlus.addEventListener('click', () => {
                    let val = parseInt(qtyInput.value);
                    if (val < product.stock) qtyInput.value = val + 1;
                });

                btnAdd.addEventListener('click', () => {
                    const qty = parseInt(qtyInput.value);
                    addToCart(product, qty);
                });
            }

        } catch (error) {
            productDetailsContainer.innerHTML = `<p class="error-msg" style="display:block">Failed to load product: ${error.message}</p>`;
        }
    }
});
