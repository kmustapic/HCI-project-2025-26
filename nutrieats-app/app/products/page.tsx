import Link from 'next/link';
import Image from 'next/image';
<<<<<<< HEAD
import { getProducts } from '../lib/api';
=======
import { client } from '../../sanity/lib/client';
import { RECIPES_QUERY, RECIPES_SEARCH_QUERY } from '../../sanity/lib/queries';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { notFound } from 'next/navigation';
>>>>>>> 019dc6f... Added final project version

export const metadata = {
    title: 'Recipes - NutriEats',
    description: 'Browse our collection of healthy recipes',
};

<<<<<<< HEAD
export default async function ProductsPage() {
    const recipes = await getProducts();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">All Recipes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                    <Link
                        href={`/products/${recipe.id}`}
                        key={recipe.id}
                        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 flex flex-col"
                    >
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <Image
                                src={recipe.image}
                                alt={recipe.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                                {recipe.time}
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full uppercase tracking-wide">
                                    {recipe.category}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">{recipe.calories}</span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-700 transition-colors line-clamp-1">
                                {recipe.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                                {recipe.description}
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm">
                                <span className="font-semibold text-green-700 hover:underline">View Recipe</span>
                                <span className="text-gray-400">➜</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
=======
interface Props {
    searchParams: Promise<{
        query?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: Props) {
    const query = (await searchParams)?.query || '';

    let data;
    try {
        if (query) {
            data = await client.fetch(RECIPES_SEARCH_QUERY, { search: query });
        } else {
            data = await client.fetch(RECIPES_QUERY);
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        data = [];
    }

    // Map DB columns to Frontend Interface
    const recipes = (data || []).map((r: any) => ({
        id: r._id,
        title: r.name,
        description: r.description,
        image: r.imageUrl,
        calories: r.calories + ' kcal',
        time: '15 mins', // Placeholder
        category: r.type,
        ingredients: r.ingredients || [],
        instructions: r.instructions || [],
        dietary: r.dietary || []
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center mb-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    All Recipes
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Discover healthy and delicious meals.
                </p>
            </div>

            <SearchBar />

            {recipes.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-8">
                    {recipes.map((recipe: any) => (
                        <RecipeCard key={recipe.id} recipe={recipe} source="all" />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl mt-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <p className="text-xl text-gray-500 mb-2">No recipes found for "{query}".</p>
                    <p className="text-gray-400">Try searching for something else like "chicken", "vegan", or "breakfast".</p>
                </div>
            )}
>>>>>>> 019dc6f... Added final project version
        </div>
    );
}
