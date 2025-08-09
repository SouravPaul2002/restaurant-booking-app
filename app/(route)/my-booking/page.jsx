"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'


function MyBooking() {

    const {user} = useKindeBrowserClient();
    const [bookingInfo,setbookingInfo]=useState([]);

    useEffect(()=>{
        user&&getBookingInfo();
    },[user])
    const getBookingInfo=()=>{
        GlobalApi.getBookingInfoList(user?.email).then(resp=>{
            console.log(resp.data.data)
            setbookingInfo(resp.data.data);
        })
    }

    // used to filter seat booking 
    const filterBooking=(type)=>{
        const result=bookingInfo.filter(item=>
        type=='upcoming'?new Date(item.Date) >= new Date()
        : new Date(item.Date) <= new Date()
        )
            console.log(result)
        return result;
    }

    return (
        <div className='px-4 mt-10'>
            <h2 className='font-bold text-2xl'>MyBooking</h2>
            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className='w-full p-6 justify-start border-1 border-slate-300 bg-gray-300'>
                    <TabsTrigger className='text-xl p-4' value="upcoming">upcoming</TabsTrigger>
                    <TabsTrigger className='text-xl p-4' value="previous">previous</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <BookingList bookingInfo={filterBooking('upcoming')}
                    updateRecord={()=>getBookingInfo()}
                    previous={false}/>
                </TabsContent>
                <TabsContent  value="previous">
                    <BookingList bookingInfo={filterBooking('previous')}
                     updateRecord={()=>getBookingInfo()}
                    previous={true}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default MyBooking
