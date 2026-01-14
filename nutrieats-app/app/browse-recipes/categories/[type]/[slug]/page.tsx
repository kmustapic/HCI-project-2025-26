import Link from 'next/link';
import Image from 'next/image';
import { getRecipesByCategory } from '../../../../lib/api';
import { notFound } from 'next/navigation';
import RecipeCard from '../../../../components/RecipeCard';

interface Props {
    params: Promise<{
        type: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props) {
    const { type, slug } = await params;

    // Format title for display (e.g., "high-protein" -> "High Protein")
    const title = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return {
        title: `${title} Recipes - NutriEats`,
        description: `Browse our collection of ${title} recipes.`,
    };
}

export default async function CategoryPage({
    params,
    searchParams
}: {
    params: Promise<{ type: string; slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { type, slug } = await params;
    const { source } = await searchParams;
    const recipes = await getRecipesByCategory(type, slug);

    // Format title for display
    const title = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    if (!recipes) {
        return notFound();
    }

    const isFromHome = source === 'home';
    const backLinkHref = isFromHome ? '/' : '/browse-recipes/categories';
    const backLinkText = isFromHome ? '← Back to Home Page' : '← Back to Categories';

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex flex-col items-center mb-10 text-center">
                <Link
                    href={backLinkHref}
                    className="text-[#1a4d3e] hover:text-[#143d31] font-medium mb-4 flex items-center gap-1 self-start md:self-center"
                >
                    {backLinkText}
                </Link>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    {title} Recipes
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                    {recipes.length} {recipes.length === 1 ? 'result' : 'results'} found for "{title}"
                </p>
            </div>

            {recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
                    <p className="text-xl text-gray-500 mb-4">No recipes found for this category.</p>
                    <Link
                        href="/browse-recipes/categories"
                        className="text-[#1a4d3e] font-bold hover:underline"
                    >
                        Browse other categories
                    </Link>
                </div>
            )}
        </div>
    );
}
