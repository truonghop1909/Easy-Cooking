import { FaArrowRight } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export const Section1Home = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Wrapper grid */}
      <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white">
        {/* LEFT IMAGE */}
        <div className="flex items-center justify-center bg-white">
          <img
            src="/banner01.jpg"
            alt="Mighty Super Cheesecake"
            className="w-full"
          />
        </div>

        {/* RIGHT TEXT */}
        <div className="flex flex-col justify-center bg-[#EAF3FF] px-10 py-8">
          <div className="flex items-center gap-2 text-[16px] font-medium text-gray-600 mb-3">
            <FaArrowTrendUp className="text-gray-800" />
            85% would make this again
          </div>

          <h1 className="text-[32px] sm:text-[36px] font-extrabold text-gray-900 leading-tight mb-4">
            Mighty Super Cheesecake
          </h1>

          <p className="text-gray-700 text-[16px] mb-6 leading-relaxed">
            Look no further for a creamy and ultra smooth classic cheesecake
            recipe! No one can deny its simple decadence. Mighty Super Cheesecake
          </p>

          <button className="self-start flex items-center gap-2 text-[15px] font-medium text-gray-900 hover:gap-3 transition-all">
            <span>Read more</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};
