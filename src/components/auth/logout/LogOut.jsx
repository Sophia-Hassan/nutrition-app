import LogOutButton from "./LogOutButton";
import logoutSvg from "../../../assets/logout.svg";
//import statement for the logout button, and the picture used inside the page
function LogOut() {
  return (
    <>
      {/* a page making sure that the user wishes to logout as well as a logout button that changes the context of the user */}
      <div className="flex flex-col bg-green-50 w-full h-[100vh] justify-center items-center font-[sans-serif] ">
        <img className="h-2/4 m-4" src={logoutSvg} />
        <h1 className="text-green-600">are you sure you want to logout?</h1>
        <LogOutButton />
      </div>
    </>
  );
}
export default LogOut;
