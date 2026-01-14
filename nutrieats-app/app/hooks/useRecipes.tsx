
import { useEffect, useState } from 'react';
import { client } from '../../sanity/lib/client';
import { RECIPES_QUERY, RECIPES_BY_CATEGORY_QUERY } from '../../sanity/lib/queries';
import { Recipe } from '../lib/recipes';

export function useRecipes(category?: string) {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const query = category ? RECIPES_BY_CATEGORY_QUERY : RECIPES_QUERY;
                const params = category ? { category } : {};

                const data = await client.fetch(query, params);

                // Map Sanity data to our interface
                const mappedRecipes: Recipe[] = data.map((r: any) => ({
                    id: r._id,
                    title: r.name,
                    description: r.description || '',
                    calories: r.calories ? r.calories + ' kcal' : 'N/A',
                    category: r.type,
                    image: r.imageUrl || null,
                    time: '15 mins', // hardcoded for now as it wasn't in schema
                    ingredients: r.ingredients || [],
                    instructions: r.instructions || [],
                    dietary: r.dietary || []
                }));

                setRecipes(mappedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipes();
    }, [category]);

    return { recipes, loading };
}
