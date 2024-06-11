'use client'
import { useEffect, useState } from "react";
import HamburgerMenu from "../components/hamburgerMenu";
const axios = require('axios').default;

export default function ViewPosts() {
  const [hamOpen, setHamOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {}
    };

    const retrievePosts = () => {
      return axios.get(options.url, {headers: options.headers})
      .then(database => {
        setPosts(database.data);
        return database.data;
      })
      .then(fetchedPosts => {
        console.log('fetched:', fetchedPosts);
        console.log('posts:', posts);
        // setPosts(fetchedPosts);
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
          `fixed flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center
          transition-all ${ hamOpen ? 'blur-lg' : '' }`
        }
      >
        <ul
          className={
            `flex flex-col border-green-900 border-solid border-4 rounded-lg w-5/6 h-5/6 place-items-center place-content-center          overflow-y-auto space-y-2 p-8`
          }
        >
        {posts.map((post, postId) =>
          <li
            key={postId}
            className={
              `rounded bg-lime-500 w-full h-auto space-y-4`
            }
          >
            <label className={`rounded w-full h-auto font-mono text-3xl bg-lime-700 p-2`}> {post.title} </label>
            <p className={`w-full h-auto p-2 font-mono text-xl`}> {post.body} </p>
            <span className={`w-full h-auto p-2 font-mono text-lg text-lime-300`}> posted: {post.date_posted} </span>
          </li>
        )}
        </ul>
      </div>
    </>
  )
}