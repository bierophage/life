"use client";
import React, { useState, useEffect, useRef } from 'react';
import Cell from './Cell';

const numRows = 50;
const numCols = 50;

const Grid = () => {

  const [density, setDensity] = useState(0.83)
  // Initialize the grid with random cell states
  const initializeGrid = (density) => {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
      grid[i] = Array.from({ length: numCols }, () => Math.random() > density);
    }
    return grid;
  };

  function handleDensity(event) {
    setCount(0)
    setGrid(initializeGrid(event.target.value/100));
  }

  const [grid, setGrid] = useState(initializeGrid(density));
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const toggleCell = (row, col) => {
    // Toggle the state of the clicked cell
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

  useEffect(() => {
    // Logic for calculating the next generation of cells
    // Implement Conway's Game of Life rules here

    const calculateNextGeneration = () => {
      const newGrid = [...grid];

      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const cell = grid[row][col];
          let liveNeighbors = 0;

          // Define neighboring positions
          const neighbors = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
          ];

          // Count live neighbors
          for (const [dx, dy] of neighbors) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
              if (grid[newRow][newCol]) {
                liveNeighbors++;
              }
            }
          }

          // Apply the rules of Conway's Game of Life
          if (cell && (liveNeighbors < 2 || liveNeighbors > 3)) {
            newGrid[row][col] = false; // Cell dies
          } else if (!cell && liveNeighbors === 3) {
            newGrid[row][col] = true; // Cell becomes alive
          }
        }
      }

      setGrid(newGrid);
      setCount(count + 1);
    };

    if (refresh) {
      const intervalId = setInterval(calculateNextGeneration, 1000); // Calculate next generation every 1 second
      return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }

  }, [grid, refresh, count]);

  return (
    <div>
      <div>
        <button onClick={() => setRefresh(!refresh)}>
          {
            refresh ? "Stop" : "Start"
          }
        </button>

      </div>
      <div>génération : {count}</div>
      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 4px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isAlive={cell}
              toggleCell={() => toggleCell(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <div>
        Density <input type="number" name="density" defaultValue={density*100} onChange={handleDensity}></input>
      </div>
    </div>

  );
};

export default Grid;