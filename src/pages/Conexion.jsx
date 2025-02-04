import React, { useState } from 'react';
import './Conexion.css';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BluetoothIcon from '@mui/icons-material/Bluetooth'; // Icono de Bluetooth
import UsbIcon from '@mui/icons-material/Usb'; // Icono de USB
import axios from 'axios';

const Conexion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {}; // Obtenemos el estado pasado desde ComoUsar
  const taller = state?.taller; // Accedemos al taller desde el estado

  // Verifica si se pasó un taller
  if (!taller) {
    return <p>No se seleccionó ningún taller.</p>;
  }

  const { id } = taller; // Accedemos al id del taller

  const [isConnected, setIsConnected] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [comPorts, setComPorts] = useState([]);

  const connectToBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'],
      });

      const server = await device.gatt.connect();
      setDeviceName(device.name);
      setIsConnected(true);

      alert(`Conectado a ${device.name}`);
    } catch (error) {
      console.error('Error al conectar al dispositivo Bluetooth:', error);
      alert('Hubo un error al intentar conectar al dispositivo Bluetooth');
    }
  };

  const connectToComPort = async () => {
    try {
      const response = await axios.get('https://recursoeducativodigital.onrender.com/api/v1/serial');
      setComPorts(response.data.ports);
      setIsConnected(true);
      alert('Conexión al puerto COM establecida');
    } catch (error) {
      console.error('Error al conectar por puerto COM:', error);
      alert('Hubo un error al intentar conectar por puerto COM');
    }
  };

  // Lógica para redirigir a la ruta adecuada según el id del taller
  const getNextRoute = () => {
    switch (id) {
      case 3:
        return '/bloques3'; // Para el Taller 3
      case 4:
        return '/bloques4'; // Para el Taller 4
      case 5:
        return '/bloques5'; // Para el Taller 5
      default:
        return '/bloques'; // Ruta por defecto (en caso de que no sea Taller 3, 4 o 5)
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate('/Proyectos')}
        />
        <h1 className="titulo-conexion">Selecciona según el método de conexión para el Mbot</h1>
        <div className="conexion">
          <div>
            <h2>{isConnected ? `Conectado a ${deviceName}` : 'No conectado'}</h2>
            <button className="button-blue" onClick={connectToBluetooth}>
              <BluetoothIcon /> Conectar a dispositivo Bluetooth
            </button>
          </div>
          <div>
            <h2>{isConnected ? 'Puerto COM conectado' : 'No conectado'}</h2>
            <button className="button-com" onClick={connectToComPort}>
              <UsbIcon /> Conectar por puerto COM
            </button>
            {comPorts.length > 0 && (
              <ul>
                {comPorts.map((port, index) => (
                  <li key={index}>{port.path || 'Puerto desconocido'}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="button">
            <IconButton className="next-button" onClick={() => navigate(getNextRoute())}>
              <ArrowForwardIcon style={{ fontSize: '5rem' }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conexion;
