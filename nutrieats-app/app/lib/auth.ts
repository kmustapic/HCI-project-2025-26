
import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');
const usersFilePath = path.join(dataDirectory, 'users.json');

export interface User {
    id: string;
    name: string;
    email: string;
    password: string; // Storing plain text as requested for this phase, but should be hashed in production
    favorites?: string[]; // Array of recipe IDs
}

// Ensure data directory exists
if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
}

// Ensure users file exists
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
}

export function getAllUsers(): User[] {
    try {
        const fileContents = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
}

export function addUser(user: User): void {
    const users = getAllUsers();
    // Ensure favorites is initialized
    if (!user.favorites) {
        user.favorites = [];
    }
    users.push(user);
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing users file:', error);
    }
}

export function findUserByEmail(email: string): User | undefined {
    const users = getAllUsers();
    return users.find((user) => user.email === email);
}

export function findUserById(id: string): User | undefined {
    const users = getAllUsers();
    return users.find((user) => user.id === id);
}

export function toggleUserFavorite(userId: string, recipeId: string): User | null {
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) return null;

    const user = users[userIndex];
    if (!user.favorites) user.favorites = [];

    const favIndex = user.favorites.indexOf(recipeId);
    if (favIndex === -1) {
        user.favorites.push(recipeId);
    } else {
        user.favorites.splice(favIndex, 1);
    }

    users[userIndex] = user;

    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        return user;
    } catch (error) {
        console.error('Error updating favorites:', error);
        return null;
    }
}
