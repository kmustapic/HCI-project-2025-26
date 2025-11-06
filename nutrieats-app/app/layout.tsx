import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'NutriEats',
  description: 'Healthy recipes, simply organized.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/browse-recipes">Browse Recipes</Link>
          <Link href="/browse-recipes/search-filter">Search &amp; Filter</Link>
          <Link href="/browse-recipes/categories">Categories</Link>
          <Link href="/favorites">Favorites</Link>
          <Link href="/meal-planner">Meal Planner</Link>
          <Link href="/profile-settings">Profile/Settings</Link>
          <span style={{ marginLeft: 'auto' }}>
            <Link href="/login" className="badge">Log in</Link>
          </span>
        </nav>
        <main>{children}</main>
        <footer>NutriEats • Assignment 3 scaffold</footer>
      </body>
    </html>
  )
}
