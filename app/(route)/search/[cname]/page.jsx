"use client"
import React, { useEffect } from 'react'

function search({params}) {
  useEffect(()=>{
    console.log(params);
  },[])
  return (
    <div>
      Search
    </div>
  )
}

export default search
