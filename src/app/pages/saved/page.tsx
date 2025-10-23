"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { PinCard } from "@/components/pin-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Grid3x3, LayoutGrid } from "lucide-react"
import { PinterestLogo } from "@/components/pinterest-logo"
import { useRouter } from "next/navigation"
import { PinterestHeader } from "@/components/pinterest-header"

export default function SavedPage() {
    const router = useRouter()
    const [selectedBoard, setSelectedBoard] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    const pins = useSelector((state: RootState) => state.pins.savedPins)

    const boards = [
        { id: "all", name: "All Pins", count: pins.length },
        { id: "home", name: "Home Decor", count: 89 },
        { id: "recipes", name: "Recipes", count: 56 },
        { id: "fashion", name: "Fashion", count: 42 },
        { id: "travel", name: "Travel", count: 34 },
        { id: "diy", name: "DIY Projects", count: 26 },
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
        <div className="min-h-screen bg-background">
            {/* Header */}
            <PinterestHeader />

            {/* Profile Section */}
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="h-24 w-24 rounded-full bg-muted" />
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-2">Your Saved Pins</h1>
                        <p className="text-muted-foreground">
                            {pins.length} pins · {boards.length} boards
                        </p>
                    </div>
                </div>

                {/* Board Tabs */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                    {boards.map((board) => (
                        <Button
                            key={board.id}
                            variant={selectedBoard === board.id ? "default" : "outline"}
                            className="rounded-full whitespace-nowrap"
                            onClick={() => setSelectedBoard(board.id)}
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

                {/* Pins Grid */}
                {filteredPins.length > 0 ? (
                    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
                        {filteredPins.map((pin: any) => (
                            <PinCard key={pin.id} pin={pin} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground py-16">
                        No pins found.
                    </div>
                )}
            </div>
        </div>
    )
}
