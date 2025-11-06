export default function Section4Recipe({ instructions }: { instructions: string[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">
        Instructions
      </h2>

      <div className="space-y-5">
        {instructions.map((step, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full">
              {index + 1}
            </div>
            <p className="text-gray-700 leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
