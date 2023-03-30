import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Welcome from './Components/Welcome/Welcome';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Details from './Components/Details/Details';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
