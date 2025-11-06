import Link from "next/link";
import { CategoryItem } from "../components/item/CategoryItem";
import { categoriesData } from "../data/categoriesData";


export default function CategoriesPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-[28px] font-bold mb-8 border-b border-gray-200 pb-4">
        Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
        {categoriesData.map((cat) => (
          <Link key={cat.id} href={`/categories/${cat.id}`}>
            <CategoryItem name={cat.name} image={cat.image} />
          </Link>
        ))}
      </div>
    </section>
  );
}
