'use client'
import { useEffect, useState } from 'react';
import HamburgerMenu from '../components/hamburgerMenu';

export default function Settings() {
  const [dark, setDark] = useState('');
  const [hamOpen, setHamOpen] = useState(false);

  const handleHam = () => { setHamOpen(!hamOpen) };

  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');

    if (savedMode === '') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
      setDark('dark');
    } else {
      document.documentElement.classList.add(savedMode);
      setDark(savedMode);
    }
  }, [dark]);

  return(
    <>
      <HamburgerMenu hamOpen={hamOpen} handleHam={handleHam} />
      <div className={`flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center`}>
        <div
          className={
            `flex flex-col justify-center items-center space-y-4 w-3/6 h-3/6 rounded border-solid border-green-900 border-4`
          }
        >
          <span
            className={`font-mono text-lime-400 text-3xl hover:cursor-pointer transition hover:text-green-900`}
            onClick={ () => {
              if (dark === 'dark' || dark === '') {
                setDark('light');
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                window.localStorage.setItem('theme', 'light');
              } else {
                setDark('dark');
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                window.localStorage.setItem('theme', 'dark');
              }
              console.log('local storage:', window.localStorage.getItem('theme'));
              console.log('mode after click:', dark);
            } }
          >
            { dark === 'light' ? 'Dark Mode' : 'Light Mode' }
          </span>
        </div>
      </div>
    </>
  )
}