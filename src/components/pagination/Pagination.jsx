import React from 'react'
import Button from '../controls/Button';

export default function Pagination({totalHouses, housesPerPage, setCurrentPage,
  currentPage,}) {


const pages = [];


for (let i = 1; i <= Math.ceil(totalHouses / housesPerPage); i++) {
  pages.push(i)
}
  return (
    <div > 
      {
        pages.map((page, index) => { return (
          <button 
              size={10}
              key={index}
              onClick={() => setCurrentPage(page)}
              className={page == currentPage ? "active rounded-full bg-green-700 p-1 m-2" : " rounded-full p-1 m-2" }>
              {page}
          </button>
      );
        })
      }
    </div>
  )
}

