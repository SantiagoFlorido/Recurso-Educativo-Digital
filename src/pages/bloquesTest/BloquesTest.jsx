import React, { useState } from "react";
import ScratchBlocks from "scratchblocks-react";
import "./Bloques.css";
import { useNavigate } from "react-router-dom";
import scratchblocks from "scratchblocks";
import es from "scratchblocks/locales/es.json";

// Configurar scratchblocks con idioma español
scratchblocks.loadLanguages({ es });

const BloquesTest = () => {
  const navigate = useNavigate();
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
      bloques: ["esperar (5) segundos", "repetir (10) veces"],
    },
    {
      id: 3,
      nombre: "Eventos",
      bloques: ["al hacer clic en @greenFlag", "al presionar tecla (spacebar)"],
    },
  ]);

  const manejarDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    setCodigo((prevCodigo) => `${prevCodigo}\n${data}`);
  };

  const permitirDrop = (e) => {
    e.preventDefault();
  };

  const manejarDragStart = (e, bloque) => {
    e.dataTransfer.setData("text", bloque);
  };

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

  const permitirDropCategoria = (e) => {
    e.preventDefault();
  };

  const eliminarBloque = (bloque) => {
    setCodigo((prevCodigo) =>
      prevCodigo
        .split("\n")
        .filter((linea) => linea !== bloque)
        .join("\n")
    );
  };

  const editarBloque = (bloqueAntiguo, bloqueNuevo) => {
    setCodigo((prevCodigo) =>
      prevCodigo.replace(bloqueAntiguo, bloqueNuevo)
    );
  };

  const cargarAlMbot = () => {
    console.log("Código cargado al mBot:", codigo);
    alert(`Código cargado al mBot: \n${codigo}`);
  };

  return (
    <div className="container">
      <div className="inner-container">
        {/* Logo */}
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate("/")}
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
                    onDrop={(e) => manejarDropCategoria(e, cat.id)}
                    onDragOver={permitirDropCategoria}
                  >
                    {cat.bloques.map((bloque, index) => (
                      <li
                        key={index}
                        className="block-item"
                        draggable
                        onDragStart={(e) => manejarDragStart(e, bloque)}
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
            </header>
            <div
              className="editor-workspace"
              onDrop={manejarDrop}
              onDragOver={permitirDrop}
            >
              {codigo
                .split("\n")
                .filter((linea) => linea.trim() !== "")
                .map((linea, index) => (
                  <div key={index} className="editable-block">
                    <ScratchBlocks blockStyle="scratch3" languages={["es"]}>
                      {linea}
                    </ScratchBlocks>
                    <button
                      onClick={() =>
                        editarBloque(
                          linea,
                          prompt("Editar bloque:", linea) || linea
                        )
                      }
                    >
                      ✏️
                    </button>
                    <button onClick={() => eliminarBloque(linea)}>🗑️</button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Consola para ver el código generado */}
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

export default BloquesTest;
