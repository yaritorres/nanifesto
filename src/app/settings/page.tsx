'use client'
import { useEffect, useState } from 'react';

export default function Settings() {
  const [dark, setDark] = useState('');

  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');
    document.documentElement.classList.remove(savedMode);
    console.log('saved mode 1:', savedMode);
    setDark(savedMode);
    document.documentElement.classList.add(savedMode);
    console.log('saved mode 2:', savedMode);
  }, [dark]);

  useEffect(() => {
    if (!window.localStorage.getItem('theme')) {
      window.localStorage.setItem('theme', dark);
    }
  });

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
            if (dark === 'dark') {
              setDark('light');
            } else {
              setDark('dark');
            }

            if (dark === 'dark') {
              window.localStorage.setItem('theme', 'light');
            } else {
              window.localStorage.setItem('theme', 'light');
            }
            console.log('local storage:', window.localStorage.getItem('theme'));
          } }
        >
          { dark === 'light' ? 'Light Mode' : 'Dark Mode' }
        </span>
      </div>
    </div>
  )
}