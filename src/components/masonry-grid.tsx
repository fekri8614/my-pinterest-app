"use client"

import { useState } from "react"
import { PinCard } from "@/components/pin-card"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { setSelectedPin } from "@/store/features/pins/pinsSlice"


const SAMPLE_PINS = [
  {
    id: 1,
    image: "/modern-living-room.jpg",
    title: "Modern Living Room Ideas",
    height: 400,
  },
  {
    id: 2,
    image: "/healthy-breakfast-bowl-recipe.jpg",
    title: "Healthy Breakfast Bowl",
    height: 500,
  },
  {
    id: 3,
    image: "/minimalist-bedroom-design.jpg",
    title: "Minimalist Bedroom",
    height: 350,
  },
  {
    id: 4,
    image: "/outdoor-garden-landscaping.jpg",
    title: "Garden Landscaping Ideas",
    height: 450,
  },
  {
    id: 5,
    image: "/street-wear-fashion-women.jpg",
    title: "Fall outfits...",
    height: 460,
  },
  {
    id: 12,
    image: "/pet-dog-photography.jpg",
    title: "Pet Photography",
    height: 460,
  },
  // {
  //   id: 5,
  //   image: "/street-style-outfit.jpg",
  //   title: "Street Style Fashion",
  //   height: 380,
  // },
  {
    id: 6,
    image: "/chocolate-cake-dessert.jpg",
    title: "Chocolate Cake Recipe",
    height: 520,
  },
  {
    id: 7,
    image: "/home-office-workspace.jpg",
    title: "Home Office Setup",
    height: 420,
  },
  {
    id: 8,
    image: "/yoga-meditation-wellness.jpg",
    title: "Yoga & Wellness",
    height: 360,
  },
  {
    id: 9,
    image: "/tropical-beach-getaway.jpg",
    title: "Beach Destinations",
    height: 480,
  },
  {
    id: 11,
    image: "/wedding-decoration-flowers.jpg",
    title: "Wedding Decorations",
    height: 390,
  },
  {
    id: 10,
    image: "/diy-craft-projects.jpg",
    title: "DIY Craft Ideas",
    height: 410,
  },
  {
    id: 13,
    image: "/abstract-art.jpg",
    title: "Abstract Art",
    height: 440,
  },
  {
    id: 18,
    image: "/sydney-sweeney.jpg",
    title: "Sydney Sweeney - street style",
    height: 520,
  },
  {
    id: 14,
    image: "/coffee-latte-art.jpg",
    title: "Latte Art",
    height: 370,
  },
  {
    id: 16,
    image: "/nail-art-design.jpg",
    title: "Nail Art Designs",
    height: 430,
  },
  {
    id: 17,
    image: "/snow-street.jpg",
    title: "Snow in the street",
    height: 370,
  },
  {
    id: 19,
    image: "/fall-street-outfit.jpg",
    title: "Fall outfits...",
    height: 460,
  },
  {
    id: 15,
    image: "/architecture-modern-building.jpg",
    title: "Modern Architecture",
    height: 540,
  },
]

export function MasonryGrid() {
  const dispatch = useDispatch()
  const selectedPin = useSelector((state: RootState) => state.pins.selectedPin)

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4">
        {SAMPLE_PINS.map((pin) => (
          <div key={pin.id} className="break-inside-avoid">
            <PinCard pin={pin} onCardClick={() => dispatch(setSelectedPin(pin))} />
          </div>
        ))}
      </div>
      {selectedPin && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center backdrop-blur-sm"
          onClick={() => dispatch(setSelectedPin(null))}
        >
          <div className="relative max-w-2xl w-full px-28" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedPin.image}
              alt={selectedPin.title}
              width={1000}
              height={1000}
              className="w-full h-auto rounded-2xl shadow-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
