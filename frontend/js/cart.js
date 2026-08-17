// Cart Management

function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = total;
        countEl.classList.toggle('hidden', total === 0);
    }
}

function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
        // Validate stock
        if (existingItem.quantity + quantity > product.stock) {
            alert(`Sorry, only ${product.stock} items available in stock.`);
            return;
        }
        existingItem.quantity += quantity;
    } else {
        if (quantity > product.stock) {
            alert(`Sorry, only ${product.stock} items available in stock.`);
            return;
        }
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            quantity: quantity,
            stock: product.stock
        });
    }
    
    saveCart(cart);
    alert('Added to cart!');
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    renderCart();
}

function updateQuantity(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        if (newQuantity > item.stock) {
            alert(`Sorry, only ${item.stock} items available.`);
            return;
        }
        item.quantity = newQuantity;
        saveCart(cart);
        renderCart();
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Render Cart Page
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const summaryContainer = document.getElementById('cart-summary');
    if (!cartContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="text-center"><p>Your cart is empty.</p><a href="products.html" class="btn btn-primary mt-2">Start Shopping</a></div>';
        if (summaryContainer) summaryContainer.classList.add('hidden');
        return;
    }

    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.image_url || 'https://via.placeholder.com/60'}" alt="${item.name}" class="cart-item-img">
                    <div>
                        <h4>${item.name}</h4>
                        <p class="text-light">$${Number(item.price).toFixed(2)}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div class="quantity-selector" style="margin-bottom: 0;">
                        <button class="quantity-btn" onclick="updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn" onclick="updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                    </div>
                    <div style="width: 80px; text-align: right; font-weight: bold;">
                        $${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button class="btn btn-danger" onclick="removeFromCart(${item.productId})">Remove</button>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = html;

    // Update summary
    if (summaryContainer) {
        summaryContainer.classList.remove('hidden');
        const total = getCartTotal();
        document.getElementById('cart-subtotal').textContent = `$${total.toFixed(2)}`;
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Make these globally available for onclick handlers
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;
    
    // Render cart if on cart page
    if (document.getElementById('cart-container')) {
        renderCart();
    }
});
