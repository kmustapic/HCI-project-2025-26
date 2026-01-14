'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { RECIPES } from '../../lib/recipes';
import { useAuth } from '../../context/AuthContext'; // Import Auth

export default function SeedPage() {
    const { user } = useAuth(); // Check user
    const [status, setStatus] = useState('Idle');
    const [debugInfo, setDebugInfo] = useState('');

    const seedRecipes = async () => {
        if (!user) {
            setStatus('Error: You must be logged in to seed data (RLS).');
            return;
        }

        setStatus('Cleaning old data...');
        setDebugInfo('');

        // 1. Clear existing recipes to prevent duplicates
        const { error: deleteError } = await supabase
            .from('recipes')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows (id != 0 uuid)

        if (deleteError) {
            setStatus('Error clearing old data: ' + deleteError.message);
            setDebugInfo(JSON.stringify(deleteError, null, 2));
            return; // STOP here. Do not insert if delete failed.
        }

        setStatus('Seeding...');

        // Transform data from lib/recipes.ts (Rich Data) to match Supabase Schema
        // Source: { id, title, description, image, calories (string), time, category, ingredients, instructions, dietary }
        // Target: { name, description, image_url, calories (int), prep_time, category, ingredients, instructions, dietary }

        const cleanData = RECIPES.map((r) => ({
            name: r.title,
            description: r.description,
            prep_time: r.time,
            image_url: r.image,
            calories: parseInt(r.calories) || 0, // "420 kcal" -> 420
            category: (r.category || 'misc').toLowerCase(),
            ingredients: r.ingredients,
            instructions: r.instructions,
            dietary: r.dietary
        }));

        // Enable bulk insert
        const { error } = await supabase.from('recipes').insert(cleanData);

        if (error) {
            setStatus('Error: ' + error.message);
            setDebugInfo(JSON.stringify(error, null, 2));
            console.error(error);
        } else {
            setStatus('Success! ' + cleanData.length + ' recipes uploaded.');
        }
    };

    return (
        <div className="p-10 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Database Seeder</h1>

            <div className="mb-4 p-4 bg-gray-100 rounded">
                <p><strong>User Status:</strong> {user ? 'Logged In (' + user.email + ')' : 'NOT LOGGED IN (RLS will fail)'}</p>
                <p><strong>Status:</strong> {status}</p>
            </div>

            {debugInfo && (
                <pre className="bg-red-50 text-red-600 p-4 rounded overflow-auto text-sm mb-4 border border-red-200">
                    {debugInfo}
                </pre>
            )}

            <button
                onClick={seedRecipes}
                disabled={!user}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Upload Recipes to DB
            </button>
        </div>
    );
}
