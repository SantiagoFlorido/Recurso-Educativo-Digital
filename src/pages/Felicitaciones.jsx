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
        <div>hola xd</div>
      </div>
    </div>
  );
};

export default Felicitaciones;
