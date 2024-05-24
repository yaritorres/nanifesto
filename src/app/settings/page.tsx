'use client'
import { useState } from 'react';

export default function Settings() {
  const [dark, setDark] = useState(true);

  return(
    <div className={`flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center`}>
      <div
        className={
          `flex flex-col justify-center items-center space-y-4 w-3/6 h-3/6 rounded border-solid border-green-900 border-4`
        }
      >
        <span
          className={`font-mono text-lime-400 text-3xl hover:cursor-pointer transition hover:text-green-900`}
          onClick={ () => {
            setDark(!dark);
            document.documentElement.classList.remove( dark ? 'dark' : 'light' );
            document.documentElement.classList.add( dark ? 'light' : 'dark' );
            localStorage.theme = dark ? 'dark' : 'light';
          } }
        >
          { dark ? 'Light Mode' : 'Dark Mode' }
        </span>
      </div>
    </div>
  )
}