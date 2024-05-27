'use client'
import Link from 'next/link';

export default function HamburgerMenu({ hamOpen, setHamOpen } : { hamOpen:boolean, setHamOpen:Function }) {
  const handleHam = () => { setHamOpen(!hamOpen) };

  return (
    <div>
      <button
        onClick={handleHam}
        className={
          `fixed top-2 left-2 flex flex-col space-y-1 h-12 w-14 bg-green-900 rounded justify-center items-center
          transition hover:bg-green-700 z-40`
        }
      >
        <span
          className={
            `h-1 w-8 rounded bg-lime-400 block transition-all`
          }
        >
        </span>
        <span
          className={
            `h-1 rounded bg-lime-400 block transition-all ${ hamOpen ? 'w-6' : 'w-8' }`
          }
        >
        </span>
        <span
          className={
            `h-1 rounded bg-lime-400 block transition-all ${ hamOpen ? 'w-4' : 'w-8' }`
          }
        >
        </span>
      </button>
      <ul
        className={
          `fixed top-16 left-2 bg-lime-400 p-4 h-fit-content w-40 rounded flex flex-col justify-center items-center z-40 transition-all duration-300
          ${ hamOpen ? 'left-2 opacity-100' : '-left-1/4 opacity-0'}`
        }
      >
        <Link
          href='/home'
          className={
            `text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all ${ hamOpen ? 'opacity-100 delay-100' : 'opacity-0' }`
          }
        >
          Home
        </Link>
        <Link
          href='/new-post'
          className={`
            text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all ${ hamOpen ? 'opacity-100 delay-100' : 'opacity-0' }`
          }
        >
          New Post
        </Link>
        <Link
          href='/settings'
          className={`
            text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all ${ hamOpen ? 'opacity-100 delay-100' : 'opacity-0' }`
          }
        >
          Settings
        </Link>
      </ul>
    </div>
  );
}