import { RecipeItem } from "../item/RecipeItem";


export default function Section2Home() {
  const superDelicious = [
    {
      name: "Spinach and Cheese Pasta",
      image: "/banner01.jpg",
      rating: 5,
    },
    {
      name: "Fancy Glazed Donuts",
      image: "/banner01.jpg",
      rating: 5,
    },
    {
      name: "Mighty Cheesy Breakfast Burger",
      image: "/banner01.jpg",
      rating: 5,
    },
  ];

  const sweetTooth = [
    {
      name: "Caramel Strawberry Milkshake",
      image: "/banner01.jpg",
      rating: 5,
    },
    {
      name: "Chocolate and Banana Jar Cake",
      image: "/banner01.jpg",
      rating: 5,
    },
    {
      name: "Berry Maddness Biscuits",
      image: "/banner01.jpg",
      rating: 5,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Super Delicious */}
      <h2 className="text-[28px] font-bold text-gray-900 mb-8">
        Super Delicious
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mb-12">
        {superDelicious.map((item, index) => (
          <RecipeItem key={index} {...item} />
        ))}
      </div>

      {/* Sweet Tooth */}
      <h2 className="text-[28px] font-bold text-gray-900 mb-8">
        Sweet Tooth
      </h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {sweetTooth.map((item, index) => (
          <RecipeItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
