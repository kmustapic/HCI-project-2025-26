'use client';

import React, { useState, useEffect, Suspense } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import DateSelector from '../components/DateSelector';
import MealSection from '../components/MealSection';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { useRecipes } from '../hooks/useRecipes';
import { Recipe } from '../lib/recipes';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
// import recipesData from '../../data/recipes.json'; // Removed: Using dynamic hook instead

interface DailyMeals {
  breakfast: Recipe | null;
  lunch: Recipe | null;
  dinner: Recipe | null;
  snack: Recipe | null;
}

// Key structure: `meal-plan-${userId}-${dateString}`
// dateString format: YYYY-MM-DD

function MealPlannerContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load recipes from Supabase
  const { recipes: availableRecipes, loading: recipesLoading } = useRecipes();

  // Initial date from URL or today
  const initialDateStr = searchParams ? searchParams.get('date') : null;
  const initialDate = initialDateStr ? new Date(initialDateStr) : new Date();

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [meals, setMeals] = useState<DailyMeals>({
    breakfast: null,
    lunch: null,
    dinner: null,
    snack: null
  });
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Update URL when date changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateStr = selectedDate.toISOString().split('T')[0];
    if (params.get('date') !== dateStr) {
      router.push(`/meal-planner?date=${dateStr}`);
    }
  }, [selectedDate, router]);

  // Helper to format date key
  const getDateKey = React.useCallback((date: Date) => {
    return date.toISOString().split('T')[0];
  }, []);

  // FETCH MEAL PLAN FROM DB
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const dateStr = getDateKey(selectedDate);

    async function fetchPlan() {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('meals')
        .eq('user_id', user!.id)
        .eq('date', dateStr)
        .single();

      if (data && data.meals) {
        setMeals(data.meals);
      } else {
        // No plan found for this date, reset to empty
        setMeals({
          breakfast: null,
          lunch: null,
          dinner: null,
          snack: null
        });
      }
      setLoading(false);
    }

    fetchPlan();
  }, [selectedDate, user, getDateKey]);

  // Update local state (no auto-save to DB to prevent excessive API calls)
  const updateMeal = (type: keyof DailyMeals, recipe: Recipe | null) => {
    if (!user) return;
    const newMeals = { ...meals, [type]: recipe };
    setMeals(newMeals);
  };

  const savePlan = async () => {
    if (!user) return;

    if (totalCalories === 0) {
      setShowErrorModal(true);
      return;
    }

    const dateStr = getDateKey(selectedDate);

    // UPSERT: Insert or Update if exists
    // We need to query if it exists first or use upsert if table has constraints.
    // Since we didn't set a unique constraint on (user_id, date) in the SQL snippet I provided (oops!),
    // we should rely on checking existing ID or simple delete-then-insert methodology,
    // OR ideally alter the table to have unique constraint.
    // FOR SAFETY: Let's check if a row exists, then update it, else insert.
    // Actually, `upsert` works best with Primary Key.
    // Let's use a "select -> update/insert" approach for safety without unique constraint on date.

    // 1. Check if plan exists for this date/user
    const { data: existing } = await supabase
      .from('meal_plans')
      .select('id')
      .eq('user_id', user.id)
      .eq('date', dateStr)
      .maybeSingle();

    let error;

    if (existing) {
      // Update
      const res = await supabase
        .from('meal_plans')
        .update({ meals: meals })
        .eq('id', existing.id);
      error = res.error;
    } else {
      // Insert
      const res = await supabase
        .from('meal_plans')
        .insert({
          user_id: user.id,
          date: dateStr,
          meals: meals
        });
      error = res.error;
    }

    if (error) {
      console.error("Error saving plan:", error);
      alert("Failed to save plan. Please try again.");
    } else {
      setShowSuccessModal(true);
    }
  };

  // Calculate totals
  const totalCalories = Object.values(meals).reduce((acc, meal) => {
    if (!meal?.calories) return acc;
    // Extract numbers from string like "450 kcal"
    const cals = parseInt(meal.calories.toString().replace(/\D/g, ''));
    return acc + (isNaN(cals) ? 0 : cals);
  }, 0);

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-gray-900 py-8 px-4 md:px-8 pb-24 overflow-x-clip">
      <div className="max-w-4xl mx-auto">

        <header className="mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">Meal Planner</h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Plan your daily nutrition.</p>
          </div>
          <Link
            href="/my-meals"
            className="w-full md:w-auto bg-white dark:bg-gray-800 text-[#1a4d3e] dark:text-[#2d6a58] border-2 border-[#1a4d3e]/20 dark:border-[#1a4d3e]/50 px-6 py-2.5 rounded-xl font-bold hover:bg-[#1a4d3e]/5 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            View Saved Plans
          </Link>
        </header>

        <DateSelector
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        {/* Daily Summary Card */}
        <div className="bg-gradient-to-br from-[#1a4d3e] via-[#143d31] to-[#0f2e25] rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 flex justify-between items-center relative overflow-hidden md:sticky md:top-20 z-20 transition-all border border-white/10">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-xl md:text-3xl font-black mb-1 md:mb-2 tracking-tight">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-green-300 font-black opacity-90">Daily Goal</span>
              <span className="h-px w-8 bg-green-500/50"></span>
              <span className="text-[10px] md:text-xs font-bold text-white">2000 kcal</span>
            </div>
          </div>
          <div className="text-right relative z-10">
            <div className="text-3xl md:text-5xl font-black leading-none tabular-nums tracking-tighter mb-1">{totalCalories}</div>
            <div className="text-[10px] md:text-xs uppercase tracking-widest text-green-300 font-black opacity-80">Total Calories</div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a4d3e]"></div>
          </div>
        ) : (
          <div className="space-y-4">
            <MealSection
              title="Breakfast"
              mealType="breakfast"
              currentMeal={meals.breakfast}
              availableRecipes={availableRecipes}
              onAdd={(r) => updateMeal('breakfast', r)}
              onRemove={() => updateMeal('breakfast', null)}
            />
            <MealSection
              title="Lunch"
              mealType="lunch"
              currentMeal={meals.lunch}
              availableRecipes={availableRecipes}
              onAdd={(r) => updateMeal('lunch', r)}
              onRemove={() => updateMeal('lunch', null)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              }
            />
            <MealSection
              title="Dinner"
              mealType="dinner"
              currentMeal={meals.dinner}
              availableRecipes={availableRecipes}
              onAdd={(r) => updateMeal('dinner', r)}
              onRemove={() => updateMeal('dinner', null)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              }
            />
            <MealSection
              title="Snack"
              mealType="snack"
              currentMeal={meals.snack}
              availableRecipes={availableRecipes}
              onAdd={(r) => updateMeal('snack', r)}
              onRemove={() => updateMeal('snack', null)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              }
            />
          </div>
        )}

        {/* Footer Save Action */}
        <div className="mt-8 flex justify-center pb-10">
          <button
            onClick={savePlan}
            style={{ color: '#ffffff' }}
            className="bg-[#1a4d3e] hover:opacity-90 !text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-[#1a4d3e]/20 dark:shadow-[#1a4d3e]/40 hover:-translate-y-1 transition-all flex items-center gap-3 text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Save Daily Plan
          </button>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-100 animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-[#1a4d3e]/10 dark:bg-[#1a4d3e]/30 text-[#1a4d3e] dark:text-[#2d6a58] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Plan Saved!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Your meal plan for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} has been successfully saved to your collection.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/my-meals"
                  style={{ color: '#ffffff' }}
                  className="w-full py-3 bg-[#1a4d3e] hover:opacity-90 !text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#1a4d3e]/20 dark:shadow-none"
                >
                  Go to My Meals
                </Link>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 text-gray-500 font-medium hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Continue Planning
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-8 md:p-10 max-w-md w-full text-center transform scale-100 animate-in zoom-in-95 duration-300 border border-red-50 dark:border-red-900/20">
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Empty Plan!</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed text-lg">
                Your daily plan currently has <span className="font-bold text-red-500 dark:text-red-400">0 calories</span>. Please add at least one meal before saving.
              </p>
              <button
                onClick={() => setShowErrorModal(false)}
                style={{ color: '#ffffff' }}
                className="w-full py-4 bg-gray-900 dark:bg-white dark:text-black !text-white font-black rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] text-lg uppercase tracking-wider"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MealPlannerPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <MealPlannerContent />
      </Suspense>
    </ProtectedRoute>
  );
}
