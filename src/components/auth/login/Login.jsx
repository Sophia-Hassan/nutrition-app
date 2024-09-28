import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../../context/SessionContext";
import loginSvg from "../../../assets/login.svg";
//importing everything I am going to use in the page
const Login = () => {
  //basic useStates for error, email and password
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //we will use this for navigation
  const { dispatch } = useContext(SessionContext); //context of the session, is user logged in or logged out

  //basic handle function
  //we prevent defaulf value meaing empty input boxes
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //try to sign in the user with the provided email and password
      const userCredential = await signInWithEmailAndPassword(
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
  //the following is a simple picture and a simple forum for the user to sign in
  return (
    <div className="flex flex-col-reverse gap-16 p-4  min-h-screen w-full font-[sans-serif] md:flex-row justify-center items-center bg-green-50">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-center md:text-left text-xl text-green-950">
          Already a user? Login!!
        </h1>
        <span className="text-md text-left text-green-600">
          if not, you can <br/>
          <a href="/Register" className="text-yellow-600">
             register here!
          </a>
        </span>
        <img src={loginSvg} className="w-2/4 h-max object-cover m-4" />
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col bg-green-800 border-green-500 rounded-lg justify-around space-8 gap-3 mr-12 p-4 w-2/4 shadow-xl"
      >
        <span className="font-bold text-green-50">Sign in</span>
        <input
          className="text-green-800"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="text-green-800"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="text-white font-semibold">
          Login
        </button>
        {error && <span className="text-red-700">{error}</span>}
      </form>
    </div>
  );
};

export default Login;
