import React from 'react';
import Styles from '../Home.module.css';

const SortList = ({functionHandler, sortName}) => {
  return (
    <div className={Styles.checkbox_container}>
      <h3>By name</h3>
      <div className={Styles.list}>
        <div>
          <label htmlFor="a-z">A-Z</label>
          <input
            id="a-z"
            type="radio"
            name="sort"
            value="a-z"
            onChange={(e) => functionHandler(e.target.value)}
            checked={sortName === 'a-z'}
          />
        </div>
        <div>
          <label htmlFor="z-a">Z-A</label>
          <input
            id="z-a"
            type="radio"
            name="sort"
            value="z-a"
            onChange={(e) => functionHandler(e.target.value)}
            checked={sortName === 'z-a'}
          />
        </div>
      </div>
      <h3>By population</h3>
      <div className={Styles.list}>
        <div>
          <label htmlFor="morePopulation">More Population</label>
          <input
            id="morePopulation"
            type="radio"
            name="sort"
            value="morePopulation"
            onChange={(e) => functionHandler(e.target.value)}
            checked={sortName === 'morePopulation'}
          />
        </div>
        <div>
          <label htmlFor="lessPopulation">Less Population</label>
          <input
            id="lessPopulation"
            type="radio"
            name="sort"
            value="lessPopulation"
            onChange={(e) => functionHandler(e.target.value)}
            checked={sortName === 'lessPopulation'}
          />
        </div>
      </div>
    </div>
  );
};
export default SortList;
