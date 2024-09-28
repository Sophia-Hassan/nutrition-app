import React from 'react'
import { useState, useContext } from 'react';  
import Home from './components/home/Home';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { SessionContext } from './context/SessionContext'; 
import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import LogOut from './components/auth/logout/LogOut'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Inputs from './components/inputs/Inputs';
// We use this layout function to make sure the header and footer are present on all pages
function Layout() {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const { sessionUser } = useContext(SessionContext);  // session context to manage the pa

  const RequireAuth = ({ children }) => {
    return sessionUser ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/inputs" element={<RequireAuth><Inputs /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<RequireAuth><LogOut /></RequireAuth>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
