import Image from 'next/image';
import React from 'react';
import { Star } from 'lucide-react';

function RestaurantList({ restaurantList }) {
  return (
    <div className='m-10 px-10'>
      <h2 className='text-2xl font-bold'>Popular Restaurants</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {restaurantList && restaurantList.map((restaurant, index) => (
          <div key={index} className='border-[2px] border-gray-300 border-s-background rounded-3xl p-3 hover:scale-105 transition-all ease-in-out duration-400'>
            <Image src={restaurant.Image?.url} alt="restaurant" width={2000} height={200} className='h-[200px] w-full object-cover rounded-lg mt-2' />
            <div className='mt-2 items-baseline flex flex-col px-2'>
              <div className='flex gap-2'>
                <h2 className='text-center text-[15px] bg-blue-200 p-1 rounded-4xl px-2 text-primary-color font-semibold'>
                  {restaurant.cuisines.length > 1 ? (
                    <p>Multi Cuisine</p>
                  ) : (
                    <p>{restaurant.cuisines?.[0]?.food}</p>
                  )}
                </h2>
                <h2 className='flex font-semibold'>{restaurant.AverageRating}<Star className='w-5 h-5 m-0.5 fill-yellow-400 stroke-yellow-500'/></h2>
              </div>
              <h2 className='font-bold text-md'>{restaurant.Name}</h2>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default RestaurantList
