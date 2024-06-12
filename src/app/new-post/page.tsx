'use client'
import { useEffect, useState } from "react";
import HamburgerMenu from "../components/hamburgerMenu";
const axios = require('axios').default;

export default function Blog() {
  const [hamOpen, setHamOpen] = useState(false);
  const [posted, setPosted] = useState(false);

  const savePost = (title, body, date) => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {}
    };

    axios.post(options.url, {title: title, body: body, date: date}, {headers: options.headers})
    .then(response => {
      console.log('posted!');
    })
    .then(() => {
      setPosted(true);
    })
    .catch(err => {
      console.log('womp womp, no post:', err);
    })
  }

  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');

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
      <div className={`w-1/4 h-1/4 rounded fixed top-16 right-2 text-white ${posted ? 'block' : 'hidden'}`}> fuck yeah it posted </div>
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
            id='title'
            className={
              `bg-lime-400 dark:bg-green-900 rounded border-solid border-2 border-green-900 w-1/4 p-2 overflow-x-auto
              ${ hamOpen ? 'hover:cursor-default' : ''}`
            }
          >
          </input>
          <label className='font-mono text-green-900 dark:text-lime-400 select-none'> body </label>
          <textarea
            id='body'
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
            onClick={
              (e) => {
                e.preventDefault();
                let title = `${document.getElementById('title').value}`;
                let body = `${document.getElementById('body').value}`;
                let date = '2024-06-11';

                savePost(title, body, date);
              }
            }
          >
          </input>
        </form>
      </div>
    </>
  )
}