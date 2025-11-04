import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Product, supabase } from '../lib/supabase';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';

type ProductGridProps = {
  selectedCategory: string;
  onBack: () => void;
};

export function ProductGrid({ selectedCategory, onBack }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  async function loadProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', selectedCategory)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }

  const categoryNames: Record<string, string> = {
    traditional: 'Traditional',
    modern: 'Modern',
    rustic: 'Rustic',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-700 hover:text-green-700 font-medium transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Categories
        </button>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryNames[selectedCategory]} Wreaths
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handcrafted with care, each wreath in our {categoryNames[selectedCategory].toLowerCase()} collection brings unique character to your home.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
