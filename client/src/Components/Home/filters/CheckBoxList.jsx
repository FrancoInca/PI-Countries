import React from 'react';
import Styles from '../Home.module.css';

const CheckBoxList = ({continents, functionHandle, filters, name}) => {
  return (
    <div className={Styles.checkbox_container}>
      <h3>{name}</h3>
      <div className={Styles.list}>
        {continents.map((e) => (
          <div key={e}>
            <label htmlFor={e}>{e}</label>
            <input type="checkbox" id={e} value={e} onChange={(e) => functionHandle(e)} checked={filters.includes(e)} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default CheckBoxList;
