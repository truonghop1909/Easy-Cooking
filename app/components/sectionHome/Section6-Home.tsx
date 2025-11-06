import RecipeCard from "../item/RecipeCard";

interface Section6HomeProps {
  title?: string; // tiêu đề động
  recipes?: { title: string; image: string }[]; // cho phép truyền mảng khác
}

export default function Section6Home({
  title = "Latest Recipes",
  recipes = [
    { title: "Caramel Strawberry Milkshake", image: "/banner01.jpg" },
    { title: "Cashew Vegan Rice", image: "/banner01.jpg" },
    { title: "Smoked Salmon Salad Sandwich", image: "/banner01.jpg" },
    { title: "Salmon in Creamy Sun Dried Tomato Sauce", image: "/banner01.jpg" },
    { title: "Healthy Jam Waffle Breakfast", image: "/banner01.jpg" },
    { title: "Chocolate and Banana Jar Cake", image: "/banner01.jpg" },
    { title: "Caramel Blueberry Scones", image: "/banner01.jpg" },
    { title: "Blueberry Carrot Cake", image: "/banner01.jpg" },
    { title: "Vegan Cauliflower Salad", image: "/banner01.jpg" },
    { title: "Roasted Red Pepper Soup", image: "/banner01.jpg" },
    { title: "Eggs and Avocado Toast", image: "/banner01.jpg" },
    { title: "Pork Shoulder Cashew Noodles", image: "/banner01.jpg" },
  ],
}: Section6HomeProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Tiêu đề */}
      <h2 className="text-[26px] font-semibold text-gray-900 mb-8">
        {title}
      </h2>

      {/* Grid món ăn */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((r, i) => (
          <RecipeCard key={i} title={r.title} image={r.image} />
        ))}
      </div>

      {/* Nút Load More */}
      <div className="flex justify-center mt-10">
        <button className="border border-gray-300 px-6 py-2 rounded-md text-gray-800 hover:bg-gray-50 transition">
          Load More
        </button>
      </div>
    </section>
  );
}
