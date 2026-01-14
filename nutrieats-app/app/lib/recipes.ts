export interface Recipe {
    id: string;
    title: string;
    description: string;
    image: string;
    calories: string;
    time: string;
    category: string;
    ingredients: string[];
    instructions: string[];
<<<<<<< HEAD
=======
    dietary: string[];
>>>>>>> 019dc6f... Added final project version
}

export const RECIPES: Recipe[] = [
    {
        id: '1',
        title: 'Spicy Quinoa Bowl',
        description: 'A nutrient-packed quinoa bowl with black beans, corn, avocado, and a zesty lime dressing. Perfect for a quick lunch or dinner.',
<<<<<<< HEAD
        image: '/images/spicy-quinoa-bowl.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/quinoa-salad.png',
>>>>>>> 019dc6f... Added final project version
        calories: '420 kcal',
        time: '20 min',
        category: 'Lunch',
        ingredients: ['1 cup cooked quinoa', '1/2 cup black beans', '1/2 avocado', '1/4 cup corn', '1 tbsp lime juice'],
<<<<<<< HEAD
        instructions: ['Cook quinoa according to package.', 'Mix with beans and corn.', 'Top with sliced avocado and lime juice.']
=======
        instructions: ['Cook quinoa according to package.', 'Mix with beans and corn.', 'Top with sliced avocado and lime juice.'],
        dietary: ['Vegan', 'High Protein', 'Gluten Free']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '2',
        title: 'Grilled Salmon with Asparagus',
        description: 'Fresh Atlantic salmon fillet grilled to perfection with lemon butter and served with crisp roasted asparagus.',
<<<<<<< HEAD
        image: '/images/grilled-salmon-with-asparagus.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/grilled-salmon.png',
>>>>>>> 019dc6f... Added final project version
        calories: '550 kcal',
        time: '25 min',
        category: 'Dinner',
        ingredients: ['1 salmon fillet', '1 bunch asparagus', '1 tbsp olive oil', '1 lemon', 'Salt and pepper'],
<<<<<<< HEAD
        instructions: ['Season salmon and asparagus.', 'Grill salmon for 4-5 mins per side.', 'Roast asparagus until tender.']
=======
        instructions: ['Season salmon and asparagus.', 'Grill salmon for 4-5 mins per side.', 'Roast asparagus until tender.'],
        dietary: ['High Protein', 'Low Carb', 'Gluten Free']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '3',
        title: 'Berry Blast Smoothie',
        description: 'A refreshing smoothie loaded with antioxidants from strawberries, blueberries, and raspberries.',
<<<<<<< HEAD
        image: '/images/berry-blast-smoothie.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/berry-blast-smoothie.png',
>>>>>>> 019dc6f... Added final project version
        calories: '210 kcal',
        time: '5 min',
        category: 'Breakfast',
        ingredients: ['1 cup mixed berries', '1 banana', '1/2 cup yogurt', '1/2 cup almond milk'],
<<<<<<< HEAD
        instructions: ['Combine all ingredients in a blender.', 'Blend until smooth.', 'Serve chilled.']
=======
        instructions: ['Combine all ingredients in a blender.', 'Blend until smooth.', 'Serve chilled.'],
        dietary: ['Vegetarian', 'Gluten Free']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '4',
        title: 'Avocado Toast with Egg',
        description: 'Creamy avocado spread on toasted whole grain bread, topped with a perfectly poached egg and chili flakes.',
<<<<<<< HEAD
        image: '/images/avocado-toast-with-egg.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/avocado-toast.png',
>>>>>>> 019dc6f... Added final project version
        calories: '350 kcal',
        time: '10 min',
        category: 'Breakfast',
        ingredients: ['2 slices whole grain bread', '1 ripe avocado', '2 eggs', 'Chili flakes', 'Salt'],
<<<<<<< HEAD
        instructions: ['Toast the bread.', 'Mash avocado and spread on toast.', 'Top with poached or fried eggs.']
=======
        instructions: ['Toast the bread.', 'Mash avocado and spread on toast.', 'Top with poached or fried eggs.'],
        dietary: ['Vegetarian', 'High Protein']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '5',
        title: 'Chicken Caesar Salad',
        description: 'Classic Caesar salad with crisp romaine lettuce, grilled chicken breast, croutons, and parmesan cheese.',
<<<<<<< HEAD
        image: '/images/chicken-caesar-salad.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/chicken-caesar-salad.png',
>>>>>>> 019dc6f... Added final project version
        calories: '480 kcal',
        time: '20 min',
        category: 'Lunch',
        ingredients: ['Romaine lettuce', 'Grilled chicken breast', 'Croutons', 'Parmesan cheese', 'Caesar dressing'],
<<<<<<< HEAD
        instructions: ['Chop lettuce and place in bowl.', 'Add sliced chicken and toppings.', 'Toss with dressing.']
=======
        instructions: ['Chop lettuce and place in bowl.', 'Add sliced chicken and toppings.', 'Toss with dressing.'],
        dietary: ['High Protein']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '6',
        title: 'Veggie Stir Fry',
        description: 'A colorful mix of broccoli, bell peppers, carrots, and snap peas stir-fried in a savory ginger soy sauce.',
<<<<<<< HEAD
        image: '/images/veggie-stir-fry.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/veggie-stir-fry.png',
>>>>>>> 019dc6f... Added final project version
        calories: '300 kcal',
        time: '15 min',
        category: 'Dinner',
        ingredients: ['Broccoli florets', '1 bell pepper', '1 carrot', 'Soy sauce', 'Ginger', 'Garlic'],
<<<<<<< HEAD
        instructions: ['Sauté garlic and ginger.', 'Add vegetables and stir fry until tender-crisp.', 'Stir in soy sauce.']
=======
        instructions: ['Sauté garlic and ginger.', 'Add vegetables and stir fry until tender-crisp.', 'Stir in soy sauce.'],
        dietary: ['Vegan', 'Low Carb', 'Gluten Free']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '7',
        title: 'Overnight Oats',
        description: 'Easy make-ahead breakfast with rolled oats, chia seeds, maple syrup, and almond milk.',
<<<<<<< HEAD
        image: '/images/overnight-oats.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/overnight-oats.png',
>>>>>>> 019dc6f... Added final project version
        calories: '280 kcal',
        time: '5 min',
        category: 'Breakfast',
        ingredients: ['1/2 cup rolled oats', '1/2 cup milk', '1 tbsp chia seeds', '1 tsp maple syrup'],
<<<<<<< HEAD
        instructions: ['Mix ingredients in a jar.', 'Refrigerate overnight.', 'Top with fruit before serving.']
=======
        instructions: ['Mix ingredients in a jar.', 'Refrigerate overnight.', 'Top with fruit before serving.'],
        dietary: ['Vegan', 'High Fiber']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '8',
        title: 'Greek Yogurt Parfait',
        description: 'Layers of creamy Greek yogurt, honey, granola, and fresh berries for a protein-rich snack or breakfast.',
<<<<<<< HEAD
        image: '/images/greek-yogurt-parfait.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/greek-yogurt-parfait.png',
>>>>>>> 019dc6f... Added final project version
        calories: '250 kcal',
        time: '5 min',
        category: 'Snack',
        ingredients: ['1 cup Greek yogurt', '1/4 cup granola', 'Fresh berries', 'Honey'],
<<<<<<< HEAD
        instructions: ['Layer yogurt, granola, and fruit in a glass.', 'Drizzle with honey.']
=======
        instructions: ['Layer yogurt, granola, and fruit in a glass.', 'Drizzle with honey.'],
        dietary: ['Vegetarian', 'High Protein']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '9',
        title: 'Lentil Soup',
        description: 'Hearty and warming soup made with brown lentils, carrots, celery, and aromatic spices.',
<<<<<<< HEAD
        image: '/images/lentil-soup.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/lentil-soup.png',
>>>>>>> 019dc6f... Added final project version
        calories: '320 kcal',
        time: '40 min',
        category: 'Dinner',
        ingredients: ['1 cup lentils', '1 onion', '2 carrots', 'Vegetable broth', 'Cumin'],
<<<<<<< HEAD
        instructions: ['Sauté veggies.', 'Add lentils and broth.', 'Simmer until lentils are soft.']
=======
        instructions: ['Sauté veggies.', 'Add lentils and broth.', 'Simmer until lentils are soft.'],
        dietary: ['Vegan', 'High Protein', 'High Fiber']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '10',
        title: 'Zucchini Noodles with Pesto',
        description: 'Light and fresh zucchini noodles tossed in homemade basil pesto and cherry tomatoes.',
<<<<<<< HEAD
        image: '/images/zucchini-noodles-with-pesto.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/zucchini-noodles-with-pesto.png',
>>>>>>> 019dc6f... Added final project version
        calories: '200 kcal',
        time: '15 min',
        category: 'Lunch',
        ingredients: ['2 large zucchinis', 'Basil pesto', 'Cherry tomatoes', 'Pine nuts'],
<<<<<<< HEAD
        instructions: ['Spiralize zucchini.', 'Sauté briefly.', 'Toss with pesto and tomatoes.']
=======
        instructions: ['Spiralize zucchini.', 'Sauté briefly.', 'Toss with pesto and tomatoes.'],
        dietary: ['Vegetarian', 'Low Carb', 'Keto']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '11',
        title: 'Turkey wrap',
        description: 'Whole wheat tortilla filled with sliced turkey, lettuce, tomato, and a light hummus spread.',
<<<<<<< HEAD
        image: '/images/turkey-wrap.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/turkey-wrap.png',
>>>>>>> 019dc6f... Added final project version
        calories: '350 kcal',
        time: '10 min',
        category: 'Lunch',
        ingredients: ['Tortilla', 'Sliced turkey', 'Lettuce', 'Tomato', 'Hummus'],
<<<<<<< HEAD
        instructions: ['Spread hummus on tortilla.', 'Add fillings.', 'Roll up tightly.']
=======
        instructions: ['Spread hummus on tortilla.', 'Add fillings.', 'Roll up tightly.'],
        dietary: ['High Protein']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '12',
        title: 'Baked Sweet Potato',
        description: 'Tender baked sweet potato stuffed with black beans, salsa, and a dollop of greek yogurt.',
<<<<<<< HEAD
        image: '/images/baked-sweet-potato.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/baked-sweet-potato.png',
>>>>>>> 019dc6f... Added final project version
        calories: '300 kcal',
        time: '45 min',
        category: 'Dinner',
        ingredients: ['1 sweet potato', '1/2 cup black beans', 'Salsa', 'Greek yogurt'],
<<<<<<< HEAD
        instructions: ['Bake potato at 400°F for 45 mins.', 'Slice open and stuff with toppings.']
=======
        instructions: ['Bake potato at 400°F for 45 mins.', 'Slice open and stuff with toppings.'],
        dietary: ['Vegetarian', 'Gluten Free', 'High Fiber']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '13',
        title: 'Chia Seed Pudding',
        description: 'Creamy pudding made with chia seeds and coconut milk, naturally sweetened with vanilla.',
<<<<<<< HEAD
        image: '/images/chia-pudding.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/chia-pudding.png',
>>>>>>> 019dc6f... Added final project version
        calories: '180 kcal',
        time: '5 min',
        category: 'Snack',
        ingredients: ['3 tbsp chia seeds', '1 cup coconut milk', 'Vanilla extract', 'Sweetener'],
<<<<<<< HEAD
        instructions: ['Mix seeds and milk.', 'Let sit for 15 mins then stir again.', 'Refrigerate until set.']
=======
        instructions: ['Mix seeds and milk.', 'Let sit for 15 mins then stir again.', 'Refrigerate until set.'],
        dietary: ['Vegan', 'Gluten Free', 'Keto']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '14',
        title: 'Caprese Salad',
        description: 'Simple Italian salad with fresh mozzarella, tomatoes, and basil, drizzled with balsamic glaze.',
<<<<<<< HEAD
        image: '/images/caprese-salad.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/caprese-salad.png',
>>>>>>> 019dc6f... Added final project version
        calories: '280 kcal',
        time: '10 min',
        category: 'Lunch',
        ingredients: ['Fresh mozzarella', 'Tomatoes', 'Fresh basil', 'Balsamic glaze', 'Olive oil'],
<<<<<<< HEAD
        instructions: ['Slice cheese and tomatoes.', 'Arrange on plate with basil.', 'Drizzle with oil and vinegar.']
=======
        instructions: ['Slice cheese and tomatoes.', 'Arrange on plate with basil.', 'Drizzle with oil and vinegar.'],
        dietary: ['Vegetarian', 'Gluten Free', 'Low Carb']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '15',
        title: 'Banana Oat Cookies',
        description: 'Healthy 3-ingredient cookies made with ripe bananas and oats. No added sugar.',
<<<<<<< HEAD
        image: '/images/banana-oat-cookies.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/banana-oat-cookies.png',
>>>>>>> 019dc6f... Added final project version
        calories: '150 kcal',
        time: '20 min',
        category: 'Snack',
        ingredients: ['2 ripe bananas', '1 cup oats', 'Cinnamon (optional)'],
<<<<<<< HEAD
        instructions: ['Mash bananas.', 'Mix with oats.', 'Bake at 350°F for 15 mins.']
=======
        instructions: ['Mash bananas.', 'Mix with oats.', 'Bake at 350°F for 15 mins.'],
        dietary: ['Vegan', 'Gluten Free']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '16',
        title: 'Shrimp Tacos',
        description: 'Soft tacos filled with seasoned grilled shrimp, cabbage slaw, and lime crema.',
<<<<<<< HEAD
        image: '/images/shrimp-tacos.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/shrimp-tacos.png',
>>>>>>> 019dc6f... Added final project version
        calories: '400 kcal',
        time: '20 min',
        category: 'Dinner',
        ingredients: ['Corn tortillas', 'Shrimp', 'Cabbage slaw', 'Lime', 'Sour cream'],
<<<<<<< HEAD
        instructions: ['Sauté shrimp.', 'Warm tortillas.', 'Assemble tacos with slaw and sauce.']
=======
        instructions: ['Sauté shrimp.', 'Warm tortillas.', 'Assemble tacos with slaw and sauce.'],
        dietary: ['High Protein', 'Gluten Free']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '17',
        title: 'Mushroom Risotto',
        description: 'Creamy Italian rice dish cooked slowly with vegetable broth, white wine, and sautéed mushrooms.',
<<<<<<< HEAD
        image: '/images/mushroom-risotto.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/mushroom-risotto.png',
>>>>>>> 019dc6f... Added final project version
        calories: '450 kcal',
        time: '40 min',
        category: 'Dinner',
        ingredients: ['Arborio rice', 'Mushrooms', 'Vegetable broth', 'Onion', 'Parmesan'],
<<<<<<< HEAD
        instructions: ['Sauté onions and mushrooms.', 'Add rice and toast.', 'Gradually add broth while stirring.']
=======
        instructions: ['Sauté onions and mushrooms.', 'Add rice and toast.', 'Gradually add broth while stirring.'],
        dietary: ['Vegetarian', 'Gluten Free']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '18',
        title: 'Fruit Salad',
        description: 'A vibrant mix of seasonal fruits like kiwi, pineapple, melon, and grapes.',
<<<<<<< HEAD
        image: '/images/fruit-salad.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/fruit-salad.png',
>>>>>>> 019dc6f... Added final project version
        calories: '150 kcal',
        time: '10 min',
        category: 'Snack',
        ingredients: ['Kiwi', 'Pineapple', 'Grapes', 'Melon', 'Mint'],
<<<<<<< HEAD
        instructions: ['Chop all fruit.', 'Toss together in a bowl.', 'Garnish with mint.']
=======
        instructions: ['Chop all fruit.', 'Toss together in a bowl.', 'Garnish with mint.'],
        dietary: ['Vegan', 'Gluten Free', 'Paleo']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '19',
        title: 'Egg Salad Sandwich',
        description: 'Classic egg salad with a touch of mustard and chives, served on whole wheat bread.',
<<<<<<< HEAD
        image: '/images/egg-salad-sandwich.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/egg-salad-sandwich.png',
>>>>>>> 019dc6f... Added final project version
        calories: '380 kcal',
        time: '15 min',
        category: 'Lunch',
        ingredients: ['Hard boiled eggs', 'Mayonnaise/Yogurt', 'Mustard', 'Chives', 'Bread'],
<<<<<<< HEAD
        instructions: ['Chop eggs.', 'Mix with mayo and seasonings.', 'Make sandwich.']
=======
        instructions: ['Chop eggs.', 'Mix with mayo and seasonings.', 'Make sandwich.'],
        dietary: ['Vegetarian', 'High Protein']
>>>>>>> 019dc6f... Added final project version
    },
    {
        id: '20',
        title: 'Roasted Chickpeas',
        description: 'Crunchy oven-roasted chickpeas seasoned with paprika and garlic powder. A perfect healthy snack.',
<<<<<<< HEAD
        image: '/images/roasted-chickpeas.png',
=======
        image: 'https://ihzsvzzmtbzeqmkokhwo.supabase.co/storage/v1/object/public/recipes/roasted-chickpeas.png',
>>>>>>> 019dc6f... Added final project version
        calories: '180 kcal',
        time: '30 min',
        category: 'Snack',
        ingredients: ['1 can chickpeas', 'Olive oil', 'Paprika', 'Garlic powder', 'Salt'],
<<<<<<< HEAD
        instructions: ['Drain and dry chickpeas.', 'Toss with oil and spices.', 'Roast at 400°F until crispy.']
=======
        instructions: ['Drain and dry chickpeas.', 'Toss with oil and spices.', 'Roast at 400°F until crispy.'],
        dietary: ['Vegan', 'Gluten Free', 'High Protein']
>>>>>>> 019dc6f... Added final project version
    }
];
