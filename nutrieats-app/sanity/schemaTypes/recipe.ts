import { defineField, defineType } from 'sanity'

export const recipe = defineType({
    name: 'recipe',
    title: 'Recipe',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'calories',
            title: 'Calories',
            type: 'number',
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Breakfast', value: 'breakfast' },
                    { title: 'Lunch', value: 'lunch' },
                    { title: 'Dinner', value: 'dinner' },
                    { title: 'Snack', value: 'snack' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'ingredients',
            title: 'Ingredients',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'instructions',
            title: 'Instructions',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'dietary',
            title: 'Dietary Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
