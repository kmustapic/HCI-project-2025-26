
const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const { fetch } = require('undici');

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: 'cpf6s63u',
    dataset: 'production',
    token: 'skrnUxPIwKHEG2cjiQ83EbH9hMzbXiyvpS2Ds7bH77OF1vhxtkySAv7CSgEDWrOEgihKk0co8i1QZECPiVU2yo8qeXWAWZ1m4t9d6gKkkI1JDbHll3BDXTsT22wRULWhIeXcn8tAObcZ5NMfjS8uuu9C059wdAj7XLjnDNObtEbUSxm9eFT4',
    apiVersion: '2024-01-01',
    useCdn: false,
});

const RECIPES = [
    {
        id: '1',
        title: 'Spicy Quinoa Bowl',
        description: 'A nutrient-packed quinoa bowl with black beans, corn, avocado, and a zesty lime dressing. Perfect for a quick lunch or dinner.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/quinoa-salad.png',
        calories: '420 kcal',
        time: '20 min',
        category: 'Lunch',
        ingredients: ['1 cup cooked quinoa', '1/2 cup black beans', '1/2 avocado', '1/4 cup corn', '1 tbsp lime juice'],
        instructions: ['Cook quinoa according to package.', 'Mix with beans and corn.', 'Top with sliced avocado and lime juice.'],
        dietary: ['Vegan', 'High Protein', 'Gluten Free']
    },
    {
        id: '2',
        title: 'Grilled Salmon with Asparagus',
        description: 'Fresh Atlantic salmon fillet grilled to perfection with lemon butter and served with crisp roasted asparagus.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/grilled-salmon.png',
        calories: '550 kcal',
        time: '25 min',
        category: 'Dinner',
        ingredients: ['1 salmon fillet', '1 bunch asparagus', '1 tbsp olive oil', '1 lemon', 'Salt and pepper'],
        instructions: ['Season salmon and asparagus.', 'Grill salmon for 4-5 mins per side.', 'Roast asparagus until tender.'],
        dietary: ['High Protein', 'Low Carb', 'Gluten Free']
    },
    {
        id: '3',
        title: 'Berry Blast Smoothie',
        description: 'A refreshing smoothie loaded with antioxidants from strawberries, blueberries, and raspberries.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/berry-blast-smoothie.png',
        calories: '210 kcal',
        time: '5 min',
        category: 'Breakfast',
        ingredients: ['1 cup mixed berries', '1 banana', '1/2 cup yogurt', '1/2 cup almond milk'],
        instructions: ['Combine all ingredients in a blender.', 'Blend until smooth.', 'Serve chilled.'],
        dietary: ['Vegetarian', 'Gluten Free']
    },
    {
        id: '4',
        title: 'Avocado Toast with Egg',
        description: 'Creamy avocado spread on toasted whole grain bread, topped with a perfectly poached egg and chili flakes.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/avocado-toast.png',
        calories: '350 kcal',
        time: '10 min',
        category: 'Breakfast',
        ingredients: ['2 slices whole grain bread', '1 ripe avocado', '2 eggs', 'Chili flakes', 'Salt'],
        instructions: ['Toast the bread.', 'Mash avocado and spread on toast.', 'Top with poached or fried eggs.'],
        dietary: ['Vegetarian', 'High Protein']
    },
    {
        id: '5',
        title: 'Chicken Caesar Salad',
        description: 'Classic Caesar salad with crisp romaine lettuce, grilled chicken breast, croutons, and parmesan cheese.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/chicken-caesar-salad.png',
        calories: '480 kcal',
        time: '20 min',
        category: 'Lunch',
        ingredients: ['Romaine lettuce', 'Grilled chicken breast', 'Croutons', 'Parmesan cheese', 'Caesar dressing'],
        instructions: ['Chop lettuce and place in bowl.', 'Add sliced chicken and toppings.', 'Toss with dressing.'],
        dietary: ['High Protein']
    },
    {
        id: '6',
        title: 'Veggie Stir Fry',
        description: 'A colorful mix of broccoli, bell peppers, carrots, and snap peas stir-fried in a savory ginger soy sauce.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/veggie-stir-fry.png',
        calories: '300 kcal',
        time: '15 min',
        category: 'Dinner',
        ingredients: ['Broccoli florets', '1 bell pepper', '1 carrot', 'Soy sauce', 'Ginger', 'Garlic'],
        instructions: ['Sauté garlic and ginger.', 'Add vegetables and stir fry until tender-crisp.', 'Stir in soy sauce.'],
        dietary: ['Vegan', 'Low Carb', 'Gluten Free']
    },
    {
        id: '7',
        title: 'Overnight Oats',
        description: 'Easy make-ahead breakfast with rolled oats, chia seeds, maple syrup, and almond milk.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/overnight-oats.png',
        calories: '280 kcal',
        time: '5 min',
        category: 'Breakfast',
        ingredients: ['1/2 cup rolled oats', '1/2 cup milk', '1 tbsp chia seeds', '1 tsp maple syrup'],
        instructions: ['Mix ingredients in a jar.', 'Refrigerate overnight.', 'Top with fruit before serving.'],
        dietary: ['Vegan', 'High Fiber']
    },
    {
        id: '8',
        title: 'Greek Yogurt Parfait',
        description: 'Layers of creamy Greek yogurt, honey, granola, and fresh berries for a protein-rich snack or breakfast.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/greek-yogurt-parfait.png',
        calories: '250 kcal',
        time: '5 min',
        category: 'Snack',
        ingredients: ['1 cup Greek yogurt', '1/4 cup granola', 'Fresh berries', 'Honey'],
        instructions: ['Layer yogurt, granola, and fruit in a glass.', 'Drizzle with honey.'],
        dietary: ['Vegetarian', 'High Protein']
    },
    {
        id: '9',
        title: 'Lentil Soup',
        description: 'Hearty and warming soup made with brown lentils, carrots, celery, and aromatic spices.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/lentil-soup.png',
        calories: '320 kcal',
        time: '40 min',
        category: 'Dinner',
        ingredients: ['1 cup lentils', '1 onion', '2 carrots', 'Vegetable broth', 'Cumin'],
        instructions: ['Sauté veggies.', 'Add lentils and broth.', 'Simmer until lentils are soft.'],
        dietary: ['Vegan', 'High Protein', 'High Fiber']
    },
    {
        id: '10',
        title: 'Zucchini Noodles with Pesto',
        description: 'Light and fresh zucchini noodles tossed in homemade basil pesto and cherry tomatoes.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/zucchini-noodles-with-pesto.png',
        calories: '200 kcal',
        time: '15 min',
        category: 'Lunch',
        ingredients: ['2 large zucchinis', 'Basil pesto', 'Cherry tomatoes', 'Pine nuts'],
        instructions: ['Spiralize zucchini.', 'Sauté briefly.', 'Toss with pesto and tomatoes.'],
        dietary: ['Vegetarian', 'Low Carb', 'Keto']
    },
    {
        id: '11',
        title: 'Turkey wrap',
        description: 'Whole wheat tortilla filled with sliced turkey, lettuce, tomato, and a light hummus spread.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/turkey-wrap.png',
        calories: '350 kcal',
        time: '10 min',
        category: 'Lunch',
        ingredients: ['Tortilla', 'Sliced turkey', 'Lettuce', 'Tomato', 'Hummus'],
        instructions: ['Spread hummus on tortilla.', 'Add fillings.', 'Roll up tightly.'],
        dietary: ['High Protein']
    },
    {
        id: '12',
        title: 'Baked Sweet Potato',
        description: 'Tender baked sweet potato stuffed with black beans, salsa, and a dollop of greek yogurt.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/baked-sweet-potato.png',
        calories: '300 kcal',
        time: '45 min',
        category: 'Dinner',
        ingredients: ['1 sweet potato', '1/2 cup black beans', 'Salsa', 'Greek yogurt'],
        instructions: ['Bake potato at 400°F for 45 mins.', 'Slice open and stuff with toppings.'],
        dietary: ['Vegetarian', 'Gluten Free', 'High Fiber']
    },
    {
        id: '13',
        title: 'Chia Seed Pudding',
        description: 'Creamy pudding made with chia seeds and coconut milk, naturally sweetened with vanilla.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/chia-pudding.png',
        calories: '180 kcal',
        time: '5 min',
        category: 'Snack',
        ingredients: ['3 tbsp chia seeds', '1 cup coconut milk', 'Vanilla extract', 'Sweetener'],
        instructions: ['Mix seeds and milk.', 'Let sit for 15 mins then stir again.', 'Refrigerate until set.'],
        dietary: ['Vegan', 'Gluten Free', 'Keto']
    },
    {
        id: '14',
        title: 'Caprese Salad',
        description: 'Simple Italian salad with fresh mozzarella, tomatoes, and basil, drizzled with balsamic glaze.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/caprese-salad.png',
        calories: '280 kcal',
        time: '10 min',
        category: 'Lunch',
        ingredients: ['Fresh mozzarella', 'Tomatoes', 'Fresh basil', 'Balsamic glaze', 'Olive oil'],
        instructions: ['Slice cheese and tomatoes.', 'Arrange on plate with basil.', 'Drizzle with oil and vinegar.'],
        dietary: ['Vegetarian', 'Gluten Free', 'Low Carb']
    },
    {
        id: '15',
        title: 'Banana Oat Cookies',
        description: 'Healthy 3-ingredient cookies made with ripe bananas and oats. No added sugar.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/banana-oat-cookies.png',
        calories: '150 kcal',
        time: '20 min',
        category: 'Snack',
        ingredients: ['2 ripe bananas', '1 cup oats', 'Cinnamon (optional)'],
        instructions: ['Mash bananas.', 'Mix with oats.', 'Bake at 350°F for 15 mins.'],
        dietary: ['Vegan', 'Gluten Free']
    },
    {
        id: '16',
        title: 'Shrimp Tacos',
        description: 'Soft tacos filled with seasoned grilled shrimp, cabbage slaw, and lime crema.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/shrimp-tacos.png',
        calories: '400 kcal',
        time: '20 min',
        category: 'Dinner',
        ingredients: ['Corn tortillas', 'Shrimp', 'Cabbage slaw', 'Lime', 'Sour cream'],
        instructions: ['Sauté shrimp.', 'Warm tortillas.', 'Assemble tacos with slaw and sauce.'],
        dietary: ['High Protein', 'Gluten Free']
    },
    {
        id: '17',
        title: 'Mushroom Risotto',
        description: 'Creamy Italian rice dish cooked slowly with vegetable broth, white wine, and sautéed mushrooms.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/mushroom-risotto.png',
        calories: '450 kcal',
        time: '40 min',
        category: 'Dinner',
        ingredients: ['Arborio rice', 'Mushrooms', 'Vegetable broth', 'Onion', 'Parmesan'],
        instructions: ['Sauté onions and mushrooms.', 'Add rice and toast.', 'Gradually add broth while stirring.'],
        dietary: ['Vegetarian', 'Gluten Free']
    },
    {
        id: '18',
        title: 'Fruit Salad',
        description: 'A vibrant mix of seasonal fruits like kiwi, pineapple, melon, and grapes.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/fruit-salad.png',
        calories: '150 kcal',
        time: '10 min',
        category: 'Snack',
        ingredients: ['Kiwi', 'Pineapple', 'Grapes', 'Melon', 'Mint'],
        instructions: ['Chop all fruit.', 'Toss together in a bowl.', 'Garnish with mint.'],
        dietary: ['Vegan', 'Gluten Free', 'Paleo']
    },
    {
        id: '19',
        title: 'Egg Salad Sandwich',
        description: 'Classic egg salad with a touch of mustard and chives, served on whole wheat bread.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/egg-salad-sandwich.png',
        calories: '380 kcal',
        time: '15 min',
        category: 'Lunch',
        ingredients: ['Hard boiled eggs', 'Mayonnaise/Yogurt', 'Mustard', 'Chives', 'Bread'],
        instructions: ['Chop eggs.', 'Mix with mayo and seasonings.', 'Make sandwich.'],
        dietary: ['Vegetarian', 'High Protein']
    },
    {
        id: '20',
        title: 'Roasted Chickpeas',
        description: 'Crunchy oven-roasted chickpeas seasoned with paprika and garlic powder. A perfect healthy snack.',
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/roasted-chickpeas.png',
        calories: '180 kcal',
        time: '30 min',
        category: 'Snack',
        ingredients: ['1 can chickpeas', 'Olive oil', 'Paprika', 'Garlic powder', 'Salt'],
        instructions: ['Drain and dry chickpeas.', 'Toss with oil and spices.', 'Roast at 400°F until crispy.'],
        dietary: ['Vegan', 'Gluten Free', 'High Protein']
    }
];

async function uploadImage(url) {
    if (!url) return null;
    try {
        console.log(`Downloading: ${url}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(`Uploading to Sanity...`);
        const asset = await client.assets.upload('image', buffer, {
            filename: url.split('/').pop(),
            contentType: blob.type
        });

        console.log(`Asset ID: ${asset._id}`);
        return asset._id;
    } catch (err) {
        console.error(`Error with ${url}:`, err.message);
        return null;
    }
}

async function migrate() {
    for (const recipe of RECIPES) {
        console.log(`\n--- Migrating ${recipe.title} ---`);
        let assetId = await uploadImage(recipe.image);

        const doc = {
            _type: 'recipe',
            _id: `recipe-${recipe.id}`,
            name: recipe.title,
            description: recipe.description,
            calories: parseInt(recipe.calories) || 0,
            type: recipe.category.toLowerCase(),
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            dietary: recipe.dietary,
            image: assetId ? {
                _type: 'image',
                asset: { _type: 'reference', _ref: assetId }
            } : undefined
        };

        try {
            await client.createOrReplace(doc);
            console.log(`✓ Updated ${recipe.title}`);
        } catch (err) {
            console.error(`✗ Failed ${recipe.title}:`, err.message);
        }
    }
    console.log('\nMigration complete!');
}

migrate();
