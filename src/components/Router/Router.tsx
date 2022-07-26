import React, { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import Wordle from "../../Wordle";
import Login from "../Login";
import Signup from "../Signup";
import Interview from "../../interviews/Interview";

function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Wordle />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/interview" element={<Interview />} />
    </Routes>
  );
}

export default Router;
