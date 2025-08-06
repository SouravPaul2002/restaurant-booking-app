
//this file is for storing all the api's and its tokens stuff

const { default: axios } = require("axios")
const { headers } = require("next/headers")


const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY
const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api',
    headers:{
        'Authorization': `Bearer ${API_KEY}`
    }
})

const getCategory=()=>axiosClient.get('/sliders?populate=*');

const getRestaurantList=()=>axiosClient.get('/restaurants?populate=*');

const getRestaurantByCategory=(cuisine)=>axiosClient.get(`/restaurants?filters[cuisines][food][$in]=${cuisine}&populate=*`);

const getRestaurantBySlug=(slug)=>axiosClient.get(`/restaurants?filters[slug][$eq]=${slug}&populate=*`);

const getMenuItemsByCuisine = (query) =>axiosClient.get(`/menu-items?${query}&populate=*`);

export default{
    getCategory,
    getRestaurantList,
    getRestaurantByCategory,
    getRestaurantBySlug,
    getMenuItemsByCuisine
}