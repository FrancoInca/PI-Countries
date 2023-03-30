import React from 'react';
import Styles from './Card.module.css';

const Card = (props) => {
  return (
    <div className={Styles.card__div}>
      <div className={Styles.card__top_info}>
        <h3>{props.nombre}</h3>
      </div>
      <img src={props.bandera} alt={props.nombre} />
      <div className={Styles.card__bottom_info}>
        <p>{props.capital ? props.capital : 'Unknown'}</p>
      </div>
    </div>
  );
};
export default Card;
