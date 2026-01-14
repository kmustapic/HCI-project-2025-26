'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getRandomRecipeId } from '../lib/api';

export default function SurpriseMeButton({ className }: { className?: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSurpriseMe = async () => {
        setIsLoading(true);
        try {
            const randomId = await getRandomRecipeId();
            if (randomId) {
                router.push(`/products/${randomId}?source=home`);
            } else {
                console.error('No recipes found');
                // Optional: Show a toast or alert to the user
            }
        } catch (error) {
            console.error('Error fetching random recipe:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSurpriseMe}
            disabled={isLoading}
            className={`btn-shine bg-[#e0f2e6] text-[#1a4d3e] border-2 border-[#1a4d3e] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#1a4d3e]/10 transition-all shadow-lg hover:shadow-xl ${isLoading ? 'opacity-70 cursor-wait' : ''
                } ${className || ''}`}
        >
            Surprise Me
        </button>
    );
}
