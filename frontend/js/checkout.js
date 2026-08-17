document.addEventListener('DOMContentLoaded', () => {
    const checkoutSummary = document.getElementById('checkout-summary');
    const checkoutForm = document.getElementById('checkout-form');

    if (!checkoutSummary || !checkoutForm) return;

    if (!isLoggedIn()) {
        window.location.href = 'login.html?redirect=checkout.html';
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {
        checkoutSummary.innerHTML = '<p>Your cart is empty.</p><a href="products.html" class="btn btn-primary mt-2">Go Shopping</a>';
        checkoutForm.style.display = 'none';
        return;
    }

    // Render Summary
    let html = '<h3>Order Summary</h3><div style="margin-top: 1rem;">';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color);">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    html += `
        <div style="display: flex; justify-content: space-between; margin-top: 1rem; font-weight: bold; font-size: 1.2rem;">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    </div>`;

    checkoutSummary.innerHTML = html;

    // Handle Form Submit
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const errorDiv = document.getElementById('checkout-error');
        const submitBtn = document.getElementById('place-order-btn');
        
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
            errorDiv.classList.add('hidden');

            const orderData = {
                items: cart.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            };

            const response = await fetchAPI('/orders', {
                method: 'POST',
                body: JSON.stringify(orderData)
            });

            // Clear cart
            clearCart();
            
            // Redirect to success
            window.location.href = `order-success.html?id=${response.orderId}`;
            
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Place Order';
        }
    });
});
