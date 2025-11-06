import { FaPlay } from "react-icons/fa";

export default function Section2Recipe({
  image,
  description,
  video,
}: {
  image: string;
  description: string;
  video?: string;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Mô tả ở trên */}
      <p className="text-gray-700 text-[15px] max-w-3xl text-center mb-6 leading-relaxed">
        {description}
      </p>

      {/* Hình ảnh hoặc video */}
      <div className="relative w-full max-w-5xl rounded-xl overflow-hidden">
        <img
          src={image}
          alt="recipe"
          className="w-full h-auto object-cover rounded-xl shadow-md"
        />

        {/* Nút Play (hiện nếu có video) */}
        {video && (
          <button
            className="absolute inset-0 flex items-center justify-center group"
            onClick={() => console.log("Play video:", video)}
          >
            <div className="bg-white/80 rounded-full p-5 group-hover:scale-110 transition">
              <FaPlay className="text-gray-900 text-2xl" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
