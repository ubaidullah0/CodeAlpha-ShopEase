document.addEventListener('DOMContentLoaded', async () => {
    const ordersContainer = document.getElementById('orders-container');
    
    if (!ordersContainer) return;

    if (!isLoggedIn()) {
        window.location.href = 'login.html?redirect=orders.html';
        return;
    }

    try {
        ordersContainer.innerHTML = '<p>Loading your orders...</p>';
        
        const orders = await fetchAPI('/orders');
        
        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p>You have not placed any orders yet.</p><a href="products.html" class="btn btn-primary mt-2">Start Shopping</a>';
            return;
        }

        let html = '';
        
        orders.forEach(order => {
            const date = new Date(order.created_at).toLocaleDateString();
            
            let itemsHtml = order.items.map(item => `
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-top: 0.5rem;">
                    <span>${item.quantity}x ${item.name}</span>
                    <span>$${Number(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');

            html += `
                <div class="card" style="margin-bottom: 2rem; padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; border-bottom: 2px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1rem;">
                        <div>
                            <strong>Order #${order.id}</strong>
                            <p class="text-light" style="font-size: 0.85rem;">Placed on ${date}</p>
                        </div>
                        <div style="text-align: right;">
                            <span style="background-color: var(--primary-color); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85rem;">
                                ${order.status}
                            </span>
                            <div style="font-weight: bold; margin-top: 0.5rem;">
                                Total: $${Number(order.total_amount).toFixed(2)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <strong>Items:</strong>
                        ${itemsHtml}
                    </div>
                </div>
            `;
        });
        
        ordersContainer.innerHTML = html;

    } catch (error) {
        ordersContainer.innerHTML = `<div class="alert alert-error">Failed to load orders: ${error.message}</div>`;
    }
});
