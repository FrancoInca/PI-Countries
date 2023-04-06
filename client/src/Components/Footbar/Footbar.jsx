import React from 'react';
import Styles from './Footbar.module.css';
import {Link} from 'react-router-dom';
const Footbar = () => {
  return (
    <div className={Styles.div_footbar}>
      <h1>WikiTravel</h1>
      <p>© All rights reserved</p>
      <div>
        <p>Go home</p>
        <Link to="/publish">
          <p>For publishers</p>
        </Link>
      </div>
    </div>
  );
};
export default Footbar;
