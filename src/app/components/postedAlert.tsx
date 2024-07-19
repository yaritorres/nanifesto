export default function PostedAlert({ posted, setPosted, handleRouting }:{ posted:Boolean, setPosted:Function, handleRouting:Function }) {
  return (
    <div
      className={
        `flex fixed w-screen h-screen backdrop-blur-sm items-center justify-center ${posted !== undefined ? 'animate-fadeIn' : 'hidden'}`
      }
      onAnimationEnd={ () => { setPosted(undefined); handleRouting(); } }
    >
      <div
        className={
          `flex w-1/6 h-1/6 bg-green-900 rounded text-2xl text-lime-500 items-center justify-center`
        }
      >
        posted!
      </div>
    </div>
  )
}