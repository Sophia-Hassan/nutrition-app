import Loader from "../loader/Loader";
//importing loader
//adding props to the function
function AnalysisResult({ result, loading, error }) {
  if (loading) {
    //applying loader
    return <Loader />;
  }
  //if the result not there, return null
  if (!result) {
    return error;
  }

  return (
    <div className="w-3/4 p-4 m-4 text-lg text-green-900 bg-white rounded-xl border-none mb-4 overflow-scroll">
      <>
        <p className="text-bold">Calories:{result.calories}</p>
        <h3 className="text-lg font-semibold mt-4">Nutrients:</h3>
        <table className="table-auto w-full">
          <thead>
            <tr className="border bg-yellow-200">
              <th className="border m-2">Qty</th>
              <th className="border m-2">Unit</th>
              <th className="border m-2">Element</th>
            </tr>
          </thead>
          <tbody>
            {/*the following we created a table with the needed data */}
            {Object.entries(result.totalNutrients).map(([key, nutrient]) => (
              <tr key={key} className="p-2 m-2 bg-yellow-50">
                <td className=" border m-2">{nutrient.quantity.toFixed(2)}</td>
                <td className="border m-2">{nutrient.unit}</td>
                <td className="border m-2">{nutrient.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}

export default AnalysisResult;
