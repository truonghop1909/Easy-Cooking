import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface RecipeItemProps {
  name: string;
  image: string;
  rating: number;
}

export const RecipeItem = ({ name, image, rating }: RecipeItemProps) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* IMAGE */}
      <Image
        src={image}
        alt={name}
        width={400}
        height={260}
        className="w-full h-[260px] object-cover"
      />

      {/* CONTENT */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex gap-1 text-[#ff4d00] mb-2">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-bold text-gray-800">
          {name}
        </h3>
      </div>
    </div>
  );
};
