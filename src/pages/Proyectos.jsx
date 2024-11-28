import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Proyectos.css';

const Proyectos = () => {
  const navigate = useNavigate(); // Hook de navegación

  const handleNavigate = () => {
    navigate('/Uso'); // Redirige a la página del componente ComoUsar
  };

  return (
    <div className="container">
      <div className="inner-container">
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate('/')} // Redirige a Inicio
        />
        <div className="projects">
          <div className="project-card">
            <div className="project-image" onClick={handleNavigate}>
              Imagen Ilustrativa de proyecto
            </div>
            <div className="project-title" onClick={handleNavigate}>
              Título del proyecto
            </div>
          </div>
          <div className="project-card">
            <div className="project-image" onClick={handleNavigate}>
              Imagen Ilustrativa de proyecto
            </div>
            <div className="project-title" onClick={handleNavigate}>
              Título del proyecto
            </div>
          </div>
          <div className="project-card">
            <div className="project-image" onClick={handleNavigate}>
              Imagen Ilustrativa de proyecto
            </div>
            <div className="project-title" onClick={handleNavigate}>
              Título del proyecto
            </div>
          </div>
          <div className="project-card">
            <div className="project-image" onClick={handleNavigate}>
              Imagen Ilustrativa de proyecto
            </div>
            <div className="project-title" onClick={handleNavigate}>
              Título del proyecto
            </div>
          </div>
          <div className="project-card">
            <div className="project-image" onClick={handleNavigate}>
              Imagen Ilustrativa de proyecto
            </div>
            <div className="project-title" onClick={handleNavigate}>
              Título del proyecto
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Proyectos;

