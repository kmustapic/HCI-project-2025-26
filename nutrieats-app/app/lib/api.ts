import { client } from '../../sanity/lib/client';
import { supabase } from './supabaseClient';
import { RECIPES_QUERY, RECIPES_SEARCH_QUERY, RECIPE_BY_ID_QUERY, RECIPES_BY_IDS_QUERY, RECIPES_BY_CATEGORY_QUERY, POSTS_QUERY, POST_BY_SLUG_QUERY, ALL_RECIPES_ID_QUERY } from '../../sanity/lib/queries';
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

export async function getRecipesByIds(ids: string[]): Promise<Recipe[]> {
    try {
        const data = await client.fetch(RECIPES_BY_IDS_QUERY, { ids });
        return (data || []).map(mapToRecipe);
    } catch (error) {
        console.error("Error in getRecipesByIds:", error);
        return [];
    }
}

export async function getRecipesByCategory(type: string, slug: string, query?: string): Promise<Recipe[]> {
    try {
        let recipes: Recipe[] = [];

        if (type === 'meal-type') {
            const data = await client.fetch(RECIPES_BY_CATEGORY_QUERY, { category: slug });
            recipes = (data || []).map(mapToRecipe);
        } else {
            // For other types like 'prep-time' or 'nutrition'
            const data = await client.fetch(RECIPES_QUERY);
            const allRecipes: Recipe[] = (data || []).map(mapToRecipe);
            const term = slug.toLowerCase();

            if (type === 'prep-time') {
                const parseTime = (timeStr: string): number => {
                    const match = timeStr.match(/(\d+)/);
                    return match ? parseInt(match[0], 10) : 0;
                };

                recipes = allRecipes.filter(r => {
                    const minutes = parseTime(r.time);
                    if (term === 'under-10') return minutes < 10;
                    if (term === '10-30') return minutes >= 10 && minutes <= 30;
                    if (term === 'over-30') return minutes > 30;
                    return true;
                });
            } else if (type === 'nutrition') {
                const formattedTerm = term.replace(/-/g, ' ');
                recipes = allRecipes.filter(r => {
                    // Check dietary tags
                    const hasTag = r.dietary && r.dietary.some((tag: string) =>
                        tag.toLowerCase().includes(formattedTerm)
                    );
                    if (hasTag) return true;

                    // Fallback to keyword matching in title or description
                    const searchSource = (r.title + ' ' + r.description).toLowerCase();
                    if (term === 'high-protein') {
                        return searchSource.includes('protein') || searchSource.includes('high protein');
                    }
                    if (term === 'low-carb') {
                        return searchSource.includes('low carb') || searchSource.includes('keto') || searchSource.includes('carb');
                    }
                    if (term === 'vegan') {
                        return searchSource.includes('vegan') || searchSource.includes('plant-based');
                    }

                    return searchSource.includes(formattedTerm);
                });
            }
        }

        if (query) {
            const lowQuery = query.toLowerCase();
            return recipes.filter(r =>
                r.title.toLowerCase().includes(lowQuery) ||
                r.description.toLowerCase().includes(lowQuery) ||
                (r.ingredients && r.ingredients.some(i => i.toLowerCase().includes(lowQuery))) ||
                (r.dietary && r.dietary.some(d => d.toLowerCase().includes(lowQuery)))
            );
        }

        return recipes;

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

export async function getPostById(id: string) {
    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error in getPostById:", error);
        return null;
    }
}

export async function getSanityPosts(): Promise<any[]> {
    try {
        const data = await client.fetch(POSTS_QUERY);
        return data || [];
    } catch (error) {
        console.error("Error in getSanityPosts:", error);
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

export async function getPostBySlug(slug: string) {
    try {
        const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });
        return post;
    } catch (error) {
        console.error("Error in getPostBySlug:", error);
        return null;
    }
}

export async function getRandomRecipeId(): Promise<string | null> {
    try {
        const data = await client.fetch(ALL_RECIPES_ID_QUERY);
        if (!data || data.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex]._id;
    } catch (error) {
        console.error("Error in getRandomRecipeId:", error);
        return null;
    }
}
