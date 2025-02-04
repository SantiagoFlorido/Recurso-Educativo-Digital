import React, { useState } from "react";
import ScratchBlocks from "scratchblocks-react";
import { useNavigate } from "react-router-dom";
import FlagIcon from '@mui/icons-material/Flag';
import scratchblocks from "scratchblocks";
import es from "scratchblocks/locales/es-419.json";
import ess from "scratchblocks/locales/es.json";
import axios from "axios";

// Cargar idiomas para ScratchBlocks
scratchblocks.loadLanguages({ es });
scratchblocks.loadLanguages({ ess });

const Bloques = () => {
  const navigate = useNavigate();
  const URL = "https://recursoeducativodigital.onrender.com/api/v1/talleres/1";

  const finalizarActividad = async () => {
    try {
      // Obtener el taller actual para saber el totalCompleted actual
      const response = await axios.get(URL);
      const totalActual = response.data.totalCompleted || 0;
      
      // Enviar el PATCH para actualizar el totalCompleted
      await axios.patch(URL, { totalCompleted: totalActual + 1 });
      
      // Redirigir a la pantalla de felicitaciones
      navigate("/Felicitaciones");
    } catch (error) {
      console.error("Error al actualizar el totalCompleted", error);
    }
  };
  const [codigo, setCodigo] = useState(""); // Mantener el código de bloques
  const [categorias, setCategorias] = useState([
    {
      id: 1,
      nombre: "Movimiento",
      bloques: ["mover (100) pasos", "apuntar en dirección (290)", "ir a x: (1250) y: (350)"],
    },
    {
      id: 2,
      nombre: "Control",
      bloques: ["repetir (8)"],
    },
    {
      id: 3,
      nombre: "Apariencia",
      bloques: ["decir (hola) durante (2) segundos"],
    },
    {
      id: 4,
      nombre: "Eventos",
      bloques: ["al hacer clic en @greenFlag"],
    },
  ]);

  /*     Solucion para pegar en el cuadro de texto
    al hacer clic en @greenFlag
    ir a x: (1250) y: (350)
    apuntar en dirección (290)
    mover (100) pasos
    apuntar en dirección (65)
    mover (260) pasos
    apuntar en dirección (325)
    mover (400) pasos
  */

  // Actualiza la posición inicial del panda a { x: 1250, y: 350 } y la dirección a 0 (sin rotar)
  const [posicionPanda, setPosicionPanda] = useState({ x: 1250, y: 350, direccion: 0 });
  
  // Estado para el mensaje del panda
  const [mensajePanda, setMensajePanda] = useState("");

  // Función para mover el panda
  const moverPanda = async (accion) => {
    switch (accion.tipo) {
      case "mover":
        setPosicionPanda((prev) => ({
          ...prev,
          x: prev.x + accion.valor * Math.cos((prev.direccion * Math.PI) / 180), // Movimiento en la dirección actual
          y: prev.y + accion.valor * Math.sin((prev.direccion * Math.PI) / 180),
        }));
        break;
      case "apuntar":
        setPosicionPanda((prev) => ({
          ...prev,
          direccion: accion.valor, // Cambiar la dirección
        }));
        break;
      case "ir_a":
        setPosicionPanda({ x: accion.x, y: accion.y, direccion: 0 });
        break;
      case "decir":
        setMensajePanda(accion.mensaje); // Mostrar el mensaje del panda
        await new Promise((resolve) => setTimeout(resolve, accion.duracion * 1000)); // Esperar los segundos
        setMensajePanda(""); // Limpiar el mensaje después de la duración
        break;
      case "repetir":
        for (let i = 0; i < accion.veces; i++) {
          // Ejecutar las acciones repetidas
          for (const subAccion of accion.subacciones) {
            await moverPanda(subAccion);
          }
        }
        break;
      default:
        break;
    }
  };

  // Función para ejecutar el código al hacer clic en la bandera verde
  const ejecutarCodigo = async () => {
    const instrucciones = procesarCodigo(codigo);

    // Ejecutar cada instrucción y mover el panda
    for (const accion of instrucciones) {
      await moverPanda(accion); // Esperar a que cada acción termine antes de pasar a la siguiente
    }
  };

  // Función para procesar el código en formato de bloques (convertir el código a instrucciones)
  const procesarCodigo = (codigo) => {
    const instrucciones = [];

    // Dividir el código por líneas y extraer las instrucciones
    const lineas = codigo.split("\n");

    lineas.forEach((linea) => {
      if (linea.includes("mover")) {
        const valor = parseInt(linea.match(/\d+/)[0]);
        instrucciones.push({ tipo: "mover", valor });
      } else if (linea.includes("ir a x:")) {
        const [x, y] = linea.match(/-?\d+/g).map((num) => parseInt(num));
        instrucciones.push({ tipo: "ir_a", x, y });
      } else if (linea.includes("decir")) {
        const mensaje = linea.match(/\(([^)]+)\)/)[1]; // Extraer el mensaje
        const duracion = parseInt(linea.match(/\d+/g)[1]); // Extraer la duración
        instrucciones.push({ tipo: "decir", mensaje, duracion });
      } else if (linea.includes("repetir")) {
        const veces = parseInt(linea.match(/\d+/)[0]); // Extraer el número de repeticiones
        const subacciones = []; // Almacenar las subacciones dentro del bloque repetir

        // Procesar las subacciones dentro del bloque repetir
        const subCodigo = codigo.split("\n").slice(lineas.indexOf(linea) + 1);
        subCodigo.forEach((subLinea) => {
          if (subLinea.includes("mover")) {
            const valor = parseInt(subLinea.match(/\d+/)[0]);
            subacciones.push({ tipo: "mover", valor });
          } else if (subLinea.includes("ir a x:")) {
            const [x, y] = subLinea.match(/-?\d+/g).map((num) => parseInt(num));
            subacciones.push({ tipo: "ir_a", x, y });
          }
        });

        instrucciones.push({ tipo: "repetir", veces, subacciones });
      } else if (linea.includes("apuntar en dirección")) {
        const direccion = parseInt(linea.match(/\d+/)[0]); // Extraer la dirección
        instrucciones.push({ tipo: "apuntar", valor: direccion });
      }
    });

    return instrucciones;
  };

  // Función para agregar el bloque arrastrado al área de trabajo
  const manejarDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    setCodigo((prevCodigo) => `${prevCodigo}\n${data}`);
  };

  // Función para permitir el "drop" en el área de trabajo
  const permitirDrop = (e) => {
    e.preventDefault();
  };

  // Función para manejar el inicio del drag
  const manejarDragStart = (e, bloque) => {
    e.dataTransfer.setData("text", bloque);
  };

  // Función para manejar el "devolvimiento" del bloque al menú de categorías
  const manejarDropCategoria = (e, categoriaId) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");

    // Verificar si el bloque ya está en alguna de las categorías
    const bloqueYaExiste = categorias.some((cat) =>
      cat.bloques.includes(data)
    );

    // Si no existe en ninguna categoría, añadirlo a la categoría seleccionada
    if (!bloqueYaExiste) {
      setCategorias((prevCategorias) =>
        prevCategorias.map((cat) =>
          cat.id === categoriaId
            ? { ...cat, bloques: [...cat.bloques, data] }
            : cat
        )
      );
    }
  };

  // Permitir el "drop" en el área de categorías
  const permitirDropCategoria = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="inner-container">
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate("/Proyectos")}
        />
        <div className="main-content">
          {/* Menú lateral izquierdo */}
          <div className="sidebar">
            <h2 className="sidebar-title">Categorías</h2>
            <ul className="categories-list">
              {categorias.map((cat) => (
                <li key={cat.id} className="category-item">
                  <h3 className="category-title">{cat.nombre}</h3>
                  <ul
                    className="blocks-list"
                    onDrop={(e) => manejarDropCategoria(e, cat.id)} // Permitir drop en la categoría
                    onDragOver={permitirDropCategoria} // Permitir el drag
                  >
                    {cat.bloques.map((bloque, index) => (
                      <li
                        key={index}
                        className="block-item"
                        draggable
                        onDragStart={(e) => manejarDragStart(e, bloque)} // Hacer que el bloque sea arrastrable
                      >
                        <ScratchBlocks blockStyle="scratch3" languages={["es"]}>
                          {bloque}
                        </ScratchBlocks>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* Área de edición */}
          <div className="editor">
            <header className="editor-header">
              <h1 className="editor-title">Editor de Bloques</h1>
              <button className="load-button2" onClick={ejecutarCodigo}>
                <FlagIcon className="iconFlag" style={{ color: "green" }} />
              </button>
              <button className="load-button" onClick={finalizarActividad}>
                Finalizar Actividad
              </button>
            </header>
            <div
              className="editor-workspace"
              onDrop={manejarDrop}
              onDragOver={permitirDrop}
            >
              <ScratchBlocks blockStyle="scratch3" languages={["es"]}>
                {codigo}
              </ScratchBlocks>
            </div>
          </div>
        </div>
      </div>

      {/* Imagen del mapa */}
      <img src="src/images/mapa.webp" alt="mapa" className="red-square" />
      
      {/* Panda */}
      <img
        src="src/images/panda.webp"
        alt="panda"
        className="panda"
        style={{
          left: `${posicionPanda.x}px`,
          top: `${posicionPanda.y}px`,
          transform: `rotate(${posicionPanda.direccion}deg)`, // Rotar la imagen del panda
        }}
      />

      {/* Consola para código */}
      <div className="console">
        <textarea
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          rows="10"
          cols="30"
        />
      </div>

      {/* Mostrar el mensaje del panda */}
      {mensajePanda && (
        <div className="mensaje-panda">{mensajePanda}</div>
      )}
    </div>
  );
};

export default Bloques;
