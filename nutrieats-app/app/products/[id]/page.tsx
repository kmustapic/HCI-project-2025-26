import { getProduct } from '../../lib/api';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const product = await getProduct(id);
        return {
            title: `${product.title} - NutriEats`,
            description: product.description,
        };
    } catch (e) {
        return {
            title: 'Recipe Not Found',
        }
    }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let product;
    try {
        product = await getProduct(id);
    } catch (e) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
                <Link href="/products" className="text-green-600 underline">Return to recipes</Link>
            </div>
        )
    }

        return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
            {/* Breadcrumb / Back nav */}
            <div className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition-colors">
                        ← Back to all recipes
                    </Link>
                </div>
            </div>

            <article className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header Section */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg mb-8">
                    <div className="relative w-full h-[300px] md:h-[400px]">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-6 md:p-10 text-white w-full">
                                <span className="inline-block px-3 py-1 bg-green-500 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                                    {product.category}
                                </span>
                                <h1 className="text-3xl md:text-5xl font-bold mb-2">{product.title}</h1>
                                <div className="flex items-center gap-6 text-sm md:text-base opacity-90">
                                    <span className="flex items-center gap-2">
                                        🕒 {product.time}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        🔥 {product.calories}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                            {product.description}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Ingredients Column */}
                    <div className="md:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                🛒 Ingredients
                            </h2>
                            <ul className="space-y-3">
                                {product.ingredients.map((ingredient, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 shrink-0"></span>
                                        <span>{ingredient}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Instructions Column */}
                    <div className="md:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 md:p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                👨‍🍳 Instructions
                            </h2>
                            <div className="space-y-8">
                                {product.instructions.map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 flex items-center justify-center font-bold">
                                            {i + 1}
                                        </div>
                                        <div className="pt-1">
                                            <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                                                {step}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
