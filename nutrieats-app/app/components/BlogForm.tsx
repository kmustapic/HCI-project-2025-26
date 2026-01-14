'use client';

import { useState, useEffect } from 'react';
import { createBlogPost, updateBlogPost } from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface BlogFormProps {
    onPostCreated: () => void;
    postToEdit?: any;
    onCancelEdit?: () => void;
}

export default function BlogForm({ onPostCreated, postToEdit, onCancelEdit }: BlogFormProps) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (postToEdit) {
            setTitle(postToEdit.title || '');
            setContent(postToEdit.content || '');
            setImageUrl(postToEdit.image_url || '');
            setVideoUrl(postToEdit.video_url || '');
            setIsExpanded(true);
        }
    }, [postToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsSubmitting(true);
        try {
            const postData = {
                user_id: user.id,
                user_name: user.name,
                title,
                content,
                image_url: imageUrl || null,
                video_url: videoUrl || null,
            };

            if (postToEdit) {
                await updateBlogPost(postToEdit.id, postData);
            } else {
                await createBlogPost(postData);
            }

            // Clear form
            setTitle('');
            setContent('');
            setImageUrl('');
            setVideoUrl('');
            setIsExpanded(false);

            onPostCreated();
            if (onCancelEdit) onCancelEdit();
        } catch (error) {
            console.error('Failed to save post:', error);
            alert('Failed to save post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) return null;

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-3xl md:rounded-[2.5rem] p-5 md:p-8 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] border-2 ${postToEdit ? 'border-[#1a4d3e]' : 'border-[#1a4d3e]/20 dark:border-[#1a4d3e]/40'} mb-8 md:mb-16 transform transition-all`}>
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1a4d3e] rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl uppercase shrink-0">
                        {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-white leading-tight truncate">
                            {postToEdit ? 'Edit post' : `Post as ${user.name}`}
                        </h3>
                        <p className="text-[10px] md:text-sm text-gray-500 truncate">
                            {postToEdit ? 'Make changes' : 'Share a tip or recipe'}
                        </p>
                    </div>
                </div>
                {postToEdit && (
                    <button
                        onClick={onCancelEdit}
                        className="text-gray-400 hover:text-red-500 text-xs font-semibold px-2 py-1 shrink-0"
                    >
                        Cancel
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-[#1a4d3e] text-base md:text-lg font-black tracking-tight"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    onFocus={() => setIsExpanded(true)}
                />

                {isExpanded && (
                    <>
                        <textarea
                            placeholder="Share the details..."
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-2 focus:ring-[#1a4d3e] min-h-[120px] md:min-h-[200px] resize-none text-sm md:text-base leading-relaxed"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-1">
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-2">Image URL</label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border-none text-xs md:text-sm"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-2">Video URL</label>
                                <input
                                    type="url"
                                    placeholder="YouTube link"
                                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border-none text-xs md:text-sm"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className="flex justify-between items-center pt-2">
                    {!isExpanded ? (
                        <button
                            type="button"
                            onClick={() => setIsExpanded(true)}
                            className="text-gray-400 hover:text-[#1a4d3e] transition-colors text-xs md:text-sm"
                        >
                            Add more details...
                        </button>
                    ) : !postToEdit && (
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="text-gray-400 hover:text-red-500 transition-colors text-xs md:text-sm"
                        >
                            Collapse
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !title || !content}
                        className="ml-auto bg-[#1a4d3e] text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-sm md:text-base hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : postToEdit ? 'Update' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
}
