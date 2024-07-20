'use client'
import { useEffect, useState } from "react";
const axios = require('axios').default;

export default function ViewPosts() {
  const [posts, setPosts] = useState([]);

  const handleDelete = (id: Number) => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {}
    };

    document.getElementById(id)?.classList.add('animate-fadeOut')

    axios.put(options.url, {id: id}, {headers: options.headers})
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err))
  }

  // GRABS CURRENT POSTS FOUND IN DATABASE AND CUTS OFF PART OF THE DATE THAT
  // IS BEING ADDED ON BY THE DATABASE FOR SOME REASON (IT ADDS TIME POSTED BUT DEFAULTS TO 00:00:00)
  useEffect(() => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {}
    };

    const cleanDate = (posts) => {
      for (let i = 0; i < posts.length; i++) {
        posts[i].date_posted = posts[i].date_posted.split('').splice(0, 10).join('');
      }

      return posts;
    }

    const retrievePosts = () => {
      return axios.get(options.url, {headers: options.headers})
      .then(database => {
        const adjustedData = cleanDate(database.data);
        setPosts(adjustedData.reverse());
      })
      .catch(err => console.log('API ERROR:', err))
    }

    retrievePosts();
  }, [JSON.stringify(posts)])

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
  });

  return (
    <>
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center
          transition-all`
        }
      >
        <ul
          className={
            `flex flex-col border-green-900 border-solid border-4 rounded-lg w-5/6 h-4/6 overflow-y-auto space-y-6 p-8`
          }
        >
        {posts.map((post, postKey) =>
          <li
            key={postKey}
            id={post.id}
            className={
              `rounded bg-lime-500 w-full h-fit-content`
            }
          >
            <label
              className={
                `relative flex rounded-t w-full h-auto font-mono text-lime-500 text-2xl bg-lime-700 p-4 select-none`
              }
            >
              {post.title}
              <button
                data-key={post.id}
                onClick={
                  e => {
                    const target = e.target as HTMLButtonElement;
                    handleDelete(target.getAttribute('data-key'));
                  }
                }
                className={`absolute right-4 flex h-fit text-white hover:cursor-pointer border-red-900 border-solid border-2`}
              >
                delete
              </button>
            </label>
            <div className={`border-solid border-slate-100 dark:border-slate-900 border-2 w-full mb-2`}></div>
            <p className={`w-full h-auto p-4 font-mono text-slate-900 text-xl select-none`}> {post.body} </p>
            <span
              className={
                `block w-fit h-auto font-mono text-lg text-lime-300 select-none m-4 mt-0`
              }
            >
              posted: {post.date_posted}
            </span>
          </li>
        )}
        </ul>
      </div>
    </>
  )
}