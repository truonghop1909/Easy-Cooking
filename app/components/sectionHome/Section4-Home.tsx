export default function Section4Home() {
  return (
    <section className="bg-[#FFD8C2] py-20 mt-[40px]">
      <div className="max-w-3xl mx-auto text-center px-6">
        {/* Title */}
        <h2 className="text-[42px] sm:text-[48px] font-extrabold text-gray-900 leading-tight mb-4">
          Deliciousness<br />to your inbox
        </h2>

        {/* Subtitle */}
        <p className="text-gray-800 text-[28px] mb-10">
          Enjoy weekly hand picked recipes and recommendationsm
        </p>

        {/* Email input form */}
        <form className="flex justify-center mx-auto mb-10">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 text-[15px] rounded-l-md outline-none border border-gray-300 focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="bg-[#FF5C1D] text-white font-semibold px-6 rounded-r-md hover:bg-[#e34c14] transition-all"
          >
            JOIN
          </button>
        </form>

        {/* Terms */}
        <p className="text-[13px] text-gray-700">
          By joining our newsletter you agree to our{" "}
          <a href="#" className="underline hover:text-red-600">
            Terms and Conditions
          </a>
        </p>
      </div>
    </section>
  );
}
