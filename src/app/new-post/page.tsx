'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostedAlert from "../components/postedAlert";
const axios = require('axios').default;

export default function Blog() {
  const [posted, setPosted] = useState(undefined);
  const [titleExists, setTitleExists] = useState(true);
  const [bodyExists, setBodyExists] = useState(true);
  const router = useRouter();
  const handleRouting = () => {
    router.push('/view-posts');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let title = `${document.getElementById('title').value}`;
    let body = `${document.getElementById('body').value}`;

    if (title && body) {
      setTitleExists(true);
      setBodyExists(true);
      savePost(title, body);
    } else if (!title && body) {
      setTitleExists(false);
      setBodyExists(true);
      setPosted(false);
    } else if (title && !body) {
      setTitleExists(true);
      setBodyExists(false);
      setPosted(false);
    }
  }

  const savePost = (title, body) => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {}
    };

    axios.post(options.url, {title: title, body: body}, {headers: options.headers})
    .then(() => {
      setPosted(true);
      console.log('posted!');
    })
    .catch(err => {
      setPosted(false);
      console.log('womp womp, no post:', err);
    })
  }

  // SETS CURRENT THEME (LIGHT OR DARK) ON PAGE USING LOCAL STORAGE,
  // OTHERWISE DEFAULTS TO DARKMODE IF NONE IS SET
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
      <PostedAlert posted={posted} setPosted={setPosted} handleRouting={handleRouting} />
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-items-center place-content-center`
        }
      >
        <form
          className={
            `flex w-5/6 sm:w-3/6 md:w-4/6 lg:w-4/6 xl:w-3/6 h-3/6 rounded border-green-900 dark:border-lime-500 border-solid border-4 p-5 justify-center items-start flex-col space-y-2`
          }
          onSubmit={handleSubmit}
        >
          <label className='font-mono text-green-900 dark:text-lime-500 select-none'> title </label>
          <input
            type='text'
            id='title'
            className={
              `dark:text-white bg-lime-400 dark:bg-green-900 rounded border-solid border-2 w-full sm:w-2/4 p-2 overflow-x-auto
              ${ titleExists ? 'border-green-900' : 'border-red-900' }`
            }
          >
          </input>
          <label className='font-mono text-green-900 dark:text-lime-500 select-none'> body </label>
          <textarea
            id='body'
            className={
              `dark:text-white bg-lime-400 dark:bg-green-900 rounded border-solid border-2 border-green-900 w-full h-full p-2 overflow-y-auto resize-none
              ${ bodyExists ? 'border-green-900' : 'border-red-900' }`
            }
            >
          </textarea>
          <input
            type='submit'
            value='save and post'
            className={
              `bg-green-900 text-lime-500 rounded p-2 self-end transition-all hover:bg-green-700 hover:cursor-pointer`
            }
          >
          </input>
        </form>
      </div>
    </>
  )
}