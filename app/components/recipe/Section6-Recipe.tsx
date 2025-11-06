export default function Section6Recipe({ freshRecipes = [] }: any) {
  if (!freshRecipes || freshRecipes.length === 0) {
    return <p className="text-gray-500 text-sm">No fresh recipes available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Fresh Recipes</h2>
      <div className="flex flex-col gap-4">
        {freshRecipes.map((r: any) => (
          <div key={r.id} className="flex items-center gap-3">
            <img
              src={r.image}
              alt={r.title}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <div className="flex text-orange-500 text-sm">
                {Array(r.rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
              </div>
              <p className="font-medium text-gray-800 leading-tight">
                {r.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
