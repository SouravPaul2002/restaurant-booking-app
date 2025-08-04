"use client";
import RestaurantList from '@/app/_components/RestaurantList';
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState, use } from 'react';

function SearchPage({ params }) {
  const { cname } = use(params); // unwrap the async params
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = () => {
    GlobalApi.getRestaurantByCategory(cname).then(resp => {
      console.log(resp.data.data);
      setRestaurantList(resp.data.data);
    });
  };

  return (
    <div >
      <RestaurantList heading={cname}
      restaurantList={restaurantList}
      />
    </div>
  );
}

export default SearchPage;
