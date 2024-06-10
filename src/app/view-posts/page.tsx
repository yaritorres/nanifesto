'use client'
import { useEffect, useState } from "react";
import HamburgerMenu from "../components/hamburgerMenu";

export default function ViewPosts() {
  const [hamOpen, setHamOpen] = useState(false);

  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');

    if (savedMode === '') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add(savedMode);
    }
  });

  return (
    <>
      <HamburgerMenu hamOpen={hamOpen} setHamOpen={setHamOpen} />
      <div
        className={
          `fixed flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center
          transition-all ${ hamOpen ? 'blur-lg' : '' }`
        }
      >
        <ul
          className={
            `flex flex-col border-green-900 border-solid border-4 rounded-lg w-5/6 h-5/6 place-items-center place-content-center          overflow-y-auto space-y-2 p-8`
          }
        >
          <li
            className={
              `flex rounded bg-lime-400 font-mono text-2xl w-full h-1/6 justify-start items-center p-4
              ${ hamOpen ? 'hover:cursor-default' : 'hover:cursor-pointer transition-all hover:bg-lime-500' }`
            }
          >
            henlo
          </li>
        </ul>
      </div>
    </>
  )
}