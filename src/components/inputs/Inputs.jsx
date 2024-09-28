import { useEffect, useState, useContext } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where} from "firebase/firestore";
import inputsSvg from "../../assets/inputs.svg";
import Modal from "./Modal";
import Loader from "../loader/Loader";
import { SessionContext } from "../../context/SessionContext";

function Inputs() {
  const { sessionUser } = useContext(SessionContext);
  const [savedResults, setSavedResults] = useState([]); //stores an array of the fetched data and updates it
  const [open, setOpen] = useState(false); //to open the modal
  const [selectedDayData, setSelectedDayData] = useState(null); //object to store the data of the day
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //this is user to fetch data from firestore using getdocs
      
      try {
        const q = query(
        collection(db, "nutritionAnalysis"),
        where("userId", "==", sessionUser.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      
        const grouped = data.reduce((acc, result) => {
          //we group the data by date, this helps in sorting them in modals based on day
          const date = new Date(result.date.seconds * 1000).toDateString();
          if (!acc[date]) {
            acc[date] = { date, totalCalories: 0, results: [] };
          }
          acc[date].totalCalories += result.totalCalories; //we calculate total calories of the day
          acc[date].results.push(result);
          return acc;
        }, {});

        const sortedResults = Object.values(grouped).sort(
          //sorting the results so that the newest save is first
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setSavedResults(sortedResults); //we update savedresults to the new sorted results
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); //we call the funtion we created previously
  }, []);
  

  return (
    <main className="flex flex-col items-center w-full bg-green-50">
      {" "}
      {/*the picture is added to provide a consistent layout comparing to login/logout*/}
      <img src={inputsSvg} className="m-4" />
      <h1 className="text-3xl font-bold my-8 text-yellow-500">
        All Saved Analyses
      </h1>
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-4 w-3/4  text-green-800">
        {" "}
        {/*grid to diplay the results in cards like structure*/}
        {loading ? (
          <Loader />
        ) : savedResults.length === 0 ? (
          <h2 className="text-xl text-yellow-500">
            nothing to see here but us chickens.
          </h2>
        ) : (
          savedResults.map(
            (
              group //here we map the saved data based on the date of submittion
            ) => (
              <div
                key={group.date}
                className="bg-white p-4 rounded shadow mb-4"
              >
                <h2 className="text-xl text-green-700">{group.date}</h2>
                <p className=" text-bold text-green-600">
                  Daily Calories: {group.totalCalories}
                </p>
                {/*this button will open the modal and onclick the selectedDayData is set to the clicked day's data*/}
                <button
                  className="text-green-50 bg-green-600 rounded-xl mt-2 p-2 hover:bg-yellow-500 hover:text-yellow-50 hover:shadow-lg"
                  onClick={() => {
                    setSelectedDayData(group);
                    setOpen(true);
                  }}
                >
                  Check Daily Nutrition
                </button>
              </div>
            )
          )
        )}
      </div>
      {/*if modal is open the rnutrtional analyis will be shown in a card like structure*/}
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          {selectedDayData && (
            <div className="text-green-700">
              <h2 className="text-2xl font-bold mb-4">
                {selectedDayData.date}
              </h2>
              <p className="text-md md:text-lg">
                Total Calories: {selectedDayData.totalCalories}
              </p>
              {selectedDayData.results.map((result) => (
                <div key={result.id} className="mt-4">
                  <h3 className="text-lg font-bold">{result.title}</h3>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
                    {Object.entries(result.nutrients).map(([key, nutrient]) => (
                      <div
                        key={key}
                        className="border p-4 rounded bg-green-100 hover:shadow-xl "
                      >
                        <h4 className="font-semibold ">{nutrient.label}</h4>
                        <p>Quantity: {nutrient.quantity.toFixed(2)}</p>
                        <p>Unit: {nutrient.unit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </main>
  );
}

export default Inputs;
