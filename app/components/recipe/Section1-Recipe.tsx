"use client";
import { FaShareAlt, FaBookmark, FaStar } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import Image from "next/image";

interface Author {
  name: string;
  avatar: string;
  date: string;
}

interface Stats {
  rating: number;
  comments: number;
  trend: number;
}

interface RecipeHeaderProps {
  title: string;
  author: Author;
  stats: Stats;
}

export default function Section1Recipe({ title, author, stats }: RecipeHeaderProps) {
  return (
    <header className="border-b pb-5 mb-10">
      {/* Trend + Action */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-2">
          <FaArrowTrendUp className="text-gray-800" />
          <span>{stats.trend}% would make this again</span>
        </div>
        <div className="flex items-center gap-5 text-lg text-gray-700">
          <FaShareAlt className="cursor-pointer hover:text-black transition" />
          <FaBookmark className="cursor-pointer hover:text-black transition" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-[42px] font-extrabold text-gray-900 mb-5 leading-tight">
        {title}
      </h1>

      {/* Author Info */}
      <div className="flex items-center gap-3 text-sm text-gray-700">
        <Image
          src={author.avatar}
          alt={author.name}
          width={34}
          height={34}
          className="rounded-full object-cover border border-gray-200"
        />
        <span className="font-medium">{author.name}</span>
        <span className="text-gray-500">• {author.date}</span>
        <span className="text-gray-500">• {stats.comments} comments</span>

        {/* Rating */}
        <div className="flex text-orange-500 ml-2">
          {Array(stats.rating)
            .fill(0)
            .map((_, i) => (
              <FaStar key={i} />
            ))}
        </div>
      </div>
    </header>
  );
}
