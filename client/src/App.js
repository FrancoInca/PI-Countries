import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Welcome from './Components/Welcome/Welcome';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Details from './Components/Details/Details';
import NotFound from './Components/NotFound/NotFound';
import Footbar from './Components/Footbar/Footbar';
import FormActivities from './Components/FormActivities/FormActivities';
import './app.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home/:page" element={<Home />} />
        <Route path="/details/:cc" element={<Details />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/publish" element={<FormActivities />} />
      </Routes>
      <Footbar />
    </div>
  );
}

export default App;
