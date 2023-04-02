import React from 'react';
import Styles from './Card.module.css';
import {Link} from 'react-router-dom';

const Card = (props) => {
  return (
    <Link to={`/details/${props.id}`}>
      <div className={Styles.card__div}>
        <div className={Styles.card__top_info}>
          <h3>{props.name}</h3>
        </div>
        <img src={props.flag} alt={props.name} />
        <div className={Styles.card__bottom_info}>
          <p>{props.capital ? props.capital : 'Unknown'}</p>
        </div>
      </div>
    </Link>
  );
};
export default Card;
