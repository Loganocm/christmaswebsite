import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 to-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">The Little Corner</h3>
            <p className="text-green-100 leading-relaxed">
              Handcrafted Christmas wreaths made with love and care. Bringing the joy of the holidays to your home since 2024.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-300" />
                <span className="text-green-100">info@thelittlecorner.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-300" />
                <span className="text-green-100">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-yellow-300" />
                <span className="text-green-100">123 Main Street, Your City</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Shop Info</h3>
            <div className="text-green-100 space-y-2">
              <p>All wreaths are handmade to order</p>
              <p>Free local delivery available</p>
              <p>Custom orders welcome</p>
              <p className="mt-4 text-sm">
                © 2024 The Little Corner. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
