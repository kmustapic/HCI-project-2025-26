import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostById } from '../../../lib/api';
import Link from 'next/link';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function CommunityPostPage({ params }: Props) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    const fallbackImage = '/images/healthy-salad-bowl.png';

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
                        className="text-blue-600 underline hover:text-blue-800 transition-colors"
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <article className="bg-[#fcfcfc] dark:bg-gray-900 min-h-screen">
            {/* Hero Header */}
            <div className="relative w-full h-[50vh] md:h-[60vh]">
                <Image
                    src={post.image_url || fallbackImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-10 z-20">
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-black/20 backdrop-blur-md text-white border border-white/10 hover:bg-black/40 transition-all font-bold text-sm group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Blog
                    </Link>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-16">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight break-words">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-3 mt-8 text-white/90 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs">
                            <span className="opacity-80">By {post.user_name}</span>
                            <span className="text-white/40 font-normal opacity-50">•</span>
                            <span className="opacity-80">
                                {new Date(post.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 py-8 md:py-16">
                <div className="max-w-4xl prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-6 break-words">
                    {post.content.split('\n').map((line: string, i: number) => (
                        <p key={i} className="mb-4">{renderContentWithLinks(line)}</p>
                    ))}
                </div>

                {/* Post Video */}
                {post.video_url && (
                    <div className="my-12 aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
                        <iframe
                            src={post.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                            className="w-full h-full"
                            allowFullScreen
                        />
                    </div>
                )}

            </div>

            <footer className="border-t border-gray-100 dark:border-gray-800 py-16 bg-gray-50/50 dark:bg-gray-800/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white font-serif italic">Share your own journey</h2>
                    <Link
                        href="/blog"
                        className="inline-block bg-[#1a4d3e] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all"
                    >
                        Write a Post
                    </Link>
                </div>
            </footer>
        </article>
    );
}
