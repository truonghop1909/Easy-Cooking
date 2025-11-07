import { db } from "@/app/api/_mockdb";
import RecipeDetailBody from "@/app/components/recipe/RecipeDetailBody";
import Section1Recipe from "@/app/components/recipe/Section1-Recipe";
import Section2Recipe from "@/app/components/recipe/Section2-Recipe";
import Section8Recipe from "@/app/components/recipe/Section8-Recipe";
import Section9RecipeComments from "@/app/components/recipe/Section9-Recipe";
import Section6Home from "@/app/components/sectionHome/Section6-Home";
import { commentsData } from "@/app/data/commentsData";

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ giải Promise ra trước
  // ✅ Lấy id từ URL và ép sang số
  const recipeId = Number(id);

  // ✅ Lấy đúng công thức từ db.recipes
  const recipe = db.recipes.find((r) => r.recipe_id === recipeId);

  if (!recipe) {
    return (
      <div className="text-center text-red-500 py-20">
        Không tìm thấy công thức này!
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Section 1 - Header */}
      <Section1Recipe recipeId={recipe.recipe_id}/>

      {/* Section 2 - Hình + mô tả */}
      <Section2Recipe recipeId={recipe.recipe_id} />

      {/* Section 3–6 - Thân chi tiết */}
      <RecipeDetailBody recipe={recipe} />

      {/* Section 8 - Banner / CTA */}
      <Section8Recipe />

      {/* Section 9 - Bình luận */}
      <Section9RecipeComments contentId={recipe.recipe_id} />
      
      {/* Gợi ý thêm công thức khác */}
      <Section6Home title="You might also like" />
    </section>
  );
}
