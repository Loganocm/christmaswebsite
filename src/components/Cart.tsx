import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
};

export function Cart({ isOpen, onClose, onCheckout }: CartProps) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        <div className="bg-gradient-to-r from-green-800 to-red-800 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Your cart is empty</p>
              <p className="text-gray-500 text-sm mt-2">Add some beautiful wreaths to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-gray-50 rounded-lg p-4 flex gap-4 border border-gray-200"
                >
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-green-700 font-bold mb-2">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock_quantity}
                          className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-green-900">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                onCheckout();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
