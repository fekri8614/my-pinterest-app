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
            className="relative group cursor-pointer break-inside-avoid mb-4 transition-all duration-300 hover:translate-y-[-2px]"
            onClick={() => onCardClick?.(pin)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden rounded-2xl bg-muted shadow-sm hover:shadow-lg transition-all duration-300">
                <Image
                    src={pin.image}
                    alt={pin.title}
                    width={300}
                    height={pin.height}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />

                {/* Overlay */}
                <div
                    className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    )}
                >
                    {/* Save button */}
                    <div className="absolute top-3 right-3">
                        <Button
                            size="sm"
                            variant="secondary"
                            className={cn(
                                "rounded-full font-semibold shadow-sm",
                                isSaved
                                    ? "bg-foreground text-background"
                                    : "bg-primary text-primary-foreground"
                            )}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (isSaved) dispatch(unsavePin(pin.id))
                                else dispatch(savePin(pin))
                            }}
                        >
                            {isSaved ? "Saved" : "Save"}
                        </Button>
                    </div>

                    {/* Bottom actions */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {[Upload, LinkIcon, Heart].map((Icon, idx) => (
                                <Button
                                    key={idx}
                                    size="icon"
                                    variant="secondary"
                                    className="rounded-full h-9 w-9 bg-background/90 hover:bg-background shadow-sm"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Icon className="h-4 w-4" />
                                </Button>
                            ))}
                        </div>

                        <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full h-9 w-9 bg-background/90 hover:bg-background shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Title */}
            <p className="mt-2 text-sm font-medium leading-tight text-foreground/90 px-1">
                {pin.title}
            </p>
        </div>
    )
}
