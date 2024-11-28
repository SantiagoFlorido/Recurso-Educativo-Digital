import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ComoUsar.css';

const ComoUsar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const taller = state?.taller;

  if (!taller) {
    return <p>No se seleccionó ningún taller.</p>;
  }

  return (
    <div className="container">
      <div className="inner-container">
        {/* Logo como botón de regreso */}
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate('/')}
        />
        <div className="content">
          <h1 className="title">{taller}</h1>
          <iframe
            src={`src/talleres/${taller}`} // Ruta del PDF
            title={taller}
          />
        </div>
      </div>
    </div>
  );
};

export default ComoUsar;
