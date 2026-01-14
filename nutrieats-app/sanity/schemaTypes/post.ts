import { defineField, defineType } from 'sanity'

export const post = defineType({
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            description: 'A short summary of the post for listing pages.',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                    ],
                },
                {
                    name: 'video',
                    title: 'Video URL',
                    type: 'object',
                    fields: [
                        {
                            name: 'url',
                            type: 'url',
                            title: 'YouTube or Vimeo URL',
                        },
                    ],
                },
                {
                    name: 'code',
                    title: 'Code Snippet',
                    type: 'object',
                    fields: [
                        {
                            name: 'language',
                            type: 'string',
                            title: 'Language',
                            options: {
                                list: [
                                    { title: 'JavaScript', value: 'javascript' },
                                    { title: 'TypeScript', value: 'typescript' },
                                    { title: 'HTML', value: 'html' },
                                    { title: 'CSS', value: 'css' },
                                    { title: 'Python', value: 'python' },
                                ],
                            },
                        },
                        {
                            name: 'code',
                            type: 'text',
                            title: 'Code',
                        },
                    ],
                },
            ],
        }),
    ],
})
