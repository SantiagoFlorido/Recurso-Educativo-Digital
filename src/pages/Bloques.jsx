import React, { useEffect, useRef } from 'react';
import './Bloques.css';
import { useNavigate } from 'react-router-dom';
import * as Blockly from 'blockly';

const Bloques = () => {
  const navigate = useNavigate();
  const workspaceRef = useRef(null);

  useEffect(() => {
    if (workspaceRef.current) {
      Blockly.inject(workspaceRef.current, {
        toolbox: `
          <xml>
            <block type="controls_repeat_ext"></block>
            <block type="controls_if"></block>
            <block type="math_number"></block>
            <block type="math_arithmetic"></block>
            <block type="text"></block>
            <block type="text_print"></block>
          </xml>
        `,
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="inner-container">
        <img
          src="src/images/logo.webp"
          alt="logo"
          className="logo1"
          onClick={() => navigate('/')}
        />
        <h1 className="titulo-bloques">Programación por Bloques</h1>
        <div className="bloques-workspace" ref={workspaceRef}></div>
      </div>
    </div>
  );
};

export default Bloques;
