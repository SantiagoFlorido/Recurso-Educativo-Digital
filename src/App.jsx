import { Routes, Route } from 'react-router-dom'; // Importar Routes y Route para definir las rutas
import Inicio from './pages/Inicio'; // Importa el componente de la página Inicio
import './App.css';
import Conexion from './pages/Conexion';
import ComoUsar from './pages/ComoUsar';
import Proyectos from './pages/Proyectos';
import Bloques from './pages/Bloques'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Conexion" element={<Conexion />} />
        <Route path="/Uso" element={<ComoUsar />} />
        <Route path="/Proyectos" element={<Proyectos />} />
        <Route path="/Bloques" element={<Bloques/>}/>
        {/* Ruta para todas las demás páginas no encontradas */}
        <Route path="*" element={<Inicio />} />
      </Routes>
    </div>
  );
}

export default App;


