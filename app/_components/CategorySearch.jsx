"use client"
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

import { SearchIcon } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'

function CategorySearch() {

  const [categoryList, setcategoryList] = useState([]);
  useEffect(() => {
    getCategoryList()
  }, []) //[] empty array is used to called the useEffect hook only one , not every iteration !! 

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      console.log(resp.data.data)
      setcategoryList(resp.data.data);
    })
  }

  return (<div className='items-center flex flex-col gap-2'>
    <h2 className='font-bold text-4xl tracking-wide'>
      Search <span className='text-primary-color'>Restaurants</span>
    </h2>
    <h2 className='font-semibold text-gray-400 text-xl'>Search and Book your restaurants in one click</h2>
    <div className="flex w-full max-w-sm items-center gap-2 m-4">
      <Input className="border-gray-500" type="text" placeholder="Search restaurants..." />
      <Button className=" bg-[var(--primary-color)] text-white border-1 border-primary-color hover:text-primary-color duration-500 cursor-pointer" type="submit" variant="outline"><SearchIcon />Search
      </Button>
    </div>

    <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 m-5 '>
      {/* display cuisines list  */}
      {categoryList.map((item, index) =>index<6&&(
        <Link href={`/search/${item.food}`} key={index} className='flex flex-col items-center text-center p-5 bg-[var(--background-primary-color)] m-2 rounded-md hover:scale-105 transition-all ease-in-out cursor-pointer'>
          <div className=''><Image src={item.image?.url} alt='cuisine iamge' width={150} height={100} className='rounded-md'/></div>
          <label className='text-center mt-2 text-sm font-medium'>{item.food}</label>
        </Link>
      ))}
    </div>
  </div>

  )
}

export default CategorySearch
