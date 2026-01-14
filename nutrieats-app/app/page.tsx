import Link from 'next/link';
import Image from 'next/image';
<<<<<<< HEAD
=======
import { getProducts } from './lib/api';
>>>>>>> 019dc6f... Added final project version

const CATEGORIES = [
  { name: 'Breakfast', slug: 'breakfast' },
  { name: 'Lunch', slug: 'lunch' },
  { name: 'Dinner', slug: 'dinner' },
<<<<<<< HEAD
  { name: 'Snacks', slug: 'snacks' },
];

const FEATURED_RECIPES = [
  { id: 1, title: 'Quinoa Salad', image: '/images/quinoa-salad.png' },
  { id: 2, title: 'Grilled Salmon', image: '/images/grilled-salmon.png' },
  { id: 3, title: 'Avocado Toast', image: '/images/avocado-toast.png' },
  { id: 4, title: 'Veggie Stir Fry', image: '/images/veggie-stir-fry.png' },
  { id: 5, title: 'Chia Pudding', image: '/images/chia-pudding.png' },
];

export default function Page() {
=======
  { name: 'Snack', slug: 'snack' },
];

export default async function Page() {
  // Fetch featured recipes using the central API utility
  const allRecipes = await getProducts();
  const FEATURED_RECIPES = allRecipes.slice(0, 5);

>>>>>>> 019dc6f... Added final project version
  return (
    <div className="font-sans text-[#171717] bg-white dark:bg-gray-900 dark:text-gray-100 min-h-screen">

      {/* HERO SECTION */}
<<<<<<< HEAD
      <section className="container mx-auto px-4 py-8 md:py-16 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-6 md:pr-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            Discover <br />
            healthy <br />
            recipes 
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-md leading-relaxed">
            <br />Browse a wide variety of nutritious recipes tailored to your health goals.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#1a4d3e] px-8 py-3.5 rounded-full font-semibold text-lg shadow-sm hover:bg-[#143d31] transition !text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white"
=======
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
>>>>>>> 019dc6f... Added final project version
            >
              Browse Recipes
            </Link>
          </div>
        </div>

        {/* Hero Image */}
<<<<<<< HEAD
        <div className="flex-1 relative w-full max-w-md md:max-w-xl aspect-square">
          {/* Using a placeholder that resembles a rounded salad bowl top-down view */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-xl">
            <Image
              src="/images/healthy-salad-bowl.png"
              alt="Healthy Salad Bowl"
              fill
              className="object-cover"
            />
          </div>
          {/* Decorative shadow/blur behind if needed */}
=======
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
>>>>>>> 019dc6f... Added final project version
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
        <h2 className="text-3xl font-bold mb-6">Quick categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
<<<<<<< HEAD
              href={`/browse-recipes/categories/${cat.slug}`}
              className="flex items-center justify-center py-4 px-6 rounded-2xl bg-white border border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:bg-[#1a4d3e]/10 hover:border-transparent hover:text-[#1a4d3e] transition-all duration-200 font-semibold tracking-wide text-gray-900 text-base md:text-lg"
=======
              href={`/browse-recipes/categories/meal-type/${cat.slug}?source=home`}
              className="flex items-center justify-center py-4 px-6 border border-gray-200 rounded-2xl hover:border-[#1a4d3e] hover:text-[#1a4d3e] transition-colors bg-white text-lg dark:bg-gray-800 dark:border-gray-700"
>>>>>>> 019dc6f... Added final project version
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
<<<<<<< HEAD
          {FEATURED_RECIPES.map((recipe) => (
            <Link href={`/products/${recipe.id}`} key={recipe.id} className="group flex flex-col items-center text-center">
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow bg-gray-100 border-4 border-transparent group-hover:border-green-50">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 group-hover:text-[#1a4d3e] dark:group-hover:text-green-400 transition-colors">
=======
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
>>>>>>> 019dc6f... Added final project version
                {recipe.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

<<<<<<< HEAD
      {/* Footer Socials */}
      <footer className="py-8 text-center flex justify-center gap-6 text-2xl text-gray-800 dark:text-white">
        {/* add icons */}
        <span>f</span>
        <span>twitter</span>
        <span>insta</span>
      </footer>
=======

>>>>>>> 019dc6f... Added final project version

    </div >
  );
}
