'use client'
import '../styles/Homepage.css';
import { useState } from 'react';

export default function Homepage() {
  const [animate, setAnimate] = useState(false);
  const [hamOpen, setHamOpen] = useState(false);

  const handleHam = () => { setHamOpen(!hamOpen) };
  return (
    <div className={`flex w-screen h-screen bg-slate-100 place-content-center place-items-center`}>
      <button
        onClick={handleHam}
        className={
          `fixed top-2 left-2 flex flex-col space-y-1 h-12 w-14 bg-green-900 rounded justify-center items-center`
        }
      >
        <span
          className={
            `h-0.5 w-6 rounded bg-lime-400 block transition-all ${ hamOpen ? 'rotate-180' : '-rotate-180' }`
          }
        >
        </span>
        <span
          className={
            `h-0.5 w-6 rounded bg-lime-400 block transition-all ${ hamOpen ? 'rotate-180' : '-rotate-180' }`
          }
        >
        </span>
        <span
          className={
            `h-0.5 w-6 rounded bg-lime-400 block transition-all ${ hamOpen ? 'rotate-180' : '-rotate-180' }`
          }
        >
        </span>
      </button>
      <ul
        className={
          `fixed top-16 left-2 bg-lime-400 h-24 w-40 rounded flex flex-col justify-center items-center transition-all
          ${ hamOpen ? 'left-2 opacity-100' : '-left-16 opacity-0'}`
        }
      >
        <li className={`block`}>list item</li>
        <li className={`block`}>list item</li>
        <li className={`block`}>list item</li>
      </ul>
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