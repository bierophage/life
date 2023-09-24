"use client";
import { useEffect, useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Your canvas drawing code goes here

    // Example: Draw a red rectangle
    context.fillStyle = 'red';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400} // Set the canvas width
      height={400} // Set the canvas height
    ></canvas>
  );
};

export default Canvas;