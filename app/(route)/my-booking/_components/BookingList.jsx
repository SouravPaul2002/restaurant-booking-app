import { Button } from '@/components/ui/button'
import { CalendarClock, Users, PhoneCall, MapPin } from 'lucide-react'
import moment from 'moment/moment'
import Image from 'next/image'
import React, { useState } from 'react'
import CancelReservation from './CancelReservation'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'

function BookingList({ bookingInfo, previous, updateRecord }) {


  const OnDelete = (item) => {
    console.log(item)
    GlobalApi.DeleteBooking(item.documentId).then(resp => {
      console.log(resp)
      if (resp) {
        toast("Reservation Deleted Succesfully.")
        updateRecord()
      }
    })
  }
  return (
    <div>
      {bookingInfo && bookingInfo.map((item, index) => (
      <div className='flex flex-col sm:flex-row sm:flex-nowrap flex-wrap gap-2 sm:gap-4 p-4 m-4 items-center sm:items-start border-1 border-gray-300 rounded-lg' key={index}>
          <div>
            <Image
              src={GlobalApi.getStrapiMedia(item.restaurant.Image.url)}
              width={90}
              height={90}
              alt='restaurant-image'
              className='rounded-full w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] object-cover'
            />
          </div>

          <div className='flex flex-col gap-2 flex-1 text-center sm:text-left'>
            <div className='flex flex-col sm:flex-row sm:gap-4 gap-1'>
              <h2 className='text-xl font-bold'>{item.restaurant.Name}</h2>
              <h2 className='flex gap-1 text-gray-500 items-center justify-center sm:justify-start font-semibold'>
                <MapPin className='stroke-primary-color' /> {item.restaurant.Address}, {item.restaurant.City}
              </h2>
            </div>

            <div className='flex flex-col sm:flex-row gap-1 sm:gap-4 font-semibold text-gray-700'>
              <h2 className='flex gap-1 items-center justify-center sm:justify-start'>
                <CalendarClock className='stroke-green-600' /> {moment(item.Date).format('DD-MMM-YYYY')} {item.Time}
              </h2>
              <h2 className='flex gap-1 items-center justify-center sm:justify-start'>
                <PhoneCall className='stroke-red-500' /> {item.restaurant.Phone}
              </h2>
            </div>

            <div className='flex gap-4 font-semibold text-gray-700 justify-center sm:justify-start'>
              <h2>ID : {item.ReservationId}</h2>
              <h2 className='flex gap-1'><Users /> {item.HeadCount}</h2>
            </div>
          </div>

          <div className='mt-2 sm:mt-0'>{!previous && <CancelReservation ToCancel={() => OnDelete(item)} />}</div>
      </div>

      ))}

    </div>
  )
}

export default BookingList
