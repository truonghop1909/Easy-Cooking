import { CollectionCard } from "../item/CollectionCard";


export default function Section5Home() {
  const collections = [
    {
      title: "Sushi Combos for your Next Party",
      image: "/banner01.jpg",
      recipes: 156,
    },
    {
      title: "Everything Bagel",
      image: "/banner01.jpg",
      recipes: 156,
    },
    {
      title: "Cook Like a Chef",
      image: "/banner01.jpg",
      recipes: 156,
    },
    {
      title: "Exquisite Dinner Recipe Ideas",
      image: "/banner01.jpg",
      recipes: 156,
    },
    {
      title: "The Ultimate Cookie Frenzy",
      image: "/banner01.jpg",
      recipes: 156,
    },
    {
      title: "For the Love of Donuts",
      image: "/banner01.jpg",
      recipes: 156,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-[34px] sm:text-[32px] font-bold text-gray-900 mb-10">
        Hand-Picked Collections
      </h2>

      <div className="grid sm:grid-cols-2 gap-8">
        {collections.map((item, index) => (
          <CollectionCard
            key={index}
            title={item.title}
            image={item.image}
            recipes={item.recipes}
          />
        ))}
      </div>
    </section>
  );
}
