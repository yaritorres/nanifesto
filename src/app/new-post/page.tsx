'use client'
import { useEffect, useState } from "react";
import HamburgerMenu from "../components/hamburgerMenu";

export default function Blog() {
  const [hamOpen, setHamOpen] = useState(false);

  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');
    console.log('saved mode 1:', savedMode);

    if (savedMode === '') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add(savedMode);
    }
  }, []);

  return (
    <>
      <HamburgerMenu hamOpen={hamOpen} setHamOpen={setHamOpen} />
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-items-center place-content-center
          ${ hamOpen ? 'blur-lg' : '' }`
        }
      >
        <form className='flex w-3/6 h-3/6 rounded border-green-900 dark:border-lime-400 border-solid border-4 p-5 justify-center items-start flex-col space-y-2'>
          <label className='font-mono text-green-900 dark:text-lime-400 select-none'> title </label>
          <input
            type='text'
            className={
              `bg-lime-400 dark:bg-green-900 rounded border-solid border-2 border-green-900 w-1/4 p-2 overflow-x-auto
              ${ hamOpen ? 'hover:cursor-default' : ''}`
            }
          >
          </input>
          <label className='font-mono text-green-900 dark:text-lime-400 select-none'> body </label>
          <textarea
            className={
              `bg-lime-400 dark:bg-green-900 rounded border-solid border-2 border-green-900 w-full h-full p-2 overflow-y-auto resize-none
              ${ hamOpen ? 'hover:cursor-default' : ''}`
            }
            >
          </textarea>
          <input
            type='submit'
            value='save and post'
            className={
              `bg-green-900 text-lime-400 rounded p-2 self-end transition-all ${ hamOpen ? '' : 'hover:bg-green-700 hover:cursor-pointer'}`
            }
          >
          </input>
        </form>
      </div>
    </>
  )
}