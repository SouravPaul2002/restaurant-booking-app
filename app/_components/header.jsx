"use client"
import { Button } from '@/components/ui/button'
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function Header() {
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
    const { user } = useKindeBrowserClient();
    useEffect(() => {
        console.log(user);
    }, [user])
    return (
        <div className="flex items-center justify-between p-10">
            <div className='flex items-center gap-12'>
                <Link href="/"><Image width={160} height={120} alt='logo-image' src="/image/logo.jpg"></Image></Link>

                <ul className="md:flex gap-8 hidden">
                    {menu.map((item, index) => (
                        <Link key={item.name} href={item.path}>
                            <li className="text-lg font-bold hover:text-primary-color cursor-pointer hover:scale-105
                        transition-all ease-in-out">{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            {user ?
                // <LogoutLink><Button variant="outline">Log out</Button></LogoutLink>
                <Popover >
                    <PopoverTrigger className='cursor-pointer hover:scale-105'><Image src={user?.picture} alt='profile-picture' width={50} height={50} className='rounded-full' /></PopoverTrigger>
                    <PopoverContent >
                        <ul className='flex flex-col gap-1'>
                            <li><Button className='text-lg font-semibold cursor-pointer' variant="ghost">Profile</Button></li>
                            <li><Button className='text-lg font-semibold cursor-pointer' variant="ghost">My Booking</Button></li>
                            <li><LogoutLink><Button className='text-lg font-semibold cursor-pointer' variant="ghost">Log out</Button></LogoutLink></li>
                        </ul>
                    </PopoverContent>
                </Popover>
                :
                <LoginLink><Button className="bg-[var(--primary-color)] hover:bg-white hover:text-primary-color  cursor-pointer transition-all ease-in-out duration-500 border-1 border-[var(--primary-color)] " >Get started</Button></LoginLink>
            }
        </div>
    )
}

export default Header
