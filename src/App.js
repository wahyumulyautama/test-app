import './App.css';
import Home from './pages/home'
import Coin from './pages/coin'
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from "react-router-dom";

function App() {
  let { id } = useParams();
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/coin/:id' element={<Coin />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
