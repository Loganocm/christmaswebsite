import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { Footer } from './components/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <main className="flex-1">
          <Hero />
          <ProductGrid />
        </main>
        <Footer />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => setIsCheckoutOpen(true)}
        />

        <CheckoutForm
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
