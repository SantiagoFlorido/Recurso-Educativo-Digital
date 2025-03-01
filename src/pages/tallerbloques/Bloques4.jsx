import React, { useState, useRef } from "react";
import ScratchBlocks from "scratchblocks-react";
//import "./Bloques.css";
import { useNavigate } from "react-router-dom";
import scratchblocks from "scratchblocks";
import es from "scratchblocks/locales/es.json";
import axios from "axios";

// Configurar scratchblocks con idioma español
scratchblocks.loadLanguages({ es });

const Bloques = () => {
  const navigate = useNavigate();
  const URL = "https://recursoeducativodigital.onrender.com/api/v1/talleres/4";

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
      bloques: ["mover (1) pasos", "girar a la derecha (45) grados"],
    },
    {
      id: 2,
      nombre: "Control",
      bloques: ["esperar (5) segundos", "repetir (1)"],
    },
    {
      id: 3,
      nombre: "Eventos",
      bloques: [
        "al hacer clic en @greenFlag",
        "al presionar tecla (spacebar)",
      ],
    },
  ]);

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

  // Función para permitir la edición de un bloque
  const editarBloque = (bloque, nuevaValor) => {
    // Actualizar el valor del bloque en el código
    const nuevoCodigo = codigo.replace(bloque, nuevaValor);
    setCodigo(nuevoCodigo);
  };

  const cargarAlMbot = () => {
    console.log("Cargar al mBot:", codigo);
    alert("Código cargado al mBot: \n" + codigo);
  };

  return (
    <div className="container">
      <div className="inner-container">
        {/* Logo */}
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate("/Proyectos")}
        />
        {/* Contenido principal */}
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
              <button className="load-button" onClick={cargarAlMbot}>
                Cargar al mBot
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
              {/* Aquí manejamos la edición de bloques */}
              <ScratchBlocks blockStyle="scratch3" languages={["es"]}>
                {codigo}
              </ScratchBlocks>
            </div>
          </div>
        </div>
      </div>
      {/* Cuadro de edición del código (consola) abajo a la derecha */}
      <div className="console">
        <textarea
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          rows="10"
          cols="30"
        />
      </div>
    </div>
  );
};

export default Bloques;
