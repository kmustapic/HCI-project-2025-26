
import { NextResponse } from 'next/server';
import { toggleUserFavorite } from '@/app/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, recipeId } = body;

        if (!userId || !recipeId) {
            return NextResponse.json(
                { message: 'Missing userId or recipeId' },
                { status: 400 }
            );
        }

        const updatedUser = toggleUserFavorite(userId, recipeId);

        if (!updatedUser) {
            return NextResponse.json(
                { message: 'User not found or update failed' },
                { status: 404 }
            );
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = updatedUser;

        return NextResponse.json(userWithoutPassword, { status: 200 });

    } catch (error) {
        console.error('Favorites API error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
