import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function header() {
    const menu = [
        {
            id: 1,
            name: "Home",
            path: "/"
        },
        {
            id: 2,
            name: "Explore",
            path: "/"
        },
        {
            id: 3,
            name: "Contact Us",
            path: "/"
        },
    ]
    return (
        <div className="flex items-center justify-between p-10">
            <div className='flex items-center gap-12'>
                <Image width={120} height={60} alt='logo-image' src="/image/logo.svg"></Image>

                <ul className="md:flex gap-8 hidden">
                    {menu.map((item, index) => (
                        <Link key={item.name} href={item.path}>
                            <li className="text-lg font-bold hover:text-font-primary cursor-pointer hover:scale-105
                        transition-all ease-in-out">{item.name}</li>
                        </Link>
                    ))}
                </ul>

            </div>
            <Button className="bg-[var(--button-color)] hover:bg-white hover:text-font-primary  cursor-pointer transition-all ease-in-out duration-500 border-2 border-[var(--font-primary)] " >Get started</Button>
        </div>
    )
}

export default header
