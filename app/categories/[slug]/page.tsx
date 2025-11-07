import { categoriesData } from "@/app/data/categoriesData";
import { recipesData } from "@/app/data/recipesData";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ✅ Props nhận slug thay vì id
interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

// ✅ Metadata động theo slug
export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoriesData.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Không tìm thấy danh mục" };
  }

  return {
    title: `Danh mục: ${category.name}`,
    description: `Danh sách món ăn trong danh mục ${category.name}`,
  };
}

// ✅ Trang chi tiết danh mục
export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;

  // ✅ Tìm danh mục theo slug
  const category = categoriesData.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // ✅ Lọc công thức theo category.id
  const filteredRecipes = recipesData.filter((recipe) =>
    recipe.categoryIds.includes(category.id)
  );

  return (
    <section className="container mx-auto px-4 py-16">
      {/* === Thông tin danh mục === */}
      <div className="text-center mb-10">
        <Image
          src={category.image}
          alt={category.name}
          width={600}
          height={400}
          className="mx-auto rounded-xl shadow-md object-cover"
          priority
        />
        <h1 className="text-[32px] font-bold mt-6">{category.name}</h1>
      </div>

      {/* === Danh sách công thức === */}
      <h2 className="text-[24px] font-semibold mb-6 border-b border-gray-200 pb-2">
        Công thức trong danh mục này
      </h2>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Chưa có công thức nào trong danh mục này.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="text-center block hover:scale-105 transition-transform duration-300 group"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 font-medium text-gray-800 group-hover:text-blue-600 transition">
                {recipe.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
