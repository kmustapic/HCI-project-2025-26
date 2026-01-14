'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

interface SavedMealPlan {
    date: string; // YYYY-MM-DD
    meals: {
        breakfast: any;
        lunch: any;
        dinner: any;
        snack: any;
    };
    totalCalories: number;
}

export default function MyMealsPage() {
    const { user } = useAuth();
    const [savedPlans, setSavedPlans] = useState<SavedMealPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<SavedMealPlan | null>(null); // For Preview Modal
    const [planToDelete, setPlanToDelete] = useState<string | null>(null); // State for delete confirmation

    useEffect(() => {
        if (!user) return;

        async function fetchSavedPlans() {
            setLoading(true);

            const { data, error } = await supabase
                .from('meal_plans')
                .select('date, meals')
                .eq('user_id', user!.id)
                .order('date', { ascending: true });

            if (error) {
                console.error("Error fetching meal plans:", error);
            } else if (data) {
                const plans = data.map(row => {
                    const meals = row.meals;
                    // Calculate total calories on the fly
                    const totalCalories = Object.values(meals as any).reduce((acc: number, meal: any) => {
                        if (!meal?.calories) return acc;
                        const cals = parseInt(meal.calories.toString().replace(/\D/g, ''));
                        return acc + (isNaN(cals) ? 0 : cals);
                    }, 0);

                    return {
                        date: row.date,
                        meals: meals,
                        totalCalories
                    };
                });
                setSavedPlans(plans as SavedMealPlan[]);
            }
            setLoading(false);
        }

        fetchSavedPlans();
    }, [user]);

    const handleConfirmDelete = async () => {
        if (!user || !planToDelete) return;

        const dateToRemove = planToDelete;
        setPlanToDelete(null); // Close modal immediately

        // Optimistic update
        setSavedPlans(prev => prev.filter(p => p.date !== dateToRemove));
        if (selectedPlan?.date === dateToRemove) setSelectedPlan(null);

        const { error } = await supabase
            .from('meal_plans')
            .delete()
            .eq('user_id', user.id)
            .eq('date', dateToRemove);

        if (error) {
            console.error("Error deleting plan:", error);
            alert("Failed to delete plan");
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#fcfcfc] dark:bg-gray-900 py-16 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link href="/meal-planner" className="inline-flex items-center text-lg font-medium text-gray-500 hover:text-[#1a4d3e] transition-colors">
                            ← Back to Meal Planner
                        </Link>
                    </div>
                    <header className="mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Saved Plans</h1>
                            <p className="text-gray-500 dark:text-gray-400">Review your nutrition history.</p>
                        </div>
                    </header>

                    {loading ? (
                        <div className="flex justify-center p-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4d3e]"></div>
                        </div>
                    ) : savedPlans.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-gray-300 mx-auto mb-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">You haven&apos;t saved any meal plans yet.</p>
                            <Link href="/meal-planner" className="text-[#1a4d3e] hover:underline font-medium mt-2 inline-block">
                                Start planning now &rarr;
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {savedPlans.map((plan) => (
                                <div
                                    key={plan.date}
                                    onClick={() => setSelectedPlan(plan)}
                                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group cursor-pointer hover:border-[#1a4d3e]/40 dark:hover:border-[#1a4d3e] hover:shadow-md transition-all"
                                >

                                    {/* Date & Quick Info */}
                                    <div className="flex items-start gap-4 pointer-events-none">
                                        <div className="bg-[#1a4d3e]/10 dark:bg-[#1a4d3e]/20 text-[#1a4d3e] dark:text-[#2d6a58] rounded-lg p-3 text-center min-w-[70px]">
                                            <span className="block text-xs uppercase font-bold tracking-wider">
                                                {new Date(plan.date).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })}
                                            </span>
                                            <span className="block text-2xl font-bold leading-none mt-1">
                                                {new Date(plan.date).getUTCDate()}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                                                {new Date(plan.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1.5 bg-[#fffdfa] text-orange-900 px-2 py-0.5 rounded-lg border border-orange-100 shadow-sm leading-none">
                                                    <span className="text-xs font-bold flex items-center gap-1">
                                                        <span>🔥</span>
                                                        <span>{plan.totalCalories.toLocaleString()}</span>
                                                    </span>
                                                    <span className="text-[10px] font-medium opacity-70 lowercase">
                                                        cal
                                                    </span>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400">
                                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                    </svg>
                                                    {(() => {
                                                        const count = Object.values(plan.meals).filter(m => m !== null).length;
                                                        return `${count} ${count === 1 ? 'meal' : 'meals'}`;
                                                    })()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <Link
                                            href={`/meal-planner?date=${plan.date}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-1 md:flex-none py-2 px-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-[#1a4d3e]/10 hover:text-[#1a4d3e] dark:hover:bg-gray-600 transition-colors text-center"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPlanToDelete(plan.date);
                                            }}
                                            className="p-2 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors z-10"
                                            title="Delete plan"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                    {/* Plan Details Modal */}
                    {selectedPlan && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                            onClick={() => setSelectedPlan(null)}
                        >
                            <div
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full transform scale-100 animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-start mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {new Date(selectedPlan.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                                        </h3>
                                        <p className="text-[#1a4d3e] dark:text-[#2d6a58] font-bold flex items-center gap-1.5">
                                            <span className="text-lg">🔥</span>
                                            <span>{selectedPlan.totalCalories.toLocaleString()} calories Total</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedPlan(null)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4 mb-8 max-h-[60vh] overflow-y-auto pr-2">
                                    {/* Meal Items */}
                                    {Object.entries(selectedPlan.meals)
                                        .sort(([a], [b]) => {
                                            const order = ['breakfast', 'lunch', 'dinner', 'snack'];
                                            return order.indexOf(a) - order.indexOf(b);
                                        })
                                        .map(([type, meal]: [string, any]) => (
                                            <div key={type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm text-gray-400 capitalize text-xs font-bold w-20 text-center">
                                                        {type}
                                                    </div>
                                                    <div>
                                                        {meal ? (
                                                            <>
                                                                <p className="font-semibold text-gray-800 dark:text-white text-sm">{meal.title || meal.name}</p>
                                                            </>
                                                        ) : (
                                                            <span className="text-gray-400 italic text-sm">Not planned</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        href={`/meal-planner?date=${selectedPlan.date}`}
                                        style={{ color: '#ffffff' }}
                                        className="flex-1 bg-[#1a4d3e] hover:opacity-90 !text-white font-bold py-3 rounded-xl text-center shadow-lg shadow-[#1a4d3e]/20 dark:shadow-none transition-colors"
                                    >
                                        Edit Plan
                                    </Link>
                                    <button
                                        onClick={() => setSelectedPlan(null)}
                                        className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 rounded-xl transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Delete Confirmation Modal */}
                    {planToDelete && (() => {
                        const planToWarn = savedPlans.find(p => p.date === planToDelete);
                        return (
                            <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
                                <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-2xl max-w-sm w-full transform transition-all scale-100 animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-gray-700">
                                    <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Delete Plan?</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-center leading-relaxed">
                                        Are you sure you want to delete this meal plan for <span className="font-bold text-gray-700 dark:text-gray-200">{new Date(planToDelete).toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' })}</span>?
                                    </p>

                                    {/* Plan Preview Section */}
                                    {planToWarn && (
                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 mb-8 border border-gray-100 dark:border-gray-700 max-h-48 overflow-y-auto">
                                            <div className="space-y-3">
                                                {Object.entries(planToWarn.meals)
                                                    .filter(([_, meal]) => meal !== null)
                                                    .sort(([a], [b]) => {
                                                        const order = ['breakfast', 'lunch', 'dinner', 'snack'];
                                                        return order.indexOf(a) - order.indexOf(b);
                                                    })
                                                    .map(([type, meal]: [string, any]) => (
                                                        <div key={type} className="flex flex-col">
                                                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">{type}</span>
                                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 line-clamp-1">
                                                                {meal.title || meal.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col items-center gap-3">
                                        <button
                                            onClick={handleConfirmDelete}
                                            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all font-bold shadow-lg shadow-red-500/25 active:scale-[0.98]"
                                        >
                                            Delete Forever
                                        </button>
                                        <button
                                            onClick={() => setPlanToDelete(null)}
                                            className="w-full py-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </ProtectedRoute>
    );
}
