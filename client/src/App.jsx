import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/home';
import Auth from './Pages/Auth';
import Save from './Pages/Save';
import Create from './pages/create';
import Navbar from './components/navbar';

function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<Create/>} />
          <Route path="/save" element={<Save />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
