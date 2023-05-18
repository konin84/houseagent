import React from 'react'

export default function SearchInput({setQuery}) {
  return (
    <div>

      <input
          className="w-[70%] float-left border-separate rounded-xl text-black 
          border border-gray-200  py-3 px-4 mb-1 ml-2 mt-1 bg-slate-200"
          type="text"
          placeholder="Search..."
          onChange={(e)=> setQuery(e.target.value)}
        />

    </div>
  )
}
