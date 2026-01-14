'use client';

import React, { useState } from 'react';
import { Recipe } from '../lib/recipes';

interface MealSectionProps {
    title: string;
    icon?: React.ReactNode;
    mealType: string; // 'breakfast' | 'lunch' | 'dinner' | 'snack'
    currentMeal: Recipe | null;
    availableRecipes: Recipe[];
    onAdd: (recipe: Recipe) => void;
    onRemove: () => void;
}

export default function MealSection({
    title,
    icon,
    mealType,
    currentMeal,
    availableRecipes,
    onAdd,
    onRemove
}: MealSectionProps) {
    const [isAdding, setIsAdding] = useState(false);

    // Filter recipes for this section type specifically (case-insensitive safety)
    const relevantRecipes = availableRecipes.filter(r => r.category?.toLowerCase() === mealType.toLowerCase());

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 border border-gray-100 dark:border-gray-700 shadow-sm mb-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#1a4d3e]/10 dark:bg-[#1a4d3e]/20 p-2 rounded-lg text-[#1a4d3e] dark:text-[#2d6a58]">
                    {icon || (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{title}</h3>
            </div>

            {/* Content */}
            {currentMeal ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg animate-in fade-in zoom-in duration-200">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{currentMeal.title}</p>
                        <div className="mt-1 flex items-center">
                            <span className="flex items-center gap-1.5 bg-[#fffdfa] text-orange-900 px-2.5 py-1 rounded-lg border border-orange-100 shadow-sm leading-none">
                                <span className="text-sm font-bold flex items-center gap-1">
                                    <span>🔥</span>
                                    <span>{currentMeal.calories.split(' ')[0]}</span>
                                </span>
                                <span className="text-[10px] font-medium opacity-70 lowercase">
                                    {currentMeal.calories.split(' ')[1]}
                                </span>
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onRemove}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <div>
                    {!isAdding ? (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-[#1a4d3e] hover:text-[#1a4d3e] dark:hover:border-[#2d6a58] dark:hover:text-[#2d6a58] transition-all flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add {title}
                        </button>
                    ) : (
                        <div className="animate-in slide-in-from-top-2 duration-200">
                            <select
                                className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1a4d3e] outline-none text-gray-800 dark:text-white"
                                onChange={(e) => {
                                    const recipe = relevantRecipes.find(r => r.id === e.target.value);
                                    if (recipe) {
                                        onAdd(recipe);
                                        setIsAdding(false);
                                    }
                                }}
                                defaultValue=""
                                autoFocus
                            >
                                <option value="" disabled>Select a {title.toLowerCase()}...</option>
                                {relevantRecipes.map(r => (
                                    <option key={r.id} value={r.id}>
                                        {r.title} (🔥 {r.calories})
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => setIsAdding(false)}
                                className="mt-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 w-full text-center"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
