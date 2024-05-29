'use client'
import { useEffect, useState } from "react";

export default function ViewPosts() {
  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');
    console.log('saved mode 1:', savedMode);

    if (savedMode === '') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add(savedMode);
    }
  });

  return (
    <div
    className={
      `fixed flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center`
    }
  >
    <ul
      className={
        `flex flex-col border-green-900 border-solid border-4 rounded-lg w-5/6 h-5/6 place-items-center place-content-center overflow-y-auto
        space-y-2 p-8`
      }
    >
      <li
        className={
          `flex rounded bg-lime-400 font-mono text-2xl w-full h-1/6 justify-start items-center p-4
          transition-all hover:bg-lime-500`
        }
      >
        i love chicken
      </li>
    </ul>
  </div>
  )
}