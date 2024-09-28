//import usestate
import { useState } from "react";

function RecipeForm({ onSubmit }) {
  const [recipe, setRecipe] = useState("");

  const handleSubmit = async () => {
    if (!recipe.trim()) {
      //this check if the value entered is empty
      onSubmit("enter your recipe.");
      return;
    }
    onSubmit(recipe);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <textarea
        className="w-11/12 h-40 p-4 mb-4 text-lg text-green-900 shadow-2xl rounded-md bg-green-50"
        placeholder="1 cup rice..."
        //this is written so that recipe that we defined earlier, takes the string that the user wrote
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
      />
      <button
        className="w-80 p-2 text-xl font-semibold bg-green-600 text-white rounded-xl m-4"
        onClick={handleSubmit} //handle submit that I defined above is called when licking the button
      >
        Submit Recipe
      </button>
    </div>
  );
}

export default RecipeForm;
