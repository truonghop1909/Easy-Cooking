"use client";

export default function Section7Recipe() {
  return (
    <div className="bg-[#FFD8C2] rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-2">Deliciousness to your inbox</h2>
      <p className="text-gray-600 text-sm mb-4">
        Enjoy weekly hand picked recipes and recommendations
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-500"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
        >
          JOIN
        </button>
      </form>

      <p className="text-[12px] text-gray-500 mt-3">
        By joining our newsletter you agree to our{" "}
        <a href="#" className="underline hover:text-orange-500">
          Terms and Conditions
        </a>
      </p>
    </div>
  );
}
