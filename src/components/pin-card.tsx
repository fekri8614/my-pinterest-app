"use client"

import { useState } from "react"
import Image from "next/image"
import { MoreHorizontal, Upload, LinkIcon, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { savePin, unsavePin } from "@/store/features/pins/pinsSlice"

interface Pin {
    id: number
    image: string
    title: string
    height: number
}

interface PinCardProps {
    pin: Pin
    onCardClick?: (pin: Pin) => void
}

export function PinCard({ pin, onCardClick }: PinCardProps) {
    const dispatch = useDispatch()
    const savedPins = useSelector((state: RootState) => state.pins.savedPins)
    const isSaved = savedPins.some(p => p.id === pin.id)
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative group cursor-pointer mb-4"
            onClick={() => onCardClick?.(pin)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden rounded-2xl bg-muted">
                <Image
                    src={pin.image}
                    alt={pin.title}
                    width={300}
                    height={pin.height}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className={cn(
                    "absolute inset-0 bg-black/40 transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0",
                )}>
                    {/* Top Actions */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            className={cn(
                                "rounded-full font-semibold transition-colors",
                                isSaved
                                    ? "bg-foreground text-background"
                                    : "bg-primary text-primary-foreground"
                            )}
                            onClick={(e) => {
                                e.stopPropagation() // prevents triggering onCardClick
                                if (isSaved) {
                                    dispatch(unsavePin(pin.id))
                                } else {
                                    dispatch(savePin(pin))
                                }
                            }}
                        >
                            {isSaved ? "Saved" : "Save"}
                        </Button>
                    </div>

                    {/* Bottom Actions */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full h-10 w-10 bg-background/90 hover:bg-background"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Upload className="h-5 w-5" />
                            </Button>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full h-10 w-10 bg-background/90 hover:bg-background"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <LinkIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="rounded-full h-10 w-10 bg-background/90 hover:bg-background"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Heart className="h-5 w-5" />
                            </Button>
                        </div>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full h-10 w-10 bg-background/90 hover:bg-background"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {isHovered && <div className="mt-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium line-clamp-2">{pin.title}</p>
            </div>}
        </div>
    )
}
