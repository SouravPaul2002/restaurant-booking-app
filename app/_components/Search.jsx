import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from 'lucide-react'

function Search() {
  return (<div className='items-center flex flex-col gap-2'>
    <h2 className='font-bold text-4xl tracking-wide'>
      Search <span className='text-primary-color'>Restaurants</span>
    </h2>
    <h2 className='font-semibold text-gray-400 text-xl'>Search and Book your restaurants in one click</h2>
    <div className="flex w-full max-w-sm items-center gap-2 m-4">
      <Input className="border-gray-500" type="text" placeholder="Search restaurants..." />
      <Button className=" bg-[var(--primary-color)] text-white border-1 border-primary-color hover:text-primary-color duration-500" type="submit" variant="outline"><SearchIcon/>Search
      </Button>
    </div>
  </div>

  )
}

export default Search
