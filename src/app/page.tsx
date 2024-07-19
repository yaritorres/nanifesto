'use client'
import './globals.css';
import { useEffect, useState } from 'react';
import HamburgerMenu from './components/hamburgerMenu';

export default function Home() {
  const [hamOpen, setHamOpen] = useState(false);
  const handleHam = () => { setHamOpen(!hamOpen) };

  // SETS CURRENT THEME (LIGHT OR DARK) ON PAGE USING LOCAL STORAGE,
  // OTHERWISE DEFAULTS TO DARKMODE IF NONE IS SET
  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');

    if (savedMode === '') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add(savedMode);
    }
  }, []);

  return (
    <main>
      <HamburgerMenu hamOpen={hamOpen} handleHam={handleHam} />
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center`
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
    </main>
  );
}
