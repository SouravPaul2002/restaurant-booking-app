import Image from 'next/image';
import React from 'react';
import { Star } from 'lucide-react';

function RestaurantList({ restaurantList }) {
  return (
    <div className='m-10 px-10'>
      <h2 className='text-2xl font-bold mb-5'>Popular Restaurants</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {restaurantList && restaurantList.map((restaurant, index) => (
          <div key={index} className='flex flex-wrap gap-4 border-[2px] border-gray-300 border-s-background rounded-3xl p-3 hover:scale-105 transition-all ease-in-out duration-400'>
            <Image
              src={restaurant.Image?.url}
              alt="restaurant"
              width={600}
              height={200}
              className="w-full h-[200px] object-cover rounded-lg mt-2"
            />

            <div className=' items-baseline flex flex-col gap-1 px-2'>
              <div className='flex gap-2'>
                <h2 className='text-center text-[15px] bg-blue-200 p-1 rounded-4xl px-2 text-primary-color font-semibold'>
                  {restaurant.cuisines.length > 1 ? (
                    <p>Multi Cuisine</p>
                  ) : (
                    <p>{restaurant.cuisines?.[0]?.food}</p>
                  )}
                </h2>
                <h2 className='flex font-semibold'>{restaurant.AverageRating}<Star className='w-5 h-5 m-0.5 fill-yellow-400 stroke-yellow-500' /></h2>
              </div>
              <h2 className='font-bold text-md'>{restaurant.Name}</h2>
              <h2 className='text-gray-400 font-semibold'>{restaurant.Address} , {restaurant.City}</h2>
              <h2 className='border-1 border-primary-color font-semibold text-sm p-2 px-8 rounded-full text-primary-color hover:text-white hover:bg-primary-color transition-all ease-in-out duration-400 cursor-pointer'>View Details</h2>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default RestaurantList
