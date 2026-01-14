import Link from 'next/link';

// Helper component for the Category Card
const CategoryCard = ({
  title,
  icon,
  items
}: {
  title: string;
  icon: React.ReactNode;
  items: { label: string; href: string }[]
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-700 flex flex-col h-full">
    {/* Header */}
    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
      <div className="text-gray-600 dark:text-gray-400">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
    </div>

    {/* Button List */}
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="w-full max-w-[150px] mx-auto px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-[#1a4d3e] hover:text-white hover:border-[#1a4d3e] dark:hover:bg-[#1a4d3e] dark:hover:text-white transition-all text-sm font-medium shadow-sm text-center"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

export default async function CategoriesPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { source } = await searchParams;
  const isFromHome = source === 'home';

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-gray-900 py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-lg font-medium text-gray-500 hover:text-[#1a4d3e] transition-colors">
            ← Back to Home Page
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Categories
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg px-4">
            Browse recipes by meal type, preparation time, or nutritional focus.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Meal Type Card */}
          <CategoryCard
            title="Meal Type"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-[#1a4d3e]/60">
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
              </svg>
            }
            items={[
              { label: 'Breakfast', href: '/browse-recipes/categories/meal-type/breakfast' },
              { label: 'Lunch', href: '/browse-recipes/categories/meal-type/lunch' },
              { label: 'Dinner', href: '/browse-recipes/categories/meal-type/dinner' },
              { label: 'Snack', href: '/browse-recipes/categories/meal-type/snack' },
            ]}
          />

          {/* Prep Time Card */}
          <CategoryCard
            title="Prep Time"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-[#1a4d3e]/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            items={[
              { label: 'Under 10 minutes', href: '/browse-recipes/categories/prep-time/under-10' },
              { label: '10–30 minutes', href: '/browse-recipes/categories/prep-time/10-30' },
              { label: '30+ minutes', href: '/browse-recipes/categories/prep-time/over-30' },
            ]}
          />

          {/* Nutrition Card */}
          <CategoryCard
            title="Nutrition"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#1a4d3e]">
                <path d="M17,11V5.7C17,5.5,16.9,5.2,16.7,5C14.7,3.1,12.3,1.3,12,1c-0.3,0.3-2.7,2.1-4.7,4C7.1,5.2,7,5.5,7,5.7V11 c0,3.3,2,6.1,4.9,7.4l0.1,4.6h4l0.1-4.6C15,17.1,17,14.3,17,11z M9,6.7c1.7-1.3,3-2.4,3-2.4s1.3,1.1,3,2.4V11c0,0.8-0.2,1.6-0.5,2.3 c-1.5-0.7-2.5-2.2-2.5-3.9V8h-2v1.4c0,1.7-1,3.2-2.5,3.9c-0.3-0.7-0.5-1.5-0.5-2.3V6.7z" />
                {/* Simplified apple icon fallback or custom path */}
                <path d="M20.1 11.2c-.3-.4-.8-.5-1.2-.2l-.6.5c-1 0-1.8.8-1.8 1.8v3.2c0 .4.2.8.5 1 .3.3.7.5 1.1.5h.3c1 0 1.8-.8 1.8-1.8v-3.7c0-.5-.2-.9-.5-1.1z M5.1 11.2c-.3.2-.5.6-.5 1.1v3.7c0 1 .8 1.8 1.8 1.8h.3c.4 0 .8-.2 1.1-.5.3-.2.5-.6.5-1v-3.2c0-1-.8-1.8-1.8-1.8l-.6-.5c-.4-.3-.9-.2-1.2.2z" />
              </svg>
            }
            items={[
              { label: 'High protein', href: '/browse-recipes/categories/nutrition/high-protein' },
              { label: 'Low carb', href: '/browse-recipes/categories/nutrition/low-carb' },
              { label: 'Vegan', href: '/browse-recipes/categories/nutrition/vegan' },
            ]}
          />

        </div>
      </div>
    </div>
  );
}
