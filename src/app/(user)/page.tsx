import HeroCarousel from "@/components/user/HeroCarousel"
import FeaturedProducts from "@/components/user/FeaturedProducts"
import CategorySection from "@/components/user/CategorySection"

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroCarousel />
      <div className="container mx-auto px-4">
        <CategorySection />
        <FeaturedProducts />
      </div>
    </div>
  )
}
