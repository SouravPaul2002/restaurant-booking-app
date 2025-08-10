"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import RestaurantDetails from '../_components/RestaurantDetails';
import RestaurantSuggestion from '../_components/RestaurantSuggestion';

function Details({ params }) {

  const recordId = params.recordId;
  

  const [restaurant, setrestaurant] = useState(); // to save the fetched restaurant details from url
  const [menuItem, setmenuItem] = useState();
  const [restaurantList, setrestaurantList] = useState();

  useEffect(() => {
    getRestaurantOneBySlug(),
    getAllRestaurantDetails()
  }, [])

  const getRestaurantOneBySlug = () => {
    GlobalApi.getRestaurantBySlug(recordId).then(resp => {
      const fetchedRestaurant = resp.data.data[0];
      setrestaurant(fetchedRestaurant); // after saving , its showing as a Array[] in the console otherwise its showing it as a id{} 

      const cuisines = fetchedRestaurant?.cuisines?.map(c => c.food);

      if (cuisines && cuisines.length > 0) {
        getMenuItemsByCuisine(cuisines);
      }
    })
  }

  const getMenuItemsByCuisine = (cuisineArray) => {
    const query = cuisineArray.map(c => `filters[CuisineType][$in]=${encodeURIComponent(c)}`).join('&');
    GlobalApi.getMenuItemsByCuisine(query).then(resp => {
      console.log(resp.data.data);
      setmenuItem(resp.data.data);
    });
  }

  const getAllRestaurantDetails= ()=>{
    GlobalApi.getRestaurantList().then(resp =>{
      console.log(resp.data.data);
      setrestaurantList(resp.data.data);
    })
  }


  return (
    <div className='p-2 md:px-1'>
      <h2 className='font-bold text-3xl mb-6'>Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4'>
        {/* Restaurant details  */}
        <div>{restaurant && <RestaurantDetails restaurant={restaurant} menuItem={menuItem} />}</div>
        {/* Restaurant suggestions  */}
        <div >
          {restaurantList && <RestaurantSuggestion restaurantList={restaurantList} />}
        </div>
      </div>
    </div>
  )
}

export default Details
