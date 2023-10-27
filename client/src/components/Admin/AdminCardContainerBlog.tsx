import React from 'react'
import { RiFileSearchLine } from 'react-icons/ri'

function AdminCardContainerBlog() {
  return (
    <div className="bg-moonstoneD-200 rounded-2xl pb-5 h-[600px] flex flex-col">
    <h2 className="text-moonstone-200 bg-pennBlueD-100 px-3 py-2 rounded-t-2xl">
      بلاگ
    </h2>
    <form>
      <span className="flex items-center bg-white mx-3 my-2">
        <RiFileSearchLine size={30} />
        <input type="text" className="w-full h-full bg-inherit" />
      </span>
    </form>
  </div>
)
}

export default AdminCardContainerBlog
