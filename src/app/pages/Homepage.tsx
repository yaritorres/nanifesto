export default function Homepage({ animate, hamOpen } : { animate:boolean, hamOpen:boolean }) {
  return (
    <div
    className={
      `w-screen h-screen bg-slate-100 place-content-center place-items-center transition-all ${ hamOpen ? 'blur-lg' : '' }
      ${ animate && 'animate-fadeIn' }`
    }
  >
    <div
      className={
        `flex w-2/4 h-1/4 place-items-center`
      }
    >
      <h1 className='font-mono text-6xl text-center text-lime-400 select-none'>
        what would you like to do?
      </h1>
    </div>
  </div>
  )
}