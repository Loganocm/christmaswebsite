/*
  # Christmas Wreaths Store Database Schema

  This migration creates the database structure for a Christmas wreaths e-commerce store.

  ## New Tables

  ### `products`
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `description` (text) - Product description
  - `price` (decimal) - Product price in dollars
  - `image_url` (text) - URL to product image
  - `stock_quantity` (integer) - Available inventory
  - `category` (text) - Product category (e.g., 'traditional', 'modern', 'rustic')
  - `featured` (boolean) - Whether product is featured on homepage
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ### `orders`
  - `id` (uuid, primary key) - Unique order identifier
  - `customer_name` (text) - Customer's full name
  - `customer_email` (text) - Customer's email address
  - `customer_phone` (text) - Customer's phone number
  - `shipping_address` (text) - Full shipping address
  - `total_amount` (decimal) - Total order amount
  - `status` (text) - Order status (pending, confirmed, shipped, delivered)
  - `notes` (text) - Optional order notes
  - `created_at` (timestamptz) - Order creation timestamp

  ### `order_items`
  - `id` (uuid, primary key) - Unique order item identifier
  - `order_id` (uuid, foreign key) - Reference to orders table
  - `product_id` (uuid, foreign key) - Reference to products table
  - `quantity` (integer) - Quantity ordered
  - `price_at_time` (decimal) - Price at time of order
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security

  - Enable Row Level Security on all tables
  - Products table: Public read access, no write access
  - Orders and order_items: No direct public access (will use edge functions for secure order creation)
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  stock_quantity integer NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  category text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  shipping_address text NOT NULL,
  total_amount decimal(10,2) NOT NULL CHECK (total_amount >= 0),
  status text NOT NULL DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  price_at_time decimal(10,2) NOT NULL CHECK (price_at_time >= 0),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products: Public read access
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Orders: No direct public access (will use edge functions)
CREATE POLICY "No direct order access"
  ON orders FOR SELECT
  TO anon
  USING (false);

-- Order items: No direct public access (will use edge functions)
CREATE POLICY "No direct order items access"
  ON order_items FOR SELECT
  TO anon
  USING (false);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, stock_quantity, category, featured) VALUES
  ('Classic Evergreen Wreath', 'Traditional evergreen wreath with red bow and pine cones. Perfect for any front door.', 45.00, 'https://images.pexels.com/photos/3152124/pexels-photo-3152124.jpeg', 15, 'traditional', true),
  ('Winter Wonderland Wreath', 'Frosted pine wreath with white berries and silver accents. Creates a magical winter atmosphere.', 55.00, 'https://images.pexels.com/photos/1708601/pexels-photo-1708601.jpeg', 12, 'modern', true),
  ('Rustic Farmhouse Wreath', 'Natural burlap and cotton wreath with dried oranges. Brings countryside charm to your home.', 50.00, 'https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg', 10, 'rustic', true),
  ('Elegant Gold & White Wreath', 'Sophisticated white pine with gold ornaments and ribbon. Perfect for upscale decor.', 65.00, 'https://images.pexels.com/photos/3152126/pexels-photo-3152126.jpeg', 8, 'modern', false),
  ('Berry & Pinecone Wreath', 'Rich mix of red berries, pine cones, and evergreen branches. A festive classic.', 48.00, 'https://images.pexels.com/photos/1708609/pexels-photo-1708609.jpeg', 14, 'traditional', false),
  ('Snowy Cardinal Wreath', 'Dusted with artificial snow and featuring a red cardinal. Brings nature to your door.', 58.00, 'https://images.pexels.com/photos/3152125/pexels-photo-3152125.jpeg', 9, 'traditional', false)
ON CONFLICT DO NOTHING;