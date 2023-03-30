import React from 'react';
import {Link} from 'react-router-dom';
import Styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={Styles.navBar}>
      <div className={Styles.logo}>
        <Link to="/">
          <h1>WikiTravel</h1>
        </Link>
      </div>
      <div className={Styles.startButtom}>
        <Link to="/home">
          <h1>Start</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
