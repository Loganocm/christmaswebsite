export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-red-900 via-green-900 to-red-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to Our
            <br />
            <span className="text-yellow-300">Christmas Wreath Collection</span>
          </h2>
          <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Handcrafted with love, each wreath brings the warmth and magic of the holidays right to your door. Made from the finest materials and designed to last the entire season.
          </p>
          <button
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-red-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-300 hover:text-green-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Shop Our Collection
          </button>
        </div>
      </div>
    </div>
  );
}
