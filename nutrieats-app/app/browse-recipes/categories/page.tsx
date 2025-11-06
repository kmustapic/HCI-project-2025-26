import Link from 'next/link'
export default function Page() {
  return (
    <section className="card">
      <h1>Categories</h1>
      <ul>
        <li><Link href="/browse-recipes/categories/meal-type">Meal Type</Link></li>
        <li><Link href="/browse-recipes/categories/prep-time">Prep Time</Link></li>
        <li><Link href="/browse-recipes/categories/nutrition">Nutrition</Link></li>
      </ul>
    </section>
  );
}
