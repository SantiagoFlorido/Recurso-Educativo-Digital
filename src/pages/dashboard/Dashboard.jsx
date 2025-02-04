import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const URL = 'https://recursoeducativodigital.onrender.com/api/v1';

  const [talleres, setTalleres] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/talleres`)
        .then((res) => {
            setTalleres(res.data);
        })
        .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <div className="inner-container">
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate('/Proyectos')}
        />
        <div className="talleres-list">
          {talleres.length > 0 
            ? talleres.map((taller) => {
                // Escalar el totalCompleted para ajustarse a la escala de 1000
                const progresoEscalado = Math.min(taller.totalCompleted, 1000); // Limitar a 1000 si el valor es mayor
                const porcentaje = (progresoEscalado / 1000) * 100; // Calcular el porcentaje de la barra (sobre 100%)

                return (
                  <div key={taller.id} className="taller-item">
                    <div className="nombre-talleres">{taller.titulo}</div>
                    <div className="progress-bar-container">
                      {/* Etiquetas "0" y "1000" encima de la barra */}
                      <div className="progress-labels">
                        <span>0</span> {/* Etiqueta 0 */}
                        <span>1000</span> {/* Etiqueta 1000 */}
                      </div>
                      <div 
                        className="progress-bar" 
                        style={{ width: `${porcentaje}%` }} // Escalar según el porcentaje
                      >
                        {/* Mostrar el porcentaje con decimales */}
                        {porcentaje.toFixed(2)}% 
                      </div>
                    </div>
                  </div>
                );
              })
            : "Cargando talleres..."}
        </div>
        <button className='Volver-dashboard' onClick={() => navigate('/Proyectos')}>Regresar al inicio</button>
      </div>
    </div>
  );
};

export default Dashboard;
