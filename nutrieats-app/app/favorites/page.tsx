'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Recipe } from '../lib/recipes';
import RecipeCard from '../components/RecipeCard';
import ProtectedRoute from '../components/ProtectedRoute';
import SearchBar from '../components/SearchBar';
import { getRecipesByIds } from '../lib/api';
import { supabase } from '../lib/supabaseClient';

export default function FavoritesPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter(recipe =>
    recipe.title.toLowerCase().includes(query) ||
    recipe.description.toLowerCase().includes(query)
  );

  useEffect(() => {
    async function fetchFavorites() {
      if (!user) return;

      try {
        // 1. Fetch favorite recipe IDs from Supabase
        const { data: favoriteIds, error } = await supabase
          .from('favorites')
          .select('recipe_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching favorites:', error);
          setIsLoading(false);
          return;
        }

        if (!favoriteIds || favoriteIds.length === 0) {
          console.log('No favorites found in Supabase');
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        const ids = favoriteIds.map(f => f.recipe_id);
        console.log('Fetching favorites for IDs:', ids);

        const recipes = await getRecipesByIds(ids);
        console.log('Fetched recipes from Sanity:', recipes);

        setFavorites(recipes);
      } catch (error) {
        console.error('Error in fetchFavorites:', error);
      }

      setIsLoading(false);
    }

    if (user) {
      fetchFavorites();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[50vh] flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-lg font-medium text-gray-500 hover:text-[#1a4d3e] transition-colors">
            ← Back to Home Page
          </Link>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>

        {(favorites.length > 0 || query) && <SearchBar />}

        {favorites.length > 0 ? (
          filteredFavorites.length > 0 ? (
            /* Mobile: 1 column (grid-cols-1), Tablet: 2 cols, Desktop: 3/4 cols */
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-16">
              {filteredFavorites.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  source="favorites"
                  onRemove={() => {
                    setFavorites(prev => prev.filter(r => r.id !== recipe.id));
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl font-medium mb-2">No recipes found matching "{query}"</p>
              <p className="text-gray-400">Try searching for something else ✨</p>
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl mx-auto max-w-2xl">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No favorites yet 🍽️</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Save your favorite healthy recipes and they'll appear here!
            </p>
            <Link
              href="/products"
              style={{ color: '#ffffff' }}
              className="inline-flex items-center justify-center px-8 py-3 bg-[#1a4d3e] hover:opacity-90 !text-white font-medium rounded-full transition-colors"
            >
              Browse Recipes
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
