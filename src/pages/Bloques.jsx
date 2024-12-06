import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript";
import "./Bloques.css";
import { useNavigate } from "react-router-dom";

const Bloques = () => {
  const navigate = useNavigate();
  const workspaceRef = useRef(null);

  useEffect(() => {
    // Configurar Blockly
    const workspace = Blockly.inject(workspaceRef.current, {
      toolbox: {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "Movimiento",
            contents: [
              {
                kind: "block",
                type: "move_steps",
              },
              {
                kind: "block",
                type: "turn_right",
              },
              {
                kind: "block",
                type: "turn_left",
              },
            ],
          },
          {
            kind: "category",
            name: "Control",
            contents: [
              {
                kind: "block",
                type: "wait_seconds",
              },
              {
                kind: "block",
                type: "repeat_times",
              },
            ],
          },
          {
            kind: "category",
            name: "Eventos",
            contents: [
              {
                kind: "block",
                type: "when_flag_clicked",
              },
              {
                kind: "block",
                type: "when_key_pressed",
              },
            ],
          },
        ],
      },
      grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
      zoom: { controls: true, wheel: true },
      trashcan: true,
    });

    // Crear bloques personalizados
    Blockly.defineBlocksWithJsonArray([
      {
        type: "move_steps",
        message0: "mover %1 pasos",
        args0: [
          {
            type: "field_number",
            name: "STEPS",
            value: 10,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 230,
      },
      {
        type: "turn_right",
        message0: "girar a la derecha %1 grados",
        args0: [
          {
            type: "field_angle",
            name: "ANGLE",
            angle: 90,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 160,
      },
      {
        type: "turn_left",
        message0: "girar a la izquierda %1 grados",
        args0: [
          {
            type: "field_angle",
            name: "ANGLE",
            angle: 90,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 160,
      },
      {
        type: "wait_seconds",
        message0: "esperar %1 segundos",
        args0: [
          {
            type: "field_number",
            name: "SECONDS",
            value: 1,
            min: 0,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 120,
      },
      {
        type: "repeat_times",
        message0: "repetir %1 veces",
        args0: [
          {
            type: "field_number",
            name: "TIMES",
            value: 10,
            min: 1,
          },
        ],
        message1: "%1",
        args1: [
          {
            type: "input_statement",
            name: "DO",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 260,
      },
      {
        type: "when_flag_clicked",
        message0: "cuando se hace clic en la bandera verde",
        nextStatement: null,
        colour: 290,
      },
      {
        type: "when_key_pressed",
        message0: "cuando se presiona la tecla %1",
        args0: [
          {
            type: "field_dropdown",
            name: "KEY",
            options: [
              ["espacio", "SPACE"],
              ["flecha arriba", "UP"],
              ["flecha abajo", "DOWN"],
              ["flecha izquierda", "LEFT"],
              ["flecha derecha", "RIGHT"],
            ],
          },
        ],
        nextStatement: null,
        colour: 290,
      },
    ]);

    return () => workspace.dispose();
  }, []);

  const cargarAlMbot = () => {
    const workspace = Blockly.getMainWorkspace();
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    console.log("Código generado:", code);
    alert("Código cargado al mBot: \n" + code);
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
          <header className="editor-header">
            <h1 className="editor-title">Editor de Bloques</h1>
            <button className="load-button" onClick={cargarAlMbot}>
              Cargar al mBot
            </button>
          </header>

          {/* Área de trabajo de Blockly */}
          <div
            ref={workspaceRef}
            style={{
              width: "100%",
              height: "600px",
              border: "1px solid #ccc",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Bloques;
