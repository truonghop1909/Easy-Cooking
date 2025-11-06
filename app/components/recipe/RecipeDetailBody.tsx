import Section3Recipe from "./Section3-Recipe";
import Section4Recipe from "./Section4-Recipe";
import Section5Recipe from "./Section5-Recipe";
import Section6Recipe from "./Section6-Recipe";
import Section7Recipe from "./Section7-Recipe";

export default function RecipeDetailBody({ recipe }: { recipe: any }) {
  return (
    <section className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
      {/* LEFT */}
      <div className="space-y-10">
        <Section3Recipe
          ingredients={recipe.ingredients}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          serves={recipe.serves}
        />
        <Section4Recipe instructions={recipe.instructions} />
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-8 border-l border-gray-200 pl-8">
        <Section5Recipe nutritionFacts={recipe.nutritionFacts} />
        <Section6Recipe freshRecipes={recipe.freshRecipes} />
        <Section7Recipe />
      </div>
    </section>
  );
}
