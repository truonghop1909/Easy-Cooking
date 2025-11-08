import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Category } from "@/app/types/category";
import { Recipe } from "@/app/types/recipe";

/* ---------- Metadata động ---------- */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;                // ✅ phải await Promise

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/categories/${slug}`, { cache: "no-store" });

  if (!res.ok) return { title: "Không tìm thấy danh mục" };

  const category: Category = await res.json();
  return {
    title: `Danh mục: ${category.name}`,
    description: `Các công thức thuộc danh mục ${category.name}`,
  };
}

/* ---------- Trang chi tiết ---------- */
export default async function CategoryDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;                // ✅ phải await Promise
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // --- Lấy chi tiết danh mục ---
  const catRes = await fetch(`${baseUrl}/api/categories/${slug}`, {
    cache: "no-store",
  });
  if (!catRes.ok) notFound();

  const category: Category = await catRes.json();

  // --- Lấy toàn bộ recipes ---
  const recRes = await fetch(`${baseUrl}/api/recipes`, { cache: "no-store" });
  const recipes: Recipe[] = await recRes.json();

  // --- Lọc theo category_id ---
  const filteredRecipes = recipes.filter((r) =>
    r.category_ids.includes(category.category_id)
  );

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <Image
          src={category.image_url}
          alt={category.name}
          width={600}
          height={400}
          className="mx-auto rounded-xl shadow-md object-cover"
          priority
        />
        <h1 className="text-[32px] font-bold mt-6">{category.name}</h1>
      </div>

      <h2 className="text-[24px] font-semibold mb-6 border-b border-gray-200 pb-2">
        Công thức trong danh mục này
      </h2>

      {filteredRecipes.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          Chưa có công thức nào trong danh mục này.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link
              key={recipe.recipe_id}
              href={`/recipes/${recipe.recipe_id}`}
              className="block text-center hover:scale-105 transition-transform duration-300 group"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={recipe.image_url}
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
