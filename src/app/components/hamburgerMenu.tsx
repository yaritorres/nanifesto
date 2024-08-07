'use client'
import Link from 'next/link';
import { useState } from "react";

export default function HamburgerMenu() {
  const [hamOpen, setHamOpen] = useState(false);
  const handleHam = () => { setHamOpen(!hamOpen) };

  return (
    <>
      <button
        onClick={handleHam}
        className={
          `fixed top-2 sm:top-24 left-2 flex flex-col space-y-1 h-12 w-14 bg-green-900 rounded justify-center items-center
          transition hover:bg-green-700 z-40`
        }
      >
        <span
          className={
            `block h-1 w-8 rounded bg-lime-500 transition-all`
          }
        >
        </span>
        <div className='w-8'>
          <span
            className={
              `h-1 rounded bg-lime-500 block transition-all ${ hamOpen ? 'w-6 place-self-start' : 'w-8' }`
            }
          >
          </span>
        </div>
        <div className='w-8'>
          <span
            className={
              `h-1 rounded bg-lime-500 block transition-all ${ hamOpen ? 'w-4 place-self-start' : 'w-8' }`
            }
          >
          </span>
        </div>
      </button>
      <ul
        className={
          `fixed top-16 sm:top-40 left-2 bg-lime-500 p-4 h-fit-content w-40 rounded flex flex-col justify-center items-center z-40
          transition-all duration-300 ${ hamOpen ? 'left-2' : '-left-2/4 opacity-none'}`
        }
      >
        <Link
          onClick={handleHam}
          href='/'
          className={
            `text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all ${ hamOpen ? 'opacity-100 delay-100' : 'opacity-none' }`
          }
        >
          Home
        </Link>
        <Link
          onClick={handleHam}
          href='/new-post'
          className={`
            text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all ${ hamOpen ? 'opacity-100 delay-100' : 'opacity-none' }`
          }
        >
          New Post
        </Link>
        <Link
          onClick={handleHam}
          href='/view-posts'
          className={`
            text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all ${ hamOpen ? 'opacity-100 delay-100' : 'opacity-none' }`
          }
        >
          View Posts
        </Link>
        <Link
          onClick={handleHam}
          href='/settings'
          className={`
            text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all ${ hamOpen ? 'opacity-100 delay-100' : 'opacity-none' }`
          }
        >
          Settings
        </Link>
      </ul>
      <div
        className={
          `fixed w-screen h-screen bg-transparent inset-0 transition-all duration-300
          ${ hamOpen ? 'backdrop-blur-sm animate-fastFadeIn' : 'hidden' }`
        }
        onClick={handleHam}
      >
      </div>
    </>
  );
}