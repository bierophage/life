"use client";
import React from 'react';

const Cell = ({ isAlive, toggleCell }) => {
  const cellStyleWhite = {
    width: '3px',
    height: '3px',
    backgroundColor: 'white' 
  };
  const cellStyleBlack = {
    width: '3px',
    height: '3px',
    backgroundColor: 'black' 
  };
  return (
    <div
      className="cell"
      style={isAlive?cellStyleBlack:cellStyleWhite}
      onClick={() => toggleCell()}
    ></div>
  );
};

export default Cell;