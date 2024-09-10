"use client"
import React, { Dispatch, SetStateAction } from "react";
import { FaPencilAlt, FaFont, FaEraser } from "react-icons/fa";
import { tools } from "../constants";

type Toolbar = {
  setTool: Dispatch<SetStateAction<"draw" | "textbox" | "eraser">>;
  tool?: keyof typeof tools;
};

export function Toolbar({ setTool, tool }: Toolbar) {
  return (
    <div className="toolbar">
      <button onClick={() => setTool("draw")} title="Draw" disabled={tool === tools.draw}>
        <FaPencilAlt />
      </button>
      <button onClick={() => setTool("textbox")} title="Textbox" disabled={tool === tools.textbox}>
        <FaFont />
      </button>
      <button onClick={() => setTool("eraser")} title="Eraser" disabled={tool === tools.eraser}>
        <FaEraser />
      </button>
    </div>
  );
}
