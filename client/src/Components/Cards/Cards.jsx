import React from 'react';
import Card from './Card';

const Cards = (props) => {
  return (
    <ul>
      {props.props.map((e) => (
        <Card nombre={e.nombre} key={e.id} bandera={e.bandera} capital={e.capital} />
      ))}
    </ul>
  );
};
export default Cards;
