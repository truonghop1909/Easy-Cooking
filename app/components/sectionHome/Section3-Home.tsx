import { CategoryItem } from "../item/CategoryItem";


export default function Section3Home() {
  const categories = [
    { name: "Pasta", image: "/banner01.jpg", },
    { name: "Pizza", image: "/banner01.jpg", },
    { name: "Vegan", image: "/banner01.jpg", },
    { name: "Desserts", image: "/banner01.jpg" },
    { name: "Smoothies", image: "/banner01.jpg", }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 text-center">
      <h2 className="text-[28px] font-bold text-gray-900 mb-10">
        Popular Categories
      </h2>

      <div className="grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
        {categories.map((item, index) => (
          <CategoryItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
