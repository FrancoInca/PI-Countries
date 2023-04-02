import React from 'react';
import Styles from './Detail.module.css';

const Detail = (props) => {
  const country = props.data;
  return (
    <div className={Styles.card_detail}>
      <img src={country.flag} alt={country.name} />
      <div>
        <div className={Styles.info}>
          <h3>Your next journey is: {country.name}!</h3>
          <h4>This is all you need to know!</h4>
          <p>Capital: {country.capital ? country.capital : 'Unknown'}</p>
          <p>Area: {country.area} Km^2</p>
          <p>Country Code: {country.id}</p>
          <p>Population: {country.population}</p>
        </div>
      </div>
    </div>
  );
};
export default Detail;
