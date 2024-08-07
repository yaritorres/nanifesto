'use client'
import './globals.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  // SETS CURRENT THEME (LIGHT OR DARK) ON PAGE USING LOCAL STORAGE,
  // OTHERWISE DEFAULTS TO DARKMODE IF NONE IS SET
  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');

    if (savedMode === '') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add(savedMode || 'dark');
    }
  }, []);

  return (
    <main>
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center`
        }
      >
        <div
          className={
            `flex flex-col w-5/6 sm:w-2/4 sm:flex lg:w-4/6 xl:w-2/4 space-y-4`
          }
        >
          <Link
            className={
              `bg-green-900 text-lime-500 font-mono text-2xl lg:text-3xl text-center rounded p-4 hover:cursor-pointer transition hover:bg-green-700`
            }
            href='/new-post'
          >
            make a new post
          </Link>
          <Link
            className={
              `bg-green-900 text-lime-500 font-mono text-2xl lg:text-3xl text-center rounded p-4 hover:cursor-pointer transition hover:bg-green-700`
            }
            href='/view-posts'
          >
            view posts
          </Link>
        </div>
      </div>
    </main>
  );
}
