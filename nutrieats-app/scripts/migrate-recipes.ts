import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing configuration. Please set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const recipesFile = path.join(process.cwd(), 'data', 'recipes.json')
const recipes = JSON.parse(fs.readFileSync(recipesFile, 'utf-8'))

async function migrate() {
  console.log(`Migrating ${recipes.length} recipes...`)

  for (const recipe of recipes) {
    const doc = {
      _type: 'recipe',
      name: recipe.name,
      calories: recipe.calories,
      type: recipe.type,
      // Mapping existing ID if we want to preserve it or use it as checking mechanism
      // _id: `recipe-${recipe.id}`, 
    }

    try {
      const res = await client.create(doc)
      console.log(`Created recipe: ${res.name} (_id: ${res._id})`)
    } catch (err) {
      console.error(`Failed to create recipe ${recipe.name}:`, err)
    }
  }

  console.log('Migration complete!')
}

migrate()
