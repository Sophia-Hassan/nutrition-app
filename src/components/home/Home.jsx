// Home page, the main interface
//needed import statements
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { SessionContext } from "../../context/SessionContext";
import RecipeForm from "./RecipeForm";
import AnalysisResult from "./AnalysisResult";
import SaveButton from "./SaveButton";

function Home() {
  //the keys from env file and usestates and usecontexthook
  const AppId = import.meta.env.VITE_APP_ID;
  const AppKey = import.meta.env.VITE_APP_KEY;
  //result is the result of the submittion and error is for messages
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  //recipeNum here is simply to make the inputs page more logical, it doesn't provide anything in the actual home page
  const [recipeNum, setRecipeNum] = useState(0);
  //we ustilize usecontext, to display the correct thing based the action of the user, is the user logged in or not
  const { sessionUser } = useContext(SessionContext);

  useEffect(() => {
    if (sessionUser) {
      //if user is logged-in, we fetch the recipe number from firestore
      const fetchRecipeNumber = async () => {
        const querySnapshot = await getDocs(
          collection(db, "nutritionAnalysis")
        );
        setRecipeNum(querySnapshot.size);
      };
      fetchRecipeNumber();
    }
  }, [sessionUser]);

  const handleSubmit = async (recipe) => {
    setLoading(true); //loader is set to true while the fetching happens, better UX this way
    const apiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${AppId}&app_key=${AppKey}`;
    const recipeData = {
      title: `Recipe ${recipeNum + 1}`,
      ingr: recipe.split("\n"), //spliting the items by line
    };

    try {
      const response = await axios.post(apiUrl, recipeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResult(response.data);
    } catch (error) {
      if (error.response) {
        //server responds with status code
        console.error("Error from server:", error.response.data);
        setError(`Server Error: ${error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response
        console.error("Error in making request:", error.request);
        setError("Network Error, check your internet connection.");
      } else {
        //general error
        console.error("Error!:", error.message);
        setError("Unknown Error: Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  //the following code will include styling for the interface and rendering other compnonets with props passed into them
  return (
    <main className="flex flex-col items-center justify-center max-w-full h-[100vh] bg-green-200 font-[sans-serif]">
      <span className="text-2xl md:text-6xl font-semibold mb-8 text-green-800">
        Just copy your recipe here!
      </span>
      {/*passing needed props*/}
      <RecipeForm onSubmit={handleSubmit} />
      <AnalysisResult result={result} error={error} loading={loading} />
      <SaveButton
        result={result}
        recipeNum={recipeNum}
        setRecipeNum={setRecipeNum}
      />
    </main>
  );
}

export default Home;
