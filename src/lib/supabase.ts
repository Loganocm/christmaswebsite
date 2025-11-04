import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  category: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderData = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  notes: string;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
};
