// layoout is reserved keyword in next , it is used to design . maybe its like indexedDB.html type 
import React from 'react'
import CategoryList from './_components/CategoryList'

function layout({children}) {
  return (
    <div className='grid grid-cols-4'>
      <div className=" md:block">
        {/* restaurant name  */}
        <CategoryList/>
      </div>
      <div className='col-span-4 md:col-span-3'>
        {/* menu itemsdisplay here  */}
      {children}
      </div>
    </div>
  )
}

export default layout
