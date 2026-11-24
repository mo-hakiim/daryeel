import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function FeaturedCarousel() {
  const featured = products.filter((p) => p.featured);
  return (
    <Carousel opts={{ align: "start", loop: true }} className="relative">
      <CarouselContent className="-ml-5 py-4">
        {featured.map((p) => (
          <CarouselItem key={p.slug} className="basis-[85%] pl-5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <ProductCard product={p} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-6 flex justify-end gap-2">
        <CarouselPrevious className="static h-11 w-11 translate-y-0 rounded-full" />
        <CarouselNext className="static h-11 w-11 translate-y-0 rounded-full" />
      </div>
    </Carousel>
  );
}
