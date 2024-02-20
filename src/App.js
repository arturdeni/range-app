import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Exercise1 from "./views/exercise1";
import Exercise2 from "./views/exercise2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/exercise1" element={<Exercise1 />} />
        <Route path="/exercise2" element={<Exercise2 />} />
      </Routes>
    </Router>
  );
}

export default App;
