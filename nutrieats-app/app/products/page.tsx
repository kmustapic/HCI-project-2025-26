import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '../lib/api';

export const metadata = {
    title: 'Recipes - NutriEats',
    description: 'Browse our collection of healthy recipes',
};

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
        </div>
    );
}
