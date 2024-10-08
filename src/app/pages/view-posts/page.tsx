'use client'
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../../components/deleteConfirmationModal";
const axios = require('axios').default;

export default function ViewPosts() {
  const [posts, setPosts] = useState([]);
  const [deletedItem, setDeletedItem] = useState(0);
  const [adminStatus, setAdminStatus] = useState();

  const handleDelete = ( id:number ) => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {}
    };

    document.getElementById(id)?.classList.add('animate-fadeOut');

    axios.put(options.url, {id: id}, {headers: options.headers})
    .then(() => {
      console.log('Deleted!');
    })
    .catch(err => console.log(err))
  };

  useEffect(() => {
    const options = {
      url: 'http://localhost:3000/find-user',
      headers: {
        "Authorization": `Bearer ${window.localStorage.accessToken}`
      }
    };

    async function findUser () {
      try {
        let result;

        result = await axios.get(options.url, {headers: options.headers});

        setAdminStatus(result.data.admin);
      }
      catch (err) {
        console.log(err);
      }
    };

    findUser()
  }, [])

  // GRABS CURRENT POSTS FOUND IN DATABASE AND CUTS OFF PART OF THE DATE THAT
  // IS BEING ADDED ON BY THE DATABASE FOR SOME REASON (IT ADDS TIME POSTED BUT DEFAULTS TO 00:00:00)
  useEffect(() => {
    const options = {
      url: 'http://localhost:3000/posts',
      headers: {
        "Authorization": `Bearer ${window.localStorage.accessToken}`
      }
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
      document.documentElement.classList.add(savedMode || 'dark');
    }
  });

  return (
    <>
      <DeleteConfirmationModal
        handleDelete={handleDelete} deletedItem={deletedItem} setDeletedItem={setDeletedItem}
      />
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center
          transition-all`
        }
      >
        <ul
          className={
            `relative top-6 sm:top-12 flex flex-col w-5/6 h-5/6 sm:h-4/6 xl:h-3/4 overflow-y-auto space-y-6 pr-4`
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
            <div
              className={`flex flex-col rounded-t w-full h-content font-mono text-lime-500 text-2xl bg-lime-700 p-4 select-none`}
            >
              <label className={`font-mono text-lime-500 text-2xl select-none`}>
                {post.title}
              </label>
              <button
                data-key={post.id}
                onClick={
                  e => {
                    const target = e.target as HTMLButtonElement;
                    setDeletedItem(target.getAttribute('data-key'));
                  }
                }
                className={`flex h-fit text-lime-800 hover:cursor-pointer transition hover:text-slate-100 place-self-end
                  ${adminStatus ? '' : 'hidden'}`}
              >
                delete
              </button>
            </div>
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