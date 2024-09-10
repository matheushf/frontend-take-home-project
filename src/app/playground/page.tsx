import React from 'react'
import { Board } from './components/Board/Board'
import './style.css';

export default function Page() {
  return (
    <div className="playground">
        <h1>Drawing board</h1>
        <Board />
    </div>
  )
}
