import { Button } from '@/components/ui/button'
import { Mail, MapPin, MessageCircleHeart, PhoneCall, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function RestaurantDetails({ restaurant, menuItem }) {

    // const cuisineName = cuisine.attributes?.food;
    // const itemsForCuisine= menuItem?.filter(item =>item.CuisineType===cuisine.Name);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='flex flex-col gap- border-1 border-slate-300 p-4 rounded-lg'> {/*to hold the image and details of the restaurant only  */}
                {/* restaurant image  */}
                <div>
                    <Image width={400} height={300} className='rounded-sm md:w-full h-auto' src={restaurant.Image?.url} alt='restaurant image' />
                </div>
                {/* restaurant info  */}
                <div className='flex flex-col gap-2 md:w-full  md:h-auto'>
                    <h2 className='font-bold text-2xl'>{restaurant.Name}</h2>
                    <h2 className='font-semibold text-gray-800'>{restaurant.Description}</h2>
                    <div className='flex flex-wrap gap-4'>
                        {restaurant.cuisines?.map((cuisine, index) => (
                            <h2 className='text-center text-sm  bg-blue-200 p-2 px-4 rounded-4xl text-primary-color font-semibold cursor-default' key={index}>{cuisine.food}</h2>
                        ))}
                    </div>
                    <div className='flex text-center items-center gap-6'>
                        <h2 className='flex gap-1 text-lg font-semibold text-center mt-1'>{restaurant.AverageRating}<Star className='w-6 h-6 m-0.5 fill-yellow-400 stroke-yellow-500' /></h2>
                        <div className='flex gap-1 font-semibold text-green-600'><MessageCircleHeart className='stroke-red-500' />{restaurant.NumbeOfRating} Dining Ratings</div>
                    </div>
                    {/* <h2 className='font-semibold text-gray-500'>{restaurant.Description}</h2> */}
                    <h2 className='flex gap-1 font-semibold text-gray-500 text-sm text-center mt-1'><MapPin className='w-5 h-5' />{restaurant.Address}, {restaurant.City}, {restaurant.Zip}</h2>
                    <h2 className='text-lg mt-1 text-green-600 font-semibold'><span className=' text-red-500'>Open:</span> {restaurant.OpeningTime.slice(0, 5)} to {restaurant.ClosingTime.slice(0, 5)}</h2>
                    <div className='flex flex-wrap gap-3'>
                        <h2 className='flex text-center items-center gap-0.5 text-gray-500 font-semibold'><PhoneCall className='w-4 h-4 stroke-red-500' /> +91{restaurant.Phone}</h2>
                        <h2 className='flex text-center items-center gap-0.5 text-gray-500 font-semibold'><Mail className='w-4 h-4 stroke-red-500' />{restaurant.Email}</h2>
                    </div>
                    <Button className='bg-primary-color border-1 border-primary-color hover:bg-white hover:text-primary-color'>Book Now</Button>
                </div>
            </div>
            <div className=' border-1 px-2 border-slate-200 rounded-lg overflow-y-auto max-h-190 hide-scrollbar'> {/* it will store the menu items of the restaurant*/}
                <h2 className='text-2xl text-gray-600 font-bold'>Menu</h2>
                <div>
                    {menuItem && menuItem.length > 0 ? (
                        menuItem.map((item, idx) => (
                            <div className='flex gap-2 m-2  p-4 border-1 bg-slate-200 rounded-lg' key={idx}>
                                <div>{item.Image && item.Image.length > 0 && (<Image className='rounded-lg' src={item.Image[0].url} width={250} height={200} alt='item-image' />)}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='text-2xl font-bold text-gray-800'>{item.Name}</h2>
                                    <h2 className=' text-sm  text-primary-color font-semibold'>{item.CuisineType}</h2>
                                    <h2 className='text-sm font-semibold text-gray-600'>₹{item.Price}</h2>
                                    <h2 className='text-sm text-gray-500 tracking-wider'>{item.Description}</h2>
                                </div>
                            </div>
                        ))
                    )
                        :
                        (<div>
                            No menu
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default RestaurantDetails
