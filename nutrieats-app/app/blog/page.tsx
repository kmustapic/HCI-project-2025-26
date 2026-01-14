'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getPosts, deleteBlogPost, getSanityPosts } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link'; import BlogForm from '../components/BlogForm';

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [sanityPosts, setSanityPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useAuth();

    const fetchPosts = async () => {
        setLoading(true);
        const [supabaseData, sanityData] = await Promise.all([
            getPosts(),
            getSanityPosts()
        ]);
        setPosts(supabaseData);
        setSanityPosts(sanityData);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDeleteClick = (postId: string) => {
        setPostToDelete(postId);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!postToDelete) return;
        try {
            await deleteBlogPost(postToDelete);
            setPosts(posts.filter(p => p.id !== postToDelete));
            setShowDeleteConfirm(false);
            setPostToDelete(null);
        } catch (error) {
            alert('Failed to delete post.');
        }
    };

    const handleEdit = (post: any) => {
        setEditingPost(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderContentWithLinks = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, i) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!text-blue-600 !underline hover:!text-blue-800 transition-colors"
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    const filteredPosts = posts.filter((post: any) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-6 md:py-16 overflow-x-hidden">
            <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-16">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-lg font-medium text-gray-500 hover:text-[#1a4d3e] transition-colors">
                        ← Back to Home Page
                    </Link>
                </div>
                <header className="mb-12 md:mb-20 text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#1a4d3e]/10 text-[#1a4d3e] text-xs font-bold uppercase tracking-widest animate-fade-in">
                        Insights & Inspiration
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-[1.2]">
                        Discover our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a4d3e] to-[#2d6a58]">latest news</span>
                    </h1>
                    <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 md:px-0 opacity-90">
                        Explore stories of transformation, nutrition breakthroughs, and community achievements that define our journey.
                    </p>

                    {/* Combined Header Feedback & Creation Row */}
                    <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-0">
                        {/* Create Post (2/3) */}
                        <div className="lg:col-span-2 order-1">
                            {user ? (
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-100/50 text-left h-full">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <span className="bg-orange-500 w-2 h-6 rounded-full"></span>
                                        Create your own post
                                    </h2>
                                    <BlogForm
                                        onPostCreated={fetchPosts}
                                        postToEdit={editingPost}
                                        onCancelEdit={() => setEditingPost(null)}
                                    />
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-100/50 text-left h-full flex flex-col justify-center relative overflow-hidden group">
                                    {/* Decorative background element */}
                                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#1a4d3e]/5 rounded-full blur-3xl group-hover:bg-[#1a4d3e]/10 transition-colors duration-700"></div>
                                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-colors duration-700"></div>

                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-orange-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                                            Community Access
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                                            Share your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a4d3e] to-[#2d6a58]">healthy journey</span>
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
                                            Join our community of food enthusiasts. Sign in to post your own nutrition tips, healthy recipes, and success stories with fellow Nutrieats members.
                                        </p>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <Link
                                                href="/login?redirectTo=/blog"
                                                className="bg-[#1a4d3e] text-white px-8 py-3.5 rounded-full font-black hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm md:text-base cursor-pointer"
                                            >
                                                Sign In to Post
                                            </Link>
                                            <Link
                                                href="/signup?redirectTo=/blog"
                                                className="text-[#1a4d3e] dark:text-[#2d6a58] font-black hover:text-[#133a2f] transition-colors text-sm md:text-base flex items-center gap-2 group/link"
                                            >
                                                Create Account
                                                <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Latest Activity (1/3) */}
                        <div className="lg:col-span-1 order-2 text-left bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-100/50 flex flex-col h-[400px]">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 tracking-tight flex items-center gap-2">
                                Latest activity
                            </h3>
                            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                {posts.map((post) => (
                                    <Link key={post.id} href={`/blog/community/${post.id}`} className="group flex gap-4 border-b border-gray-50 dark:border-gray-700 pb-5 last:border-0 last:pb-0">
                                        <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-600 font-bold text-gray-400 text-sm">
                                            {post.user_name?.charAt(0) || 'U'}
                                        </div>
                                        <div className="min-w-0 flex flex-col justify-center">
                                            <p className="text-sm font-black text-gray-900 dark:text-white mb-1 truncate tracking-tight">{post.user_name}</p>
                                            <p className="text-base text-[#1a4d3e] dark:text-[#2d6a58] line-clamp-1 font-black leading-tight transition-colors">{post.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto">
                    {/* Main Content Area */}
                    <div className="min-w-0">
                        <div className="mb-12">
                            <div className="relative w-full max-w-xl group mb-8">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-[#1a4d3e] group-focus-within:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search stories (e.g. 'vegan')..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-14 pr-12 py-4.5 bg-[#f8f9f8] dark:bg-gray-800 border-2 border-[#1a4d3e]/20 dark:border-gray-700 rounded-3xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-[#1a4d3e] focus:bg-white dark:focus:bg-gray-800 focus:ring-8 focus:ring-[#1a4d3e]/5 transition-all text-base font-bold shadow-[0_10px_40px_-10px_rgba(26,77,62,0.15)] hover:shadow-[0_15px_50px_-12px_rgba(26,77,62,0.2)] dark:shadow-none"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-[#1a4d3e] transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight shrink-0">
                                Latest stories
                            </h2>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[1, 2, 3, 4].map(n => (
                                    <div key={n} className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-3xl h-80"></div>
                                ))}
                            </div>
                        ) : filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10">
                                {filteredPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/community/${post.id}`}
                                        className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 h-[450px]"
                                    >
                                        <div className="absolute inset-0 z-0">
                                            <Image
                                                src={post.image_url || '/images/healthy-salad-bowl.png'}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                                                unoptimized
                                            />
                                            {/* Top and Bottom Overlays for text visibility */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
                                            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
                                        </div>

                                        <div className="relative z-10 mt-auto p-6 md:p-8">
                                            <div className="mb-4">
                                                <span className="text-xs font-black uppercase tracking-wider text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                                                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-green-100 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-white/70 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                                {post.content}
                                            </p>
                                            <span className="inline-flex items-center font-bold text-white text-xs uppercase tracking-widest gap-2">
                                                Discover story
                                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </div>
                                            </span>
                                        </div>

                                        {/* User Meta (Corner) */}
                                        <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/40 text-white font-black text-xs shadow-xl">
                                                {post.user_name?.charAt(0) || 'U'}
                                            </div>
                                            <span className="text-sm font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider hidden sm:block uppercase">{post.user_name}</span>
                                        </div>

                                        {/* Edit/Delete if Owner */}
                                        {user?.id === post.user_id && (
                                            <div className="absolute top-6 right-6 z-20 flex gap-3">
                                                <button
                                                    onClick={(e) => { e.preventDefault(); handleEdit(post); }}
                                                    className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-xl flex items-center justify-center text-white border border-white/40 hover:bg-white/60 transition-all shadow-2xl hover:scale-110 active:scale-95"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                                                </button>
                                                <button
                                                    onClick={(e) => { e.preventDefault(); handleDeleteClick(post.id); }}
                                                    className="w-12 h-12 rounded-2xl bg-red-600/50 backdrop-blur-xl flex items-center justify-center text-white border border-white/40 hover:bg-red-600/70 transition-all shadow-2xl hover:scale-110 active:scale-95"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                                                </button>
                                            </div>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-700">
                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-gray-700">
                                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No stories found</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                                    {searchQuery
                                        ? `We couldn't find any results for "${searchQuery}". Try another keyword.`
                                        : "The community feed is waiting for your insights! Be the first to share."}
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="mt-6 text-[#1a4d3e] font-bold hover:underline"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Custom Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl max-w-sm w-full transform transition-all scale-100 border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Post?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setPostToDelete(null);
                                }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
