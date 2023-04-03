import React from 'react';
import Styles from './Activity.module.css';

const Activity = ({data}) => {
  // Calculamos el ancho de la barra en base a la dificultad (1 al 5)
  const barWidth = data.difficulty * 20;

  // Creamos un estilo para el div que contendrá la barra
  const barStyle = {
    height: '10px',
    width: '100%',
    backgroundColor: '#e6e6e6',
    borderRadius: '5px',
  };

  // Agregamos un estilo adicional para rellenar el div de un color
  const fillStyle = {
    height: '100%',
    width: `${barWidth}%`,
    backgroundColor: '#9ac9ff',
    borderRadius: '5px',
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.container__data}>
        <h3>{data.name}</h3>
        <p>Season: {data.season}</p>
        <p>Difficulty:</p>
      </div>
      <div className={Styles.container__difficulty}>
        <div style={barStyle}>
          <div style={fillStyle}></div>
        </div>
        <p>{data.difficulty}/5</p>
      </div>
    </div>
  );
};

export default Activity;
