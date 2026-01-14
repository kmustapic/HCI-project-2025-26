'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '../lib/recipes';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

export default function RecipeCard({ recipe, onRemove, source }: { recipe: Recipe, onRemove?: () => void, source?: string }) {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!user) {
            setIsFavorite(false);
            return;
        }

        async function checkFavorite() {
            const { data } = await supabase
                .from('favorites')
                .select('id')
                .eq('user_id', user!.id)
                .eq('recipe_id', recipe.id)
                .maybeSingle();

            setIsFavorite(!!data);
        }

        checkFavorite();
    }, [user, recipe.id]);

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            console.log('No user logged in');
            return;
        }
        if (isUpdating) return;

        setIsUpdating(true);

        try {
            if (isFavorite) {
                // Remove
                console.log('Removing favorite:', { user_id: user.id, recipe_id: recipe.id });
                const { error } = await supabase
                    .from('favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('recipe_id', recipe.id);

                if (error) {
                    console.error('Error removing favorite:', error);
                    alert(`Failed to remove favorite: ${error.message}`);
                } else {
                    console.log('Successfully removed favorite');
                    setIsFavorite(false);
                    if (onRemove) onRemove(); // Trigger callback if provided
                }
            } else {
                // Add
                console.log('Adding favorite:', { user_id: user.id, recipe_id: recipe.id });
                const { error, data } = await supabase
                    .from('favorites')
                    .insert({ user_id: user.id, recipe_id: recipe.id });

                if (error) {
                    console.error('Error adding favorite:', error);
                    alert(`Failed to add favorite: ${error.message}`);
                } else {
                    console.log('Successfully added favorite', data);
                    setIsFavorite(true);
                }
            }
        } catch (error) {
            console.error('Failed to toggle favorite', error);
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Link
            href={`/products/${recipe.id}${source ? `?source=${source}` : ''}`}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 flex flex-col relative"
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
                {recipe.image ? (
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        No Image
                    </div>
                )}

                {/* Heart Button - Only visible if logged in */}
                {user && (
                    <button
                        onClick={toggleFavorite}
                        disabled={isUpdating}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white/90 dark:bg-black/40 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform z-10"
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? (
                            // Full Heart
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                        ) : (
                            // Empty Heart - Black Outline
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        )}
                    </button>
                )}

                <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                    {recipe.time}
                </div>
            </div>

            <div className="p-3 md:p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] md:text-xs font-bold text-[#1a4d3e] bg-[#1a4d3e]/10 dark:bg-[#1a4d3e]/30 px-2 py-0.5 md:py-1 rounded-full uppercase tracking-wide">
                        {recipe.category}
                    </span>
                    <span className="text-orange-800 dark:text-orange-300 font-bold bg-[#fffbf0] dark:bg-orange-950/30 px-2.5 md:px-3 py-1 rounded-lg flex items-center gap-1.5 border border-orange-100 dark:border-orange-800/50 shadow-sm leading-none">
                        <span className="text-base md:text-lg flex items-center gap-1">
                            <span>🔥</span>
                            <span>{recipe.calories.split(' ')[0]}</span>
                        </span>
                        <span className="text-[10px] md:text-xs opacity-70 font-medium lowercase">
                            {recipe.calories.split(' ')[1]}
                        </span>
                    </span>
                </div>

                <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2 group-hover:text-[#1a4d3e] transition-colors line-clamp-1">
                    {recipe.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm line-clamp-2 mb-3 md:mb-4 flex-1">
                    {recipe.description}
                </p>

                <div className="mt-auto pt-3 md:pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end">
                    <span className="font-bold text-[#1a4d3e] text-sm md:text-base group-hover:translate-x-1 transition-transform inline-block">
                        View Recipe →
                    </span>
                </div>
            </div>
        </Link>
    );
}
