
//this file is for storing all the api's and its tokens stuff

const { default: axios } = require("axios")
const { headers } = require("next/headers")


const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY
const axiosClient = axios.create({
    baseURL:'https://restaurant-booking-app-strapi.onrender.com/api',
    headers:{
        'Authorization': `Bearer ${API_KEY}`
    }
})

const getCategory=()=>axiosClient.get('/sliders?populate=*');

const getRestaurantList=()=>axiosClient.get('/restaurants?populate=*');

const getRestaurantByCategory=(cuisine)=>axiosClient.get(`/restaurants?filters[cuisines][food][$in]=${cuisine}&populate=*`);

const getRestaurantBySlug=(slug)=>axiosClient.get(`/restaurants?filters[slug][$eq]=${slug}&populate=*`);

const getMenuItemsByCuisine = (query) =>axiosClient.get(`/menu-items?${query}&populate=*`);

const seatBooking = (data) =>axiosClient.post(`/seat-reservations`,data);

const getBookingInfoList = (userEmail) =>axiosClient.get(`/seat-reservations?filters[UserEmail][$eq]=${userEmail}&populate[restaurant][populate]=Image`);

const DeleteBooking = (documentId) => axiosClient.delete(`/seat-reservations/${documentId}`);

export default{
    getCategory,
    getRestaurantList,
    getRestaurantByCategory,
    getRestaurantBySlug,
    getMenuItemsByCuisine,
    seatBooking,
    getBookingInfoList,
    DeleteBooking
}