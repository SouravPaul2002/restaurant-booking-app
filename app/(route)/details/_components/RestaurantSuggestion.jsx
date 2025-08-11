import Image from 'next/image';
import React from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';
import GlobalApi from '@/app/_utils/GlobalApi';

function RestaurantList({ restaurantList, heading = "Suggestions" }) {
    return (
        <div className='flex flex-col m-4 lg:float-right'>
            <h2 className='text-xl font-bold mb-5 text-gray-600'>{heading}</h2>
            <div className=' overflow-y-auto max-h-150 hide-scrollbar flex flex-col gap-4 '>
                {restaurantList && restaurantList.map((restaurant, index) => (
                    <Link key={index} href={`/details/${restaurant.slug}`}>
                        <div className='flex gap-2  rounded-lg p-4 px-10 hover:bg-slate-300 transition-all ease-in-out duration-200'>
                            <div>
                                <Image
                                    src={GlobalApi.getStrapiMedia(restaurant.Image?.url)}
                                    alt="restaurant"
                                    width={60}
                                    height={60}
                                    className="w-[60px] h-[60px] object-cover rounded-full"
                                />
                            </div>
                            <div className=''>
                                <h2 className='text-gray-500 font-semibold text-lg'>{restaurant.Name}</h2>
                                <div className='flex gap-2'>
                                    <h2 className='flex text-sm items-center text-gray-600 font-semibold'>{restaurant.AverageRating}<Star className='w-5 h-5 m-0.5 fill-yellow-400 stroke-yellow-500' /></h2>
                                    <h2 className='text-sm font-semibold text-primary-color'>
                                        {restaurant.cuisines.length > 1 ? (
                                            <p>Multi Cuisine</p>
                                        ) : (
                                            <p>{restaurant.cuisines?.[0]?.food}</p>
                                        )}
                                    </h2> 
                                </div>

                            </div>
                        </div>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RestaurantList
