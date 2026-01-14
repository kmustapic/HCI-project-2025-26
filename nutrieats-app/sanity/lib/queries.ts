import { defineQuery } from 'next-sanity'

export const RECIPES_QUERY = defineQuery(`*[_type == "recipe"] | order(_id asc) {
  _id,
  name,
  description,
  calories,
  type,
  image,
  "imageUrl": image.asset->url
}`)

export const RECIPES_BY_CATEGORY_QUERY = defineQuery(`*[_type == "recipe" && type == $category] | order(_id asc) {
  _id,
  name,
  description,
  calories,
  type,
  image,
  "imageUrl": image.asset->url
}`)

export const RECIPES_SEARCH_QUERY = defineQuery(`*[_type == "recipe" && name match $search + "*"] | order(_id asc) {
  _id,
  name,
  description,
  calories,
  type,
  image,
  "imageUrl": image.asset->url
}`)

export const RECIPE_BY_ID_QUERY = defineQuery(`*[_type == "recipe" && _id == $id][0]{
  _id,
  name,
  description,
  calories,
  type,
  image,
  "imageUrl": image.asset->url,
  ingredients,
  instructions,
  dietary
}`)

export const POSTS_QUERY = defineQuery(`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "mainImageUrl": mainImage.asset->url
}`)

export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  "mainImageUrl": mainImage.asset->url,
  body
}`)
