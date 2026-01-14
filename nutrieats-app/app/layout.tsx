import './globals.css'
import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

export const metadata = {
  title: 'NutriEats',
  description: 'Healthy recipes, simply organized.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body>
        <nav className="fixed flex items-center justify-between px-4 py-4 md:px-8 lg:px-16 bg-white border-b border-gray-100">
          <Link href="/" className="text-2xl font-bold text-black tracking-tight">NutriEats</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/browse-recipes/categories" className="text-gray-600 hover:text-black">Categories</Link>
            <Link href="/favorites" className="text-gray-600 hover:text-black">Favorites</Link>
            <Link href="/meal-planner" className="text-gray-600 hover:text-black">Meal Planner</Link>
            <Link href="/login" className="px-6 py-2 border border-gray-200 rounded-full text-gray-900 font-medium hover:border-gray-400 transition-colors">Log in</Link>
          </div>
        </nav>
        <main>{children}</main>
=======
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
>>>>>>> 019dc6f... Added final project version
      </body>
    </html>
  )
}
