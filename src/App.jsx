import { Routes, Route } from 'react-router-dom'; // Importar Routes y Route para definir las rutas
import Inicio from './pages/paginaInicio/Inicio'; // Importa el componente de la página Inicio
import './App.css';
import Conexion from './pages/ConexionMbot/Conexion';
import ComoUsar from './pages/tallerContenido/ComoUsar';
import Proyectos from './pages/catalogoProyectos/Proyectos';
import Bloques from './pages/bloquesTest/Bloques';
import BloquesTest from './pages/bloquesTest/BloquesTest';
import Bloques1 from './pages/tallerbloques/Bloques1';
import Bloques3 from './pages/tallerbloques/Bloques3';
import Bloques4 from './pages/tallerbloques/Bloques4';
import Bloques5 from './pages/tallerbloques/Bloques5';
import Felicitaciones from './pages/finalizarTaller/Felicitaciones';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Conexion" element={<Conexion />} />
        <Route path="/Uso" element={<ComoUsar />} />
        <Route path="/Proyectos" element={<Proyectos />} />
        
        {/*Rutas de test */}
        <Route path="/Bloques" element={<Bloques/>}/>
        <Route path="/BloquesTest" element={<BloquesTest/>}/>

        {/*bloques por taller  (BloquesX) x=numero de taller*/}
        <Route path="/Bloques1" element={<Bloques1/>}/>
        <Route path="/Bloques3" element={<Bloques3/>}/>
        <Route path="/Bloques4" element={<Bloques4/>}/>
        <Route path="/Bloques5" element={<Bloques5/>}/>
        
        {/*Ruta para finalizar con felicitaciones*/}
        <Route path="/Felicitaciones" element={<Felicitaciones/>}/>

        {/*Ruta para el dashboard*/}
        <Route path="/dashboard" element={<Dashboard/>}/>

        {/* Ruta para todas las demás páginas no encontradas */}
        <Route path="*" element={<Inicio />} />
      </Routes>
    </div>
  );
}

export default App;


