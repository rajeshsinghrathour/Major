import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dryer from './pages/Appliances/Driver';
import Monitor from './pages/Appliances/Moniter';
import WashingMachine from './pages/Appliances/WashingMachine';

function App() {
  return (
    <Router>
           <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/dryer" element={<Dryer />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/washing_machine" element={<WashingMachine />} />
          </Routes>
    </Router>
  );
}

export default App;
