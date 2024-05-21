'use client'
import { useState } from "react";
import HamburgerMenu from "../components/hamburgerMenu";

export default function Blog() {
  const [hamOpen, setHamOpen] = useState(false);

  return (
    <>
      <HamburgerMenu hamOpen={hamOpen} setHamOpen={setHamOpen} />
      <div className='flex w-screen h-screen bg-slate-100 place-items-center place-content-center'>
        <form className='flex w-3/6 h-3/6 rounded border-green-900 border-solid border-4 p-5 justify-center items-start flex-col space-y-2'>
          <label className='font-mono text-green-900'> title </label>
          <input type='text' className='bg-lime-400 rounded border-solid border-2 border-green-900 w-1/4'>
          </input>
          <label className='font-mono text-green-900'> body </label>
          <textarea className='bg-lime-400 rounded border-solid border-2 border-green-900 w-full h-full p-2 overflow-y-auto resize-none'>
          </textarea>
        </form>
      </div>
    </>
  )
}