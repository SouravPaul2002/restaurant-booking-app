"use client"
import { Button } from "@/components/ui/button";
import Search from "./_components/CategorySearch";
import Landing from "./_components/Landing";
import RestaurantList from "./_components/RestaurantList";
import GlobalApi from "./_utils/GlobalAPI";
import { useEffect, useState } from "react";
export default function Home() {

  const [restaurantList,setRestaurantList]=useState([]);
  useEffect(()=>{
    getRestaurantList();
  },[])
  const getRestaurantList=()=>{
    GlobalApi.getRestaurantList().then(resp=>{
      console.log(resp.data.data);
      setRestaurantList(resp.data.data);
    })
  }

  return (
  <div>
    {/* landing section */}
    <Landing/>

    {/* search for the types of restaurant  */}
    <Search/>

    {/* List of the restaurants  */}
    <RestaurantList restaurantList={restaurantList}/>
  </div>
  );
}
