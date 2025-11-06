"use client";
import { useState } from "react";

export default function Section3Recipe({ ingredients, prepTime, cookTime, serves }: any) {
  const [checked, setChecked] = useState<string[]>([]);

  const toggleCheck = (item: string) => {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <section className="space-y-8">
      {/* Info row */}
      <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 pb-4 text-[13px] text-gray-700">
        <div>
          <p className="font-semibold uppercase tracking-wide">Prep Time</p>
          <p>{prepTime}</p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide">Cook Time</p>
          <p>{cookTime}</p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wide">Servings</p>
          <p>{serves}</p>
        </div>
        <button
          onClick={() => window.print()}
          className="ml-auto text-gray-500 hover:text-orange-500 transition text-sm flex items-center gap-1"
        >
          🖨️ Print
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Ingredients</h2>

      {ingredients.map((group: any, idx: number) => (
        <div key={idx}>
          <h3 className="font-semibold mb-3 text-gray-800">{group.section}</h3>
          <ul className="space-y-3">
            {group.items.map((item: string, i: number) => (
              <li
                key={i}
                onClick={() => toggleCheck(item)}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <span
                  className={`w-5 h-5 flex items-center justify-center border rounded-full ${
                    checked.includes(item)
                      ? "border-orange-500 text-orange-500"
                      : "border-gray-400"
                  }`}
                >
                  {checked.includes(item) && <span className="text-[12px]">✔</span>}
                </span>
                <span
                  className={`text-[15px] ${
                    checked.includes(item)
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
