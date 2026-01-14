import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from './lib/api';

const CATEGORIES = [
  { name: 'Breakfast', slug: 'breakfast' },
  { name: 'Lunch', slug: 'lunch' },
  { name: 'Dinner', slug: 'dinner' },
  { name: 'Snack', slug: 'snack' },
];

export default async function Page() {
  // Fetch featured recipes using the central API utility
  const allRecipes = await getProducts();
  const FEATURED_RECIPES = allRecipes.slice(0, 5);

  return (
    <div className="font-sans text-[#171717] bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <section className="container mx-auto px-4 py-6 md:py-24 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex-1 space-y-6 md:space-y-8 md:pr-12 text-center md:text-left">
          <h1
            className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.1 }}
          >
            Discover <br className="hidden md:block" />
            healthy <br className="hidden md:block" />
            recipes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto md:mx-0 leading-relaxed">
            Browse a wide variety of nutritious <br className="hidden md:block" />
            recipes tailored to your health goals.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 pt-2 md:pt-4">
            <Link
              href="/products"
              style={{ color: '#ffffff' }}
              className="bg-[#1a4d3e] !text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#1a4d3e]/90 transition-all shadow-lg hover:shadow-xl"
            >
              Browse Recipes
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 relative w-full max-w-lg md:max-w-2xl aspect-square">
          <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
            <Image
              src="https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/healthy-salad-bowl.png"
              alt="Healthy Salad Bowl"
              fill
              unoptimized
              className="object-cover scale-110"
              priority
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold mb-6">Quick categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/browse-recipes/categories/meal-type/${cat.slug}?source=home`}
              className="flex items-center justify-center py-4 px-6 border border-gray-200 rounded-2xl hover:border-[#1a4d3e] hover:text-[#1a4d3e] transition-colors bg-white text-lg dark:bg-gray-800 dark:border-gray-700"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="container mx-auto px-4 py-8 md:px-8 lg:px-16 mb-16">
        <h2 className="text-3xl font-bold mb-8">Featured recipes</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {FEATURED_RECIPES.map((recipe: any) => (
            <Link href={`/products/${recipe.id}?source=home`} key={recipe.id} className="group flex flex-col items-center text-center">
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow bg-gray-100 border-4 border-transparent group-hover:border-[#1a4d3e]/20">
                {recipe.image && (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    unoptimized
                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 group-hover:text-[#1a4d3e] dark:group-hover:text-[#2d6a58] transition-colors">
                {recipe.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>



    </div >
  );
}
