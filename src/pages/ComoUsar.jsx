import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ComoUsar.css';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";

const ComoUsar = () => {
  const navigate = useNavigate();
  const URL = "https://recursoeducativodigital.onrender.com/api/v1/talleres/2";
  const location = useLocation();
  const { state } = location || {};
  const taller = state?.taller;

  // Verifica si se pasó un taller
  if (!taller) {
    return <p>No se seleccionó ningún taller.</p>;
  }

  // Accede a las propiedades del objeto taller
  const { id, titulo, slides } = taller;

  // Estado para controlar la imagen actual del slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Función para ir al slide anterior
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  // Función para ir al siguiente slide
  const handleNextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  // Función para manejar el cambio de imagen al hacer clic en el círculo
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // Lógica para determinar la ruta de redirección según el id del taller
  const getNextRoute = () => {
    switch (id) {
      case 1:
        return '/Bloques1'; // Para el Taller 1
      case 2:
        return '/Felicitaciones'; // Para el Taller 2
      case 3:
      case 4:
      case 5:
        return '/Conexion'; // Para los Talleres 3, 4 y 5
      default:
        return '/Conexion'; // Ruta por defecto
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        {/* Logo como botón de regreso */}
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate('/Proyectos')}
        />
        <h1 className="title">{titulo}</h1>

        {/* Botón para slide anterior (desaparece en el primer slide) */}
        {currentSlide > 0 && (
          <IconButton
            className="slider-button prev"
            onClick={handlePrevSlide}
          >
            <ArrowBackIcon style={{ fontSize: '2.5rem' }} />
          </IconButton>
        )}

        {/* Botón para slide siguiente (desaparece en el último slide) */}
        {currentSlide < slides.length - 1 && (
          <IconButton
            className="slider-button next"
            onClick={handleNextSlide}
          >
            <ArrowForwardIcon style={{ fontSize: '2.5rem' }} />
          </IconButton>
        )}

        {/* Barra de puntos de navegación (circulitos) */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>

        {/* Imagen del slide actual */}
        <img
          src={slides[currentSlide]} // Imagen del slide actual
          alt={`Slide ${currentSlide + 1}`}
          className="slider-image"
        />
        
        <div className="button">
          {/* Botón siguiente (navegación a otra ruta) */}
          <IconButton
            className="next-button"
            onClick={async () => {
              if (id === 2) {
                try {
                  // Obtener el totalCompleted actual
                  const response = await axios.get(URL);
                  const totalActual = response.data.totalCompleted || 0;

                  // Enviar el PATCH para incrementar totalCompleted
                  await axios.patch(URL, { totalCompleted: totalActual + 1 });

                  // Navegar a Felicitaciones
                  navigate('/Felicitaciones');
                } catch (error) {
                  console.error("Error al actualizar el totalCompleted", error);
                }
              } else {
                // Navegación normal para otros talleres
                navigate(getNextRoute(), { state: { taller } });
              }
            }}
          >
            <ArrowForwardIcon style={{ fontSize: '5rem' }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ComoUsar;
