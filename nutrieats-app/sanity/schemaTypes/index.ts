import { type SchemaTypeDefinition } from 'sanity'
import { recipe } from './recipe'
import { post } from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [recipe, post],
}
