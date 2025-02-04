import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Proyectos.css';
import talleresData from '../data/talleres.json';

const Proyectos = () => {
  const navigate = useNavigate();

  const handleNavigate = (taller) => {
    navigate('/Uso', { state: { taller } });
  };

  return (
    <div className="container">
      <div className="inner-container">
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate('/')}
        />
        <div className="projects">
          {talleresData.map((taller) => (
            <div
              key={taller.id}
              className="project-card"
              onClick={() => handleNavigate(taller)}
            >
              <div className="project-image">
                <img
                  src={taller.imagen} // Ruta directamente desde el JSON
                  alt={taller.titulo}
                  className="project-image"
                />
              </div>
              <div className="project-title">{taller.titulo}</div>
            </div>
          ))}
        </div>
        <img
          src="src/images/dashboard-icon.webp"
          alt="logo"
          className="dashboard"
          onClick={() => navigate('/dashboard')}
        />
      </div>
    </div>
  );
};

export default Proyectos;
