import { ShoppingCart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

type HeaderProps = {
  onCartClick: () => void;
};

export function Header({ onCartClick }: HeaderProps) {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-gradient-to-r from-green-800 to-red-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-300" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                The Little Corner
              </h1>
              <p className="text-sm text-green-100">Handcrafted Christmas Wreaths</p>
            </div>
          </div>

          <button
            onClick={onCartClick}
            className="relative bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 border border-white/20"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
}
