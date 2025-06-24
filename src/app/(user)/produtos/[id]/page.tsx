import ProductDetails from "@/components/user/ProductDetails"
import RelatedProducts from "@/components/user/RelatedProducts"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails productId={params.id} />
      <div className="mt-16">
        <RelatedProducts />
      </div>
    </div>
  )
}
