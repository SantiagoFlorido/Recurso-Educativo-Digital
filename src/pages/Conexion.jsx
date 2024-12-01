import React, { useState } from 'react';
import './Conexion.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Conexion = () => {
  const navigate = useNavigate(); // Hook de navegación
  const [isConnected, setIsConnected] = useState(false); // Estado para saber si está conectado
  const [deviceName, setDeviceName] = useState(''); // Estado para almacenar el nombre del dispositivo

  // Función para conectar con el dispositivo Bluetooth
  const connectToBluetooth = async () => {
    try {
      // Solicitar el dispositivo Bluetooth
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true, // Aceptar cualquier dispositivo Bluetooth
        optionalServices: ['battery_service'] // Agregar servicios opcionales si es necesario
      });

      // Conectar al dispositivo
      const server = await device.gatt.connect();
      setDeviceName(device.name); // Guardar el nombre del dispositivo
      setIsConnected(true); // Cambiar el estado a conectado

      alert(`Conectado a ${device.name}`);
    } catch (error) {
      console.error('Error al conectar al dispositivo Bluetooth:', error);
      alert('Hubo un error al intentar conectar al dispositivo Bluetooth');
    }
  };

  return (
    <div className='container'>
      <div className='inner-container'>
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate('/')}
        />
        {/* Mostrar la información de la conexión */}
        <div>
          <h2>{isConnected ? `Conectado a ${deviceName}` : 'No conectado'}</h2>
          <button onClick={connectToBluetooth}>Conectar a dispositivo Bluetooth</button>
        </div>
      </div>
    </div>
  );
};

export default Conexion;
