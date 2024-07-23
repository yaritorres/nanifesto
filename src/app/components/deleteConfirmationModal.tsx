export default function DeleteConfirmationModal(
  { handleDelete, deletedItem, setDeletedItem }:{ handleDelete:Function, deletedItem:Number, setDeletedItem:Function }) {
  return (
    <div
      className={
        `fixed w-screen h-screen backdrop-blur-sm items-center justify-center z-50
        transition all ${ deletedItem ? 'flex' : 'hidden' }`
      }
      onClick={() => { setDeletedItem(0); }}
    >
      <div
        className={
          `flex flex-col w-5/6 sm:w-4/6 md:w-3/6 h-2/6 bg-slate-900 rounded text-2xl text-lime-500 items-center justify-center font-mono space-y-4`
        }
      >
        <span className={`text-3xl`}> are you sure? </span>
        <button
          onClick={() => { setDeletedItem(0); }}
          className={
            `w-1/3 font-mono p-2 text-center text-lime-500 rounded border-lime-500 border-solid border-2 select-none
            transition-all hover:bg-lime-500 hover:text-slate-900`
          }
        >
          cancel
        </button>
        <button
          onClick={ () => { handleDelete(deletedItem); setDeletedItem(0); } }
          className={
            `w-1/3 font-mono p-2 text-center text-lime-500 rounded border-lime-500 border-solid border-2 select-none
            transition-all hover:bg-lime-500 hover:text-slate-900`
          }
        >
          delete
        </button>
      </div>
    </div>
  )
}