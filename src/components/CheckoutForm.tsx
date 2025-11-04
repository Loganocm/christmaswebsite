import { useState } from 'react';
import { X, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

type CheckoutFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: cartItems.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total_amount: getCartTotal(),
      };

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-order`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      setSuccess(true);
      clearCart();
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          shipping_address: '',
          notes: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (success) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
            <p className="text-gray-600">
              Thank you for your order. We'll contact you soon to confirm the details.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
          <div className="bg-gradient-to-r from-green-800 to-red-800 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-2 mb-3">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-green-300 pt-2 flex justify-between">
                <span className="font-bold text-gray-900">Total:</span>
                <span className="font-bold text-green-700 text-lg">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="customer_phone"
                value={formData.customer_phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Shipping Address *
              </label>
              <textarea
                name="shipping_address"
                value={formData.shipping_address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Order Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                placeholder="Any special instructions or requests..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
