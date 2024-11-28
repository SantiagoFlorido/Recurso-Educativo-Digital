import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner'; // Importar el loader
import './Inicio.css';

const Inicio = () => {
  const navigate = useNavigate(); // Hook de navegación

  // useEffect para realizar la redirección después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Proyectos'); // Redirige a la página de Proyectos
    }, 5000); // 5000 ms = 5 segundos

    // Limpiar el temporizador si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">
      <div className="inner-container">
        <img src="src/images/logo.webp" alt="logo" className="logo1" />
        <img src="src/images/logo.webp" alt="logo" className="logo2" />
        <img src="src/images/bandera.webp" alt="bandera" className="bandera" />
        <div className="loader-container">
          <span>Cargando, por favor espere...</span>
          <ThreeCircles height="40" width="40" color="green" />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
