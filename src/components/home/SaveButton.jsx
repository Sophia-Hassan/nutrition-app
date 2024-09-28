//important import statement
//the purpose of this page, is for handling the function of saving the nutritional intake
//the saved data from here will found in inputs
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
//we notice the props here, result is the result of the submition, i.e the analysis
//recipenum , set recipenum are self explanatory by their name
function SaveButton({ result, recipeNum, setRecipeNum }) {
  const navigate = useNavigate(); //for navigation
  const { sessionUser } = useContext(SessionContext); //useconext hook, this important because only registered/logged in users can save to inputs

  const handleSave = async () => {
    if (sessionUser) {
      //if user is signed in
      try {
        //this data will be saved in firestore
        const resultData = {
          //this is the data of result, again this is the analysis
          title: `Recipe ${recipeNum + 1}`,
          nutrients: result.totalNutrients,
          totalCalories: result.calories,
          date: new Date(), //the date of this analysis, helpful in grouping data
          userId: sessionUser.uid,//needed for inputs page
        };

        await addDoc(collection(db, "nutritionAnalysis"), resultData); // we add the saved data to our databese collection "nutritionalanalysis"
        setRecipeNum(recipeNum + 1); //incement the recipenum
        navigate("/inputs");
      } catch (error) {
        //basic error catching
        console.error("Error saving. try again", error);
      }
    } else {
      navigate("/login"); //bassically if user isn't logged in, this takes the user to the login page
    }
  };

  return (
    <button
      className="w-80 p-2 text-xl font-semibold bg-green-600 text-white rounded-xl m-4"
      onClick={handleSave} //calls handlesave that I've defined earlier
      disabled={!result} //button doesn't click if no result is there
    >
      Save Analysis
    </button>
  );
}

export default SaveButton;
