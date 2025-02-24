import React from 'react';
import './Felicitaciones.css';
import { useNavigate} from 'react-router-dom';


const Felicitaciones = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="inner-container">
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate('/Proyectos')}
        />
        <img className='felicitaciones' src="src/images/felicitaciones.webp" alt="felicitaciones" />
        <button className='felicitaciones_button' onClick={() => navigate('/Proyectos')}>Regresar al inicio</button>
      </div>
    </div>
  );
};

export default Felicitaciones;
