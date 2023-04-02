import React from 'react';
import {Link} from 'react-router-dom';
import Styles from './notFound.module.css';
const NotFound = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.message}>
        <h1>Something went wrong...</h1>
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
