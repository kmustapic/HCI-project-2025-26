import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '../../lib/api';
import PortableText from '../../components/PortableText';
import Link from 'next/link';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="bg-white dark:bg-gray-900 min-h-screen">
            {/* Hero Header */}
            <div className="relative w-full h-[50vh] md:h-[60vh]">
                {post.mainImageUrl ? (
                    <Image
                        src={post.mainImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-16">
                    <div className="container mx-auto">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 font-medium transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Back to Blog
                        </Link>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight break-words">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 mt-8 text-white/90">
                            <div className="flex items-center gap-2">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                    Article
                                </span>
                            </div>
                            <span className="font-medium">
                                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'Recently Published'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-16 py-8 md:py-16">
                <div className="max-w-4xl mx-auto overflow-x-hidden">
                    {post.body ? (
                        <PortableText value={post.body} />
                    ) : (
                        <p className="text-gray-500 italic">This post has no content.</p>
                    )}
                </div>
            </div>

            <footer className="border-t border-gray-100 dark:border-gray-800 py-16 bg-gray-50 dark:bg-gray-800/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-6">Enjoyed this article?</h2>
                    <Link
                        href="/products"
                        className="inline-block bg-[#1a4d3e] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all"
                    >
                        Browse Our Recipes
                    </Link>
                </div>
            </footer>
        </article>
    );
}
