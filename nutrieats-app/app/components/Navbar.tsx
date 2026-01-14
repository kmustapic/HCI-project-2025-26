'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const isLoggedIn = !!user;

    const handleLogoutClick = () => {
        setIsMenuOpen(false); // Close mobile menu if open
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        setShowLogoutConfirm(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    const linkClass = (path: string) => `
    text-base transition-colors relative
    ${isActive(path)
            ? 'text-[#1a4d3e] font-bold md:border-b-2 md:border-[#1a4d3e] md:pb-0.5'
            : 'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'}
  `;

    const mobileLinkClass = (path: string) => `
    text-xl font-bold py-4 px-10 transition-all w-full block
    ${isActive(path)
            ? 'bg-[#1a4d3e] !text-white'
            : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}
  `;

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-md z-[54] transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeMenu}
            />

            <nav className={`sticky top-0 z-[60] w-full flex items-center justify-between px-4 py-4 md:px-8 lg:px-16 transition-all duration-500 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm ${isMenuOpen ? 'md:shadow-none' : ''
                }`}>
                <Link href="/" className="text-2xl font-bold text-black dark:text-white tracking-tight z-[70]">
                    NutriEats
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/browse-recipes/categories" className={linkClass('/browse-recipes')}>
                        Categories
                    </Link>
                    {isLoggedIn && (
                        <>
                            <Link href="/favorites" className={linkClass('/favorites')}>
                                Favorites
                            </Link>
                            <Link href="/meal-planner" className={linkClass('/meal-planner')}>
                                Meal Planner
                            </Link>
                        </>
                    )}

                    <Link href="/blog" className={linkClass('/blog')}>
                        Blog
                    </Link>

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogoutClick}
                            className="flex items-center gap-2 px-5 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-xl font-semibold transition-all group"
                        >
                            <span>Sign Out</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="px-6 py-2 border border-gray-200 rounded-full text-gray-900 dark:text-gray-200 font-medium hover:border-gray-400 dark:border-gray-700 transition-colors"
                        >
                            Log in
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden z-[70] p-2 text-gray-600 dark:text-gray-300"
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-5 relative flex flex-col justify-between">
                        <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>

                {/* Mobile Menu Drawer */}
                <div className={`fixed inset-y-0 right-0 w-[85%] bg-white dark:bg-gray-900 z-[55] flex flex-col shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 ease-in-out md:hidden overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    {/* Drawer Content */}
                    <div className="flex flex-col pt-24 pb-12">
                        <Link href="/browse-recipes/categories" className={mobileLinkClass('/browse-recipes')} onClick={closeMenu}>
                            Categories
                        </Link>
                        {isLoggedIn && (
                            <>
                                <Link href="/favorites" className={mobileLinkClass('/favorites')} onClick={closeMenu}>
                                    Favorites
                                </Link>
                                <Link href="/meal-planner" className={mobileLinkClass('/meal-planner')} onClick={closeMenu}>
                                    Meal Planner
                                </Link>
                            </>
                        )}
                        <Link href="/blog" className={mobileLinkClass('/blog')} onClick={closeMenu}>
                            Blog
                        </Link>

                        {/* Sign Out / Log In Section */}
                        <div className="mt-12 px-10 flex justify-center">
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogoutClick}
                                    className="flex items-center gap-3 px-8 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl font-bold text-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all active:scale-95 border border-red-100 dark:border-red-900/50"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="w-full py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-3xl font-bold text-xl text-center"
                                    onClick={closeMenu}
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-2xl max-w-sm w-full transform transition-all scale-100 animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Sign Out?</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center leading-relaxed">
                            Are you sure you want to sign out of your account on NutriEats?
                        </p>
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={confirmLogout}
                                className="w-fit px-12 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all font-bold shadow-lg shadow-red-500/25 active:scale-[0.98]"
                            >
                                Sign Out
                            </button>
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="w-full py-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors font-semibold"
                            >
                                Stay logged in
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
