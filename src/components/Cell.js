"use client";
import React from 'react';

const Cell = ({ isAlive, toggleCell }) => {
  const cellStyleWhite = {
    width: '4px',
    height: '4px',
    backgroundColor: 'white' 
  };
  const cellStyleBlack = {
    width: '4px',
    height: '4px',
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