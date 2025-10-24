"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Grid3x3, LayoutGrid } from "lucide-react"
import { PinCard } from "@/components/pin-card"
import { setSelectedPin } from "@/store/features/pins/pinsSlice"
import { RootState } from "@/store/store"
import { PinterestHeader } from "@/components/pinterest-header"

export default function SavedPage() {
    const dispatch = useDispatch()
    const pins = useSelector((state: RootState) => state.pins.savedPins)

    const selectedPin = useSelector((state: RootState) => state.pins.selectedPin)
    const [selectedBoard, setSelectedBoard] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    // mock data — replace with your actual Redux data
    const boards = [
        { id: 1, name: "Aesthetic", count: 24 },
        { id: 2, name: "Travel", count: 13 },
        { id: 3, name: "Tech UI", count: 17 },
    ]

    const filteredPins = pins.filter((pin: any) => {
        const matchesBoard =
            selectedBoard === "all" || pin.boardId === selectedBoard
        const matchesSearch = pin.title
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        return matchesBoard && matchesSearch
    })

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            {/* Header */}
            <PinterestHeader />
            <div className="flex flex-col items-center pt-16 gap-5 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="relative h-24 w-24">
                    <img
                        src="/street-wear-fashion-women.jpg"
                        alt="Profile pic"
                        className="h-full w-full object-cover rounded-full shadow-md border-2 border-border"
                    />
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-1">Your Saved Pins</h1>
                    <p className="text-sm text-muted-foreground">
                        {pins.length} pins · {boards.length} boards
                    </p>
                </div>
            </div>

            {/* Board Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {boards.map((board) => (
                    <Button
                        key={board.id}
                        variant={selectedBoard === board.id.toString() ? "default" : "outline"}
                        className="rounded-full whitespace-nowrap"
                        onClick={() => setSelectedBoard(board.id.toString())}
                    >
                        {board.name}
                        <span className="ml-2 text-xs opacity-70">{board.count}</span>
                    </Button>
                ))}
            </div>

            {/* View Options */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                        <Grid3x3 className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <LayoutGrid className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Pinterest Masonry Grid */}
            {filteredPins.length > 0 ? (
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4 space-y-4">
                    {filteredPins.map((pin) => (
                        <PinCard
                            pin={pin}
                            onCardClick={() => {
                                dispatch(setSelectedPin(pin))
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-muted-foreground py-16">
                    No pins found.
                </div>
            )}

            {/* Fullscreen Pin Preview */}
            {selectedPin && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center backdrop-blur-sm"
                    onClick={() => dispatch(setSelectedPin(null))}
                >
                    <div className="relative max-w-xl w-full px-28" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedPin.image}
                            alt={selectedPin.title}
                            width={1000}
                            height={1000}
                            className="w-full h-fixed rounded-2xl shadow-2xl object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
