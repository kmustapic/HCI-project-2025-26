'use client';

import { PortableText as SanityPortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '../../sanity/lib/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const components = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset) return null;
            return (
                <figure className="my-6 md:my-10 space-y-2">
                    <div className="relative w-full aspect-video overflow-hidden rounded-xl md:rounded-2xl">
                        <Image
                            src={urlFor(value).url()}
                            alt={value.alt || 'Blog image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="text-center text-sm text-gray-500 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
        video: ({ value }: any) => {
            const { url } = value;
            if (!url) return null;

            // Simple YouTube/Vimeo embed logic
            let embedUrl = url;
            if (url.includes('youtube.com/watch?v=')) {
                embedUrl = url.replace('watch?v=', 'embed/');
            } else if (url.includes('youtu.be/')) {
                embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
            }

            return (
                <div className="my-6 md:my-10 aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            );
        },
        code: ({ value }: any) => {
            return (
                <div className="my-6 md:my-8 rounded-lg md:rounded-xl overflow-x-auto text-xs md:text-sm shadow-md">
                    <div className="bg-gray-800 text-gray-400 px-4 py-2 flex justify-between items-center">
                        <span>{value.language || 'code'}</span>
                    </div>
                    <SyntaxHighlighter
                        language={value.language || 'javascript'}
                        style={tomorrow}
                        customStyle={{ margin: 0, padding: '1.5rem' }}
                    >
                        {value.code}
                    </SyntaxHighlighter>
                </div>
            );
        },
    },
    block: {
        h1: ({ children }: any) => <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-6 md:my-8 text-gray-900 dark:text-white break-words">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold my-5 md:my-6 text-gray-900 dark:text-white break-words">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl md:text-2xl lg:text-3xl font-bold my-4 text-gray-900 dark:text-white break-words">{children}</h3>,
        normal: ({ children }: any) => <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-gray-700 dark:text-gray-300 break-words">{children}</p>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-[#1a4d3e] pl-4 md:pl-6 my-6 md:my-8 italic text-lg md:text-xl text-gray-600 dark:text-gray-400 break-words">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc ml-6 md:ml-8 mb-4 md:mb-6 space-y-2 text-base md:text-lg text-gray-700 dark:text-gray-300 break-words">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal ml-6 md:ml-8 mb-4 md:mb-6 space-y-2 text-base md:text-lg text-gray-700 dark:text-gray-300 break-words">{children}</ol>,
    },
};

export default function PortableText({ value }: { value: any }) {
    return <SanityPortableText value={value} components={components} />;
}
