'use client'
import { useEffect, useState } from 'react';
import HamburgerMenu from '../components/hamburgerMenu';

export default function Settings() {
  const [dark, setDark] = useState('');
  const handleLightSwitch = () => {
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
  }

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
      <div className={`flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center`}>
        <div
          className={
            `flex flex-col justify-center items-center space-y-4 w-3/6 h-3/6 rounded border-solid border-lime-500 border-4`
          }
        >
          <span
            className={`font-mono text-lime-500 text-3xl hover:cursor-pointer transition hover:text-green-900`}
            onClick={handleLightSwitch}
          >
            { dark === 'light' ? 'Dark Mode' : 'Light Mode' }
          </span>
        </div>
      </div>
    </>
  )
}