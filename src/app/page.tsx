import { PinterestHeader } from "@/components/pinterest-header"
import { MasonryGrid } from "@/components/masonry-grid"

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <PinterestHeader />
        <main className="pt-20">
          <MasonryGrid />
        </main>
      </div>
    </>
  )
}
