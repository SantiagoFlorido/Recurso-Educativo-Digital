import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Inicio.css';

const Inicio = () => {
  const navigate = useNavigate(); // Hook de navegación

  // useEffect para realizar la redirección después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Conexion'); // Redirige a la página de Conexion
    }, 5000); // 5000 ms = 5 segundos

    // Limpiar el temporizador si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">
      <div className="inner-container">
        <img src="src/images/logo.webp" alt="logo" className='logo1'/>
        <img src="src/images/logo.webp" alt="logo" className='logo2'/>
        <img src="src/images/bandera.webp" alt="bandera" className='bandera'/>
      </div>
    </div>
  );
}

export default Inicio;
