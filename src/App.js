import React, { createContext, useState } from "react";
import NavBar from "./components/NavBar";
import Upload from "./components/Upload";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import FilteredItems from "./pages/FilteredItems";

export const Context = createContext();

function App() {
  const [CState, setCState] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const CurrentRoute = () => {
    const location = useLocation();
    // Check if the current route is the home page
    const isHome = location.pathname === "/";
    return <NavBar state={CState} home={isHome} />;
  };

  return (
    <Context.Provider value={[CState, setCState]}>
      <Router>
        <CurrentRoute /> {/* Render the NavBar with the dynamic 'home' prop */}
        <Routes>
          <Route path="/" exact Component={Home}></Route>
          <Route path="/upload" exact Component={Upload}></Route>
          <Route path="/profile" exact Component={Profile}></Route>
          <Route path="/login" exact Component={Login}></Route>
          <Route path="/register" exact Component={SignUp}></Route>
          <Route path="/search/:topic" exact Component={FilteredItems}></Route>
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
