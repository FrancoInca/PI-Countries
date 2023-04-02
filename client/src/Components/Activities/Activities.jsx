import React from 'react';
import Activity from './Activity';
import Styles from './Activities.module.css';

const Activities = ({props}) => {
  return (
    <div className={Styles.container}>
      {props.Activities.map((e) => (
        <Activity data={e} key={e.id} />
      ))}
    </div>
  );
};

export default Activities;
