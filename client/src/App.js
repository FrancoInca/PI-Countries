import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Welcome from './Components/Welcome/Welcome';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Details from './Components/Details/Details';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home/:page" element={<Home />} />
        <Route path="/details/:cc" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
