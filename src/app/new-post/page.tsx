'use client'
import { useEffect, useState } from "react";
import HamburgerMenu from "../components/hamburgerMenu";
const axios = require('axios').default;

export default function Blog() {
  const [hamOpen, setHamOpen] = useState(false);
  const [posted, setPosted] = useState(undefined);
  const [titleExists, setTitleExists] = useState(true);
  const [bodyExists, setBodyExists] = useState(true);

  const savePost = (title, body) => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {}
    };

    axios.post(options.url, {title: title, body: body}, {headers: options.headers})
    .then(response => {
      setPosted(true);
      console.log('posted!');
    })
    .catch(err => {
      setPosted(false);
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
      <div
        className={
          `flex w-1/6 h-1/6 bg-green-900 rounded fixed top-2 right-2 text-2xl text-lime-500 items-center justify-center
          ${posted !== undefined ? 'animate-fadeInThenOut' : 'hidden'}`
        }
        onAnimationEnd={() => { setPosted(undefined)} }
      >
        {posted ? 'posted!' : 'oops, didnt post!'}
      </div>
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-items-center place-content-center
          ${ hamOpen ? 'blur-lg' : '' }`
        }
      >
        <form className='flex w-3/6 h-3/6 rounded border-green-900 dark:border-lime-500 border-solid border-4 p-5 justify-center items-start flex-col space-y-2'>
          <label className='font-mono text-green-900 dark:text-lime-500 select-none'> title </label>
          <input
            type='text'
            id='title'
            className={
              `dark:text-white bg-lime-400 dark:bg-green-900 rounded border-solid border-2 w-1/4 p-2 overflow-x-auto
              ${ hamOpen ? 'hover:cursor-default' : ''} ${ titleExists ? 'border-green-900' : 'border-red-900' }`
            }
          >
          </input>
          <label className='font-mono text-green-900 dark:text-lime-500 select-none'> body </label>
          <textarea
            id='body'
            className={
              `dark:text-white bg-lime-400 dark:bg-green-900 rounded border-solid border-2 border-green-900 w-full h-full p-2 overflow-y-auto resize-none
              ${ hamOpen ? 'hover:cursor-default' : ''}`
            }
            >
          </textarea>
          <input
            type='submit'
            value='save and post'
            className={
              `bg-green-900 text-lime-500 rounded p-2 self-end transition-all
              ${ hamOpen ? '' : 'hover:bg-green-700 hover:cursor-pointer'}`
            }
            onClick={
              (e) => {
                e.preventDefault();
                let title = `${document.getElementById('title').value}`;
                let body = `${document.getElementById('body').value}`;

                if (title && body) {
                  setTitleExists(true);
                  setBodyExists(true);
                  savePost(title, body);
                } else {
                  setTitleExists(false);
                  setBodyExists(false);
                  setPosted(false);
                }
              }
            }
          >
          </input>
        </form>
      </div>
    </>
  )
}