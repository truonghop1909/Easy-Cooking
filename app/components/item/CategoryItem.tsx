import Image from "next/image";

interface CategoryItemProps {
  name: string;
  image: string;
}

export const CategoryItem = ({ name, image }: CategoryItemProps) => {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-3 text-[16px] font-semibold text-gray-800">{name}</p>
    </div>
  );
};
