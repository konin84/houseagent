import React from 'react'

export default function Close(props) {
  const { openPopup, setOpenPopup } = props;
  // title, children, openPopup,

  return (
    <div>
       <button
              className="bg-black text-white active:bg-red-400 font-bold uppercase text-sm px-2 py-1  shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded-md float-right"
              type="button"
              variant="outlined"
              onClick={() => {
                setOpenPopup={setOpenPopup};
                // setRecordForEdit(null);
              }}
            >
              x
              {/* <AddIcon /> */}
            </button>
    </div>
  )
}
