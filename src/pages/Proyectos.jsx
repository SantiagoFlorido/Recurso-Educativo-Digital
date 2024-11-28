import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Proyectos.css';

const Proyectos = () => {
  const navigate = useNavigate(); // Hook de navegación

  // Lista de talleres con nombres de archivos, títulos completos y rutas de imagen
  const talleres = [ //esto deberia ser una base de datos XD
    { 
      id: 1, 
      nombre: 'Taller 1-Introducción a app.pdf', 
      titulo: 'Taller 1 Introducción a app', 
      imagen: 'src/images/mapa.png' // Ruta de la imagen para el taller 1 
    },
    { 
      id: 2, 
      nombre: 'Taller 2 - Ensamblado del mBot.pdf', 
      titulo: 'Taller 2 Ensamblado del mBot', 
      imagen: 'src/images/piezas.jpg' // Ruta de la imagen para el taller 2
    },
    { 
      id: 3, 
      nombre: 'Taller 3 - Programar el Movimiento .pdf', 
      titulo: 'Taller 3 Programar el Movimiento', 
      imagen: 'src/images/conectar.jpg' // Ruta de la imagen para el taller 3
    },
    { 
      id: 4, 
      nombre: 'Taller 4.pdf', 
      titulo: 'Taller 4 Sensor Ultrasonido', 
      imagen: 'src/images/sensor4.jpeg' // Ruta de la imagen para el taller 4
    },
    { 
      id: 5, 
      nombre: 'Taller 5.pdf', 
      titulo: 'Taller 5 Seguidor de Linea', 
      imagen: 'src/images/linea5.jpeg' // Ruta de la imagen para el taller 5
    },
  ];

  const handleNavigate = (taller) => {
    navigate('/Uso', { state: { taller } }); // Redirige a la página del componente ComoUsar y pasa el taller
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
          {talleres.map((taller) => (
            <div
              key={taller.id}
              className="project-card"
              onClick={() => handleNavigate(taller.nombre)}
            >
              <div className="project-image">
                <img
                  src={taller.imagen} // Usamos la ruta de imagen que corresponde al taller
                  alt={`Taller ${taller.id}`}
                  className="project-image"
                />
              </div>
              <div className="project-title">
                {taller.titulo} {/* Mostrar el título completo */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
