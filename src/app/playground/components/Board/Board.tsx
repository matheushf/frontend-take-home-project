"use client"

import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import { Toolbar } from '../Toolbar/Toolbar';
import { tools } from '../constants';
import './style.css';

function Board() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<keyof typeof tools>('draw'); 
  const [isErasing, setIsErasing] = useState(false);
  const strokeColor = 'white';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctxRef.current = ctx;
    }
  }, []);

  function startDrawing(e: MouseEvent<HTMLCanvasElement>) {
    if (tool === tools.draw) {
      setIsDrawing(true);
      const ctx = ctxRef.current;
      if (ctx) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      }
    }
  }

  function draw(e: MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing || tool !== tools.draw) return;
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  }

  function stopDrawing() {
    setIsDrawing(false);
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.closePath();
    }
  }

  function createTextbox(e: MouseEvent<HTMLCanvasElement>) {
    if (tool === tools.textbox) {
      const textbox = document.createElement('input');
      textbox.type = 'text';
      textbox.style.position = 'absolute';
      textbox.style.left = `${e.clientX}px`;
      textbox.style.top = `${e.clientY}px`;
      document.body.appendChild(textbox);
      textbox.focus();
      textbox.addEventListener('blur', () => {
        const ctx = ctxRef.current;
        if (ctx) {
          ctx.font = '20px Arial';
          ctx.fillStyle = strokeColor;
          ctx.fillText(textbox.value, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
          document.body.removeChild(textbox);
        }
      });
    }
  }

  function startErasing(e: MouseEvent<HTMLCanvasElement>) {
    if (tool === tools.eraser) {
      const ctx = ctxRef.current;
      if (ctx) {
        ctx.clearRect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 20, 20);
      }
    }
  }

  function onMouseMove(e: MouseEvent<HTMLCanvasElement>) {
    if (tool === tools.draw) draw(e);
    else if (tool === tools.eraser && isErasing) startErasing(e);
  }

  function onMouseDown(e: MouseEvent<HTMLCanvasElement>) {
    if (tool === tools.draw) {
        startDrawing(e);
    } else  {
        setIsErasing(true);
        startErasing(e);
    }
  }

  function onMouseUp(e: MouseEvent<HTMLCanvasElement>) {
    if (tool === tools.draw) stopDrawing();
    else setIsErasing(false);
  }

  return (
    <div className="canvas-app">
      
      <Toolbar setTool={setTool} tool={tool} />
      
      <canvas
        height={500}
        width={500}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onClick={createTextbox}
        className="canvas"
      />
    </div>
  );
}

export { Board };
