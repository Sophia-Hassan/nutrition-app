import { useContext } from "react";
import { SessionContext } from "../../../context/SessionContext";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const { dispatch } = useContext(SessionContext);
  const navigate = useNavigate();
  //handle function to logout the user using session context, redirects to main pge afterwards
  const handleLogout = () => {
    dispatch({ type: "SIGNEDOUT" });
    localStorage.clear();
    navigate("/");
  };

  return (
    <button
      className="text-xl text-green-50 font-bold bg-green-700 w-1/4 rounded-xl m-4 p-1 hover:shadow-xl"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogOutButton;
