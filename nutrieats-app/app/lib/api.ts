import { client } from '../../sanity/lib/client';
import { supabase } from './supabaseClient';
import { RECIPES_QUERY, RECIPES_SEARCH_QUERY, RECIPE_BY_ID_QUERY, RECIPES_BY_CATEGORY_QUERY, POSTS_QUERY, POST_BY_SLUG_QUERY } from '../../sanity/lib/queries';
import { Recipe } from './recipes';
import { urlFor } from '../../sanity/lib/image';

// Helper to map Sanity response to Recipe interface
const mapToRecipe = (r: any): Recipe => ({
    id: r._id,
    title: r.name,
    description: r.description || '',
    image: r.image ? urlFor(r.image).url() : (r.imageUrl || null),
    calories: r.calories ? r.calories + ' kcal' : 'N/A',
    time: '15 mins', // Placeholder as it wasn't in schema
    category: r.type,
    ingredients: r.ingredients || [],
    instructions: r.instructions || [],
    dietary: r.dietary || []
});

export async function getProducts(query?: string): Promise<Recipe[]> {
    let data;
    try {
        if (query) {
            data = await client.fetch(RECIPES_SEARCH_QUERY, { search: query });
        } else {
            data = await client.fetch(RECIPES_QUERY);
        }
        return (data || []).map(mapToRecipe);
    } catch (error) {
        console.error("Error in getProducts:", error);
        return [];
    }
}

export async function getProduct(id: string): Promise<Recipe> {
    try {
        const data = await client.fetch(RECIPE_BY_ID_QUERY, { id });
        if (!data) {
            throw new Error('Recipe not found');
        }
        return mapToRecipe(data);
    } catch (error) {
        console.error("Error in getProduct:", error);
        throw error;
    }
}

export async function getRecipesByCategory(type: string, slug: string): Promise<Recipe[]> {
    try {
        if (type === 'meal-type') {
            const data = await client.fetch(RECIPES_BY_CATEGORY_QUERY, { category: slug });
            return (data || []).map(mapToRecipe);
        }

        // For other types like 'prep-time' or 'nutrition', we might need new queries or handle it logically.
        // For now, fetching all and filtering (fallback) or returning empty.
        // Let's fallback to fetch all and filter to maintain functionality if possible, 
        // but robust implementation would add these fields to Sanity schema.

        const data = await client.fetch(RECIPES_QUERY);
        const allRecipes: Recipe[] = (data || []).map(mapToRecipe);
        const term = slug.toLowerCase();

        if (type === 'prep-time') {
            const parseTime = (timeStr: string): number => {
                const match = timeStr.match(/(\d+)/);
                return match ? parseInt(match[0], 10) : 0;
            };

            return allRecipes.filter(r => {
                const minutes = parseTime(r.time);
                if (term === 'under-10') return minutes < 10;
                if (term === '10-30') return minutes >= 10 && minutes <= 30;
                if (term === 'over-30') return minutes > 30;
                return true;
            });
        }

        if (type === 'nutrition') {
            const formattedTerm = term.replace(/-/g, ' ');
            return allRecipes.filter(r =>
                r.dietary && r.dietary.some((tag: string) => tag.toLowerCase().includes(formattedTerm))
            );
        }

        return [];

    } catch (error) {
        console.error("Error in getRecipesByCategory:", error);
        return [];
    }
}

export async function getPosts(): Promise<any[]> {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error in getPosts:", error);
        return [];
    }
}

export async function createBlogPost(postData: any) {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .insert([postData])
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error("Error in createBlogPost:", error);
        throw error;
    }
}

export async function updateBlogPost(postId: string, postData: any) {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .update(postData)
            .eq('id', postId)
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error("Error in updateBlogPost:", error);
        throw error;
    }
}

export async function deleteBlogPost(postId: string) {
    try {
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', postId);

        if (error) throw error;
    } catch (error) {
        console.error("Error in deleteBlogPost:", error);
        throw error;
    }
}
