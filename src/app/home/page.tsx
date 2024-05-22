'use client'
import { useState } from 'react';
import HamburgerMenu from '../components/hamburgerMenu';

export default function Homepage() {
  const [hamOpen, setHamOpen] = useState(false);

  return (
    <>
      <HamburgerMenu hamOpen={hamOpen} setHamOpen={setHamOpen} />
      <div
        className={
          `flex w-screen h-screen bg-slate-100 place-content-center place-items-center transition-all
          ${ hamOpen ? 'blur-lg' : '' }`
        }
      >
        <div
          className={
            `flex w-2/4 h-1/4 place-items-center`
          }
        >
          <button>
            <link href='/Blog'></link>
          </button>
          <h1 className='font-mono text-6xl text-center text-lime-400 select-none'>
            what would you like to do?
          </h1>
        </div>
      </div>
    </>
  )
}