import React from 'react';

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
    <div>
      <div>
        <h3>Name:{data.name}</h3>
        <p>Season: {data.season}</p>
      </div>
      <div>
        <p>Difficulty:</p>
        <div style={barStyle}>
          <div style={fillStyle}></div>
        </div>
      </div>
      <p>{data.difficulty}/5</p>
    </div>
  );
};

export default Activity;
