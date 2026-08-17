CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Seed Data for Products
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
('Classic White T-Shirt', 'A comfortable and stylish classic white t-shirt made from 100% cotton.', 19.99, 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=600', 'Clothing', 100),
('Wireless Noise-Canceling Headphones', 'Premium over-ear wireless headphones with active noise cancellation and 30-hour battery life.', 149.99, 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600', 'Electronics', 50),
('Minimalist Leather Wallet', 'Slim and elegant genuine leather wallet with RFID blocking technology.', 39.50, 'https://images.pexels.com/photos/9328221/pexels-photo-9328221.jpeg?auto=compress&cs=tinysrgb&w=600', 'Accessories', 200),
('Smart Fitness Watch', 'Track your daily activity, heart rate, and sleep patterns with this sleek fitness smartwatch.', 89.00, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600', 'Electronics', 75),
('Stainless Steel Water Bottle', 'Insulated water bottle that keeps your drinks cold for 24 hours or hot for 12 hours.', 24.99, 'https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=600', 'Home & Kitchen', 150),
('Organic Coffee Beans', 'A 1lb bag of medium roast organic arabica coffee beans with rich flavor.', 14.95, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600', 'Groceries', 80);
