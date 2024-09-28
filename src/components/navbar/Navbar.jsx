//all import statments needed
import { NavLink } from "react-router-dom";
import menuSvg from "../../assets/menu.svg";
import logoSvg from "../../assets/logo.svg";
import { useState } from "react";
import { useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
function Navbar() {
  // we use this to create states for the hamburger menu, open or closed in true and false
  const [openMenu, setOpenMenu] = useState(false);
  /*we use session context in this navbar
     to change the nav item login into logout if the user is logged in */
  const { sessionUser } = useContext(SessionContext);
  //* as the name suggests, toggle to open the hamburger menu
  const toggle = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <nav
      id="navbar-box"
      className="bg-green-800 max-w-full p-1 font-[sans-serif] "
    >
      {/* I use ID to describe the jsx purpose, comments ae added if needed */}
      <div
        id="navbar-items-container"
        className="flex w-full py-2 md:py-3 px-4 md:px-10 items-center justify-between"
      >
        <NavLink to="/">
          <img
            id="logo"
            className="w-16 h-16 hover:animate-bounce "
            src={logoSvg}
          ></img>
        </NavLink>
        <ul id="large-screen-menu" className="hidden md:flex space-x-4">
          <li>
            <NavLink to="/" className="text-white hover:text-green-300">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/inputs" className="text-white hover:text-green-300">
              Inputs
            </NavLink>
          </li>
          {/*this code indicates that if the session user is true i.e the user is logged in
             the last menu/navbar item is logout, if not then the item is "login" */}
          {sessionUser ? (
            <li>
              <NavLink to="/logout" className="text-white hover:text-green-300">
                Logout
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className="text-white hover:text-green-300">
                Login
              </NavLink>
            </li>
          )}
        </ul>

        <div id="hamburger-menu" className="md:hidden">
          <button
            onClick={toggle}
            className="p-3 rounded hover:bg-green-300 block"
          >
            <img src={menuSvg} className="object-cover w-6 h-6" />
          </button>
        </div>
      </div>

      {/*mobile menu, same exact logic as before */}
      {openMenu && (
        <ul className="flex-col  md:hidden  space-y-4 mb-1 font-[sans-serif]  ">
          <li>
            <NavLink to="" className="text-white hover:text-green-300">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="" className="text-white hover:text-green-300">
              Inputs
            </NavLink>
          </li>
          {sessionUser ? (
            <li>
              <NavLink
                to="/logout"
                className="text-white  hover:text-green-300"
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/login" className="text-white  hover:text-green-300">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
