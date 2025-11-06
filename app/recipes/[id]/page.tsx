import RecipeDetailBody from "@/app/components/recipe/RecipeDetailBody";
import Section1Recipe from "@/app/components/recipe/Section1-Recipe";
import Section2Recipe from "@/app/components/recipe/Section2-Recipe";
import Section8Recipe from "@/app/components/recipe/Section8-Recipe";
import Section9RecipeComments from "@/app/components/recipe/Section9-Recipe";
import Section6Home from "@/app/components/sectionHome/Section6-Home";
import { commentsData } from "@/app/data/commentsData";
import { recipesData } from "@/app/data/recipesData";



export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // ✅ giải Promise ra trước

    const recipe = recipesData.find((r) => r.id === Number(id));

    if (!recipe) {
        return (
            <div className="text-center text-red-500 py-20">
                Không tìm thấy công thức này!
            </div>
        );
    }

    return (
        <section className="container mx-auto px-4 py-10">
            <Section1Recipe
                title={recipe.title}
                author={recipe.author}
                stats={recipe.stats}
            />
            <Section2Recipe
                image={recipe.image}
                video={recipe.video}
                description={recipe.description}
            />
            <RecipeDetailBody recipe={recipe}/>
            <Section8Recipe />
            <Section9RecipeComments
                recipeId={recipe.id} 
                comments={commentsData} 
            />
            <Section6Home title="You might also like"/>
        </section>
    );
}
