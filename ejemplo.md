import React from 'react'
import './Conexion.css'
import { useNavigate } from 'react-router-dom'; // Importar useNavigate


const Conexion = () => {
  const navigate = useNavigate(); // Hook de navegación
  return (
    <div className='container'>
      <div className='inner-container'>
      <img src="src/images/logo.webp" alt="logo" className="logo1" onClick={() => navigate('/')} />
      </div>
    </div>
  )
}

export default Conexion