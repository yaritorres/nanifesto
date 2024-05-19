export default function Blog() {
  return (
    <div className='flex w-screen h-screen bg-slate-100 place-items-center place-content-center'>
      <form className='flex w-3/4 h-3/4 border-green-900 border-solid border-4 justify-center items-center flex-col space-y-4'>
        <input type='text' className='bg-lime-400 w-1/4'>
        </input>
        <input type='text' className='bg-lime-400 w-3/4 h-2/4'>
        </input>
      </form>
    </div>
  )
}