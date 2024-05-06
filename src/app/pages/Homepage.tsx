'use client'
import '../styles/Homepage.css';
import { useState } from 'react';

export default function Homepage() {
  const [animate, setAnimate] = useState(false);
  return (
    <div className='flex w-screen h-screen bg-slate-100 place-content-center place-items-center'>
      <div
        className={
          `${animate && 'animate-ping'} flex border-green-900 border-solid border-4 rounded-lg w-2/4 h-1/4 place-items-center cursor-pointer transition hover:bg-green-900`
        }
        onClick={ () => setAnimate(true) }
        onAnimationEnd={ () => setAnimate(false) }
      >
        <h1 className='font-mono text-6xl text-center text-lime-400'>
          welcome to nanifesto.
        </h1>
      </div>
    </div>

  )
}