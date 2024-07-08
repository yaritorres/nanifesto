'use client'
import { useEffect, useState } from "react";
import HamburgerMenu from "../components/hamburgerMenu";
const axios = require('axios').default;

export default function ViewPosts() {
  const [hamOpen, setHamOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [deleted, setDeleted] = useState(0);

  const handleDelete = (id: Number) => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {}
    };

    axios.put(options.url, {id: id}, {headers: options.headers})
    .then(response => {
      setDeleted(id);
      console.log(response);
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {}
    };

    const parseDate = (posts) => {
      const cleanDate = (string:string) => {
        return string.split('').splice(0, 10).join('');
      }

      for (let i = 0; i < posts.length; i++) {
        console.log('array item:', posts[i]);
        if (posts[i].date_posted) {
          posts[i].date_posted = cleanDate(posts[i].date_posted);
        }
      }

      return posts;
    }

    const retrievePosts = () => {
      return axios.get(options.url, {headers: options.headers})
      .then(database => {
        const adjustedData = parseDate(database.data);
        setPosts(adjustedData.reverse());
      })
      .catch(err => console.log('API ERROR:', err))
    }

    retrievePosts();
  }, [JSON.stringify(posts)])


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
      <HamburgerMenu hamOpen={hamOpen} setHamOpen={setHamOpen} />
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center
          transition-all ${ hamOpen ? 'blur-lg' : '' }`
        }
      >
        <ul
          className={
            `flex flex-col border-green-900 border-solid border-4 rounded-lg w-5/6 h-5/6 overflow-y-auto space-y-6 p-8`
          }
        >
        {posts.map((post, postKey) =>
          <li
            key={postKey}
            data-key={post.id}
            id={post.id}
            className={
              `rounded bg-lime-500 w-full h-fit-content
              ${ deleted === document.getElementById(deleted)?.getAttribute('data-key') ? 'animate-fadeOut' : '' }`
            }
          >
            <label
              className={
                `block rounded-t w-full h-auto font-mono text-lime-500 text-2xl bg-lime-700 p-4 select-none`
              }
            >
              {post.title}
              <button
                data-key={post.id}
                onClick={
                  e => {
                    const target = e.target as HTMLButtonElement;
                    console.log('HERE IS THE KEY:', target.getAttribute('data-key'));
                    handleDelete(target.getAttribute('data-key'));
                  }
                }
                className={`w-auto h-auto text-white justify-self-end`}
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