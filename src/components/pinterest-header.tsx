"use client"

import { Search, Bell, MessageCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PinterestLogo } from "@/components/pinterest-logo"

export function PinterestHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
            <div className="flex items-center gap-2 px-4 py-3">
                {/* Logo */}
                <PinterestLogo />

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" className="font-semibold">
                        Home
                    </Button>
                    <Button variant="ghost" className="font-semibold">
                        Explore
                    </Button>
                    <Button variant="ghost" className="font-semibold">
                        Create
                    </Button>
                </nav>

                {/* Search Bar */}
                <div className="flex-1 max-w-3xl mx-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search"
                            className="w-full pl-12 pr-4 h-12 rounded-full bg-muted border-0 focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <MessageCircle className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <div className="h-6 w-6 rounded-full bg-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ChevronDown className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
