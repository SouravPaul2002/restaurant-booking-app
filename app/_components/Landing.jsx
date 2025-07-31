import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

function Landing() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <div className="text-2xl font-bold text-gray-900 sm:text-4xl">
                Explore top <span className="text-[var(--primary-color)]">restaurants </span>
                & book <p> your Every   <span className="text-[var(--primary-color)]">seat</span> in seconds</p>
              </div>
              <p className="mt-4 text-black-700">
                Whether you're planning a cozy dinner or a big celebration, the perfect seat is just a search away.
                No stress, no hassle — just smooth, instant booking.
                Browse top-rated restaurants and explore by cuisine or vibe.
                Craving something special? We’ll help you find it, fast.
                Your next great meal is only a click away.
              </p>
              <div className="mt-4 flex">
                <Button className="bg-[var(--primary-color)] px-10 py-6 sm:text-1xl hover:bg-[var(--hover-primary-color)]">Explore Now</Button>
              </div>
            </div>
          </div>
          <div>
            <Image
              width={800} height={800}
              src="/image/restaurant.avif"
              className="object-cover rounded-3xl"
              alt="restaurant logo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
