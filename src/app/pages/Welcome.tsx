'use client'
import '../styles/Welcome.css';

export default function Welcome({ animate, setAnimate, hamOpen } : { animate:boolean, setAnimate:Function, hamOpen:boolean }) {
  return (
    <div
      className={
        `fixed flex w-screen h-screen bg-slate-100 place-content-center place-items-center transition-all z-30
        ${ hamOpen ? 'blur-lg' : '' }
        ${ animate && 'animate-fadeOut' }`
      }
    >
      <div
        className={
          `flex border-green-900 border-solid border-4 rounded-lg w-2/4 h-1/4 place-items-center
          transition-all ${ hamOpen ? '' : 'hover:bg-green-900 hover:cursor-pointer' }`
        }
        onClick={ () => setAnimate(true) }
      >
        <h1 className='font-mono text-6xl text-center text-lime-400 select-none'>
          welcome to nanifesto.
        </h1>
      </div>
    </div>
  )
}