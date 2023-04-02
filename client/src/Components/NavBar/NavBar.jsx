import React from 'react';
import {Link} from 'react-router-dom';
import Styles from './NavBar.module.css';
import {useLocation} from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  let diplayed;
  if (location.pathname !== '/') diplayed = 'none';
  else diplayed = 'flex';
  return (
    <div className={Styles.navBar}>
      <div className={Styles.logo}>
        <Link to="/">
          <h1>WikiTravel</h1>
        </Link>
      </div>
      <div className={Styles.startButtom} style={{display: diplayed}}>
        <Link to="/home/1">
          <h1>Start</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
