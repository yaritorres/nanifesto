'use client'
import Link from 'next/link';

export default function Welcome() {
  return (
    <div
      className={
        `fixed flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center transition-all z-30`
      }
    >
      <div
        className={
          `flex border-green-900 border-solid border-4 rounded-lg w-2/4 h-1/4 place-items-center
          transition hover:bg-green-900 hover:cursor-pointer`
        }
      >
        <Link
          href='/home'
          className={
            `font-mono text-6xl text-center text-lime-400 select-none`
          }
        >
          welcome to nanifesto.
        </Link>
      </div>
    </div>
  )
}