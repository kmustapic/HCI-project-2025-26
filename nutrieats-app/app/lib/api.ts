import { RECIPES, Recipe } from './recipes';

export async function getProducts(): Promise<Recipe[]> {
    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 100));
    return RECIPES;
}

export async function getProduct(id: string): Promise<Recipe> {
    // Simulate API delay
    // await new Promise(resolve => setTimeout(resolve, 100));

    const recipe = RECIPES.find(r => r.id === id);

    if (!recipe) {
        throw new Error('Recipe not found');
    }

    return recipe;
}
