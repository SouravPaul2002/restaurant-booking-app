"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function CategoryList() {
    const cuisinePath =usePathname();
    const cuisine= cuisinePath.split('/')[2];
    
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
    return (
        <div className='h-screen mt-5 flex flex-col font-semibold'>
            <Command className="rounded-lg border shadow-md ">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList className="overflow-visible">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Cuisines">
                        {categoryList && categoryList.map((item, index) => (
                            <CommandItem key={index}>
                                <Link href={'/search/'+item.food} className={`p-2 pr-14 pl-4 rounded-sm hover:scale-105 duration-500 hover:text-black ${cuisine==item.food&&'bg-blue-200'}`}>
                                    <label className="cursor-pointer">{item.food}</label>
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}

export default CategoryList
