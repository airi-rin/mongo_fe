import "../styles/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import LabelList from "./LabelListPage.js";
import Predict from "./PredictPage";

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Disease</Link>
            </li>
            <li>
              <Link to="/predict">Predict</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<LabelList />} />
          <Route path="/predict" element={<Predict />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
