export default function Section5Recipe({ nutritionFacts }: any) {
  return (
    <div className="bg-gray-50 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-3">Nutrition Facts</h2>
      <table className="w-full text-sm text-gray-700">
        <tbody>
          {nutritionFacts.map((fact: any, i: number) => (
            <tr key={i} className="border-t border-gray-200">
              <td className="py-1">{fact.name}</td>
              <td className="py-1 text-right font-semibold">{fact.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
