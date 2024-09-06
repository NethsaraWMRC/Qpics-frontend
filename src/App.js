import React, { createContext, useState } from "react";
import NavBar from "./components/NavBar";
import Upload from "./components/Upload";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Create } from "@mui/icons-material";
import FilteredItems from "./components/FilteredItems";
import Home from "./pages/Home";

export const Context = createContext();

function App() {
  const [CState, setCState] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <Context.Provider value={[CState, setCState]}>
      <Router>
        <NavBar state={CState} />

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
