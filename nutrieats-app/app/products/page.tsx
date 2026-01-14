import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../sanity/lib/client';
import { RECIPES_QUERY, RECIPES_SEARCH_QUERY } from '../../sanity/lib/queries';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Recipes - NutriEats',
    description: 'Browse our collection of healthy recipes',
};

interface Props {
    searchParams: Promise<{
        query?: string;
        source?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: Props) {
    const params = await searchParams;
    const query = params?.query || '';
    const source = params?.source;

    const isFromHome = source === 'home';

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
            {isFromHome && (
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-lg font-medium text-gray-500 hover:text-[#1a4d3e] transition-colors">
                        ← Back to Home Page
                    </Link>
                </div>
            )}
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
        </div>
    );
}
