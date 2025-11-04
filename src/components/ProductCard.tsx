import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../lib/supabase';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            Featured
          </div>
        )}
        {product.stock_quantity < 5 && product.stock_quantity > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Only {product.stock_quantity} left!
          </div>
        )}
        {product.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2">
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock_quantity === 0}
            className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 transform active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
