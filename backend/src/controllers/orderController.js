const pool = require('../config/db');

exports.createOrder = async (req, res) => {
    const client = await pool.connect();
    try {
        const { items } = req.body;
        const userId = req.user.id;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        await client.query('BEGIN');

        let totalAmount = 0;
        const orderItems = [];

        // Validate items and calculate total
        for (const item of items) {
            const productResult = await client.query('SELECT * FROM products WHERE id = $1', [item.productId]);
            
            if (productResult.rows.length === 0) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            const product = productResult.rows[0];

            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product ${product.name}`);
            }

            const price = parseFloat(product.price);
            totalAmount += price * item.quantity;
            
            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: price
            });

            // Update stock
            await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, product.id]);
        }

        // Create order
        const orderResult = await client.query(
            'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id',
            [userId, totalAmount, 'Processing']
        );
        const orderId = orderResult.rows[0].id;

        // Create order items
        for (const item of orderItems) {
            await client.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.productId, item.quantity, item.price]
            );
        }

        await client.query('COMMIT');
        
        res.status(201).json({ 
            message: 'Order placed successfully', 
            orderId: orderId 
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Checkout error:', error.message);
        res.status(400).json({ error: error.message || 'Server error during checkout' });
    } finally {
        client.release();
    }
};

exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Fetch orders
        const ordersResult = await pool.query(
            'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', 
            [userId]
        );
        
        const orders = ordersResult.rows;

        // Fetch items for each order
        for (let order of orders) {
            const itemsResult = await pool.query(
                `SELECT oi.*, p.name, p.image_url 
                 FROM order_items oi 
                 JOIN products p ON oi.product_id = p.id 
                 WHERE oi.order_id = $1`, 
                [order.id]
            );
            order.items = itemsResult.rows;
        }

        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error fetching orders' });
    }
};
