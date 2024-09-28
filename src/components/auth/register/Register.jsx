import { useContext } from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../../context/SessionContext";
import signupSvg from "../../../assets/signup.svg";
//the above includes all necessary import statements
//this page is very similar to login, the main difference is from firebase auth

const Register = () => {
  //basic useStates for error, email and password
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(SessionContext);

  //basic handle function
  //we prevent defaulf value meaing empty input boxes
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      //try to sign in the user with the provided email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      //update session state for the object user has the action SIGNEDIN
      dispatch({ type: "SIGNEDIN", payload: user });
      //navigate to home ofter login
      navigate("/");
    } catch (error) {
      //provides an error if an error occurs
      setError(error.message);
    }
  };
  //similar apperance to login, minor differences in styling
  return (
    <div className="flex flex-col-reverse gap-16 p-4  min-h-screen w-full font-[sans-serif] md:flex-row justify-center items-center bg-green-50">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-center md:text-left text-xl text-green-950">
          Create you account here!
        </h1>
        <span className="text-md text-left text-yellow-600">
          if you have an account{" "}
          <a href="/login" className="text-green-600">
            Login here!
          </a>
        </span>
        <img src={signupSvg} className="w-2/4 h-max object-cover m-4" />
      </div>
      <form
        onSubmit={handleSignup}
        className="flex flex-col bg-yellow-500 border-yellow-800 rounded-lg justify-around space-8 gap-3 mr-12 p-4 w-2/4 shadow-xl"
      >
        <span className="font-bold self-center text-white">Sign up</span>
        <input
          className="text-yellow-800 bg-white"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="text-yellow-800 bg-white"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="text-white font-semibold">
          Register
        </button>
        {error && <span className="text-red-700">{error}</span>}
      </form>
    </div>
  );
};

export default Register;
