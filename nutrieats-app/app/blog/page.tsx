'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getPosts, deleteBlogPost } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import BlogForm from '../components/BlogForm';

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);
    const { user } = useAuth();

    const fetchPosts = async () => {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
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

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-6 md:py-16 overflow-x-hidden">
            <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-16">
                <header className="mb-6 md:mb-12 text-center">
                    <h1 className="text-3xl md:text-6xl font-black text-gray-900 dark:text-white mb-2 md:mb-4 tracking-tight">
                        Community Blog
                    </h1>
                    <p className="text-sm md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 md:px-0 opacity-80">
                        Discover and share recipes, nutrition tips, and health stories.
                    </p>
                </header>

                <div className="max-w-4xl mx-auto px-0">
                    {user && (
                        <BlogForm
                            onPostCreated={fetchPosts}
                            postToEdit={editingPost}
                            onCancelEdit={() => setEditingPost(null)}
                        />
                    )}

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4d3e]"></div>
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="space-y-10 md:space-y-12">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="group bg-[#dcfce7] dark:bg-gray-800/60 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg md:shadow-[0_60px_150px_-30px_rgba(10,40,30,0.5)] border border-white/50 dark:border-gray-700/50 relative transition-all duration-500 hover:shadow-2xl"
                                >
                                    {/* Post Header */}
                                    <div className="p-4 sm:p-5 md:p-8 flex justify-between items-start gap-2">
                                        <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                                            <div className="w-9 h-9 md:w-10 md:h-10 bg-[#1a4d3e]/10 text-[#1a4d3e] rounded-full flex items-center justify-center font-bold shrink-0 text-sm md:text-base">
                                                {post.user_name?.charAt(0) || 'U'}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm md:text-base">{post.user_name}</h4>
                                                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold opacity-70">
                                                    {new Date(post.created_at).toLocaleDateString(undefined, {
                                                        month: 'short', day: 'numeric', year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>

                                        {user?.id === post.user_id && (
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="text-gray-400 hover:text-[#1a4d3e] p-1.5 md:p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700 transition-all"
                                                    title="Edit your post"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(post.id)}
                                                    className="text-gray-400 hover:text-red-500 p-1.5 md:p-2 rounded-lg hover:bg-red-50 transition-all"
                                                    title="Delete your post"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Post Image */}
                                    {post.image_url && (
                                        <div className="relative aspect-video w-full overflow-hidden">
                                            <Image
                                                src={post.image_url}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    )}

                                    <div className="p-4 sm:p-5 md:p-8 md:pt-4">
                                        <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                                            {post.title}
                                        </h2>

                                        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm md:text-base break-words">
                                            {post.content.split('\n').map((line: string, i: number) => (
                                                <p key={i} className="mb-4">{renderContentWithLinks(line)}</p>
                                            ))}
                                        </div>

                                        {/* Post Video */}
                                        {post.video_url && (
                                            <div className="my-8 aspect-video rounded-2xl overflow-hidden shadow-lg">
                                                <iframe
                                                    src={post.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                                    className="w-full h-full"
                                                    allowFullScreen
                                                />
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-400">Be the first to share something!</h3>
                            <p className="text-gray-400 mt-2">The blog is empty, contribute now.</p>
                        </div>
                    )}
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
