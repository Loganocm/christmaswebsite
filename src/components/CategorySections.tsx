import { Sparkles, Leaf, Home } from 'lucide-react';

type CategorySectionsProps = {
  onSelectCategory: (category: string) => void;
};

const categories = [
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Classic Christmas wreaths with timeless elegance',
    icon: Sparkles,
    gradient: 'from-red-600 to-green-700',
    hoverGradient: 'hover:from-red-700 hover:to-green-800',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary designs with sophisticated style',
    icon: Leaf,
    gradient: 'from-blue-600 to-teal-600',
    hoverGradient: 'hover:from-blue-700 hover:to-teal-700',
  },
  {
    id: 'rustic',
    name: 'Rustic',
    description: 'Natural farmhouse charm for cozy homes',
    icon: Home,
    gradient: 'from-amber-700 to-orange-800',
    hoverGradient: 'hover:from-amber-800 hover:to-orange-900',
  },
];

export function CategorySections({ onSelectCategory }: CategorySectionsProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Style
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our three unique collections, each handcrafted with care to match your home's personality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`group relative bg-gradient-to-br ${category.gradient} ${category.hoverGradient} text-white rounded-2xl p-8 shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>

                <div className="relative z-10">
                  <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-white/30 transition-colors duration-300">
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                    <span className="font-semibold">Explore Collection</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-300"></div>
                <div className="absolute -left-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-300"></div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
