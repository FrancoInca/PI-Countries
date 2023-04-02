import React from 'react';
import Card from './Card';

const Cards = (props) => {
  return (
    <ul>
      {props.props.map((e) => (
        <Card name={e.name} key={e.id} flag={e.flag} capital={e.capital} id={e.id} />
      ))}
    </ul>
  );
};
export default Cards;
