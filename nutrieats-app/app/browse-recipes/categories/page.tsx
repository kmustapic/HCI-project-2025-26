import Link from "next/link";

export default function CategoriesPage() {
  return (
    <section className="card">
      <h1>Categories</h1>
      <p style={{ marginBottom: "24px", color: "#666" }}>
        Browse recipes by meal type, preparation time, or nutritional focus.
      </p>

      <div className="categories-grid">
        {/* Meal Type */}
        <div className="category-box">
          <h2>Meal Type</h2>
          <ul>
            <li>
              <Link href="/browse-recipes?meal=breakfast">Breakfast</Link>
            </li>
            <li>
              <Link href="/browse-recipes?meal=lunch">Lunch</Link>
            </li>
            <li>
              <Link href="/browse-recipes?meal=dinner">Dinner</Link>
            </li>
            <li>
              <Link href="/browse-recipes?meal=snacks">Snacks</Link>
            </li>
          </ul>
        </div>

        {/* Prep Time */}
        <div className="category-box">
          <h2>Prep Time</h2>
          <ul>
            <li>
              <Link href="/browse-recipes?time=under-10">Under 10 minutes</Link>
            </li>
            <li>
              <Link href="/browse-recipes?time=10-30">10–30 minutes</Link>
            </li>
            <li>
              <Link href="/browse-recipes?time=30-plus">30+ minutes</Link>
            </li>
          </ul>
        </div>

        {/* Nutrition */}
        <div className="category-box">
          <h2>Nutrition</h2>
          <ul>
            <li>
              <Link href="/browse-recipes?nutrition=high-protein">
                High protein
              </Link>
            </li>
            <li>
              <Link href="/browse-recipes?nutrition=low-carb">
                Low carb
              </Link>
            </li>
            <li>
              <Link href="/browse-recipes?nutrition=vegan">
                Vegan
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
