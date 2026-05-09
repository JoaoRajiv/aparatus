import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "../public/banner.png";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "./_components/ui/page";
import QuickSearchButtons from "./_components/quick-search-buttons";
import getRecommendedBarbershops from "./_actions/get-recommended-barbershops copy";
import getPopularBarbershops from "./_actions/get-popular-barbershops";

const Home = async () => {
  const recommendedBarbershops = await getRecommendedBarbershops();
  const popularBarbershops = await getPopularBarbershops();
  return (
    <main className="mt-16">
      <PageContainer>
        <Header />

        <div className="container m-auto rounded-lg lg:max-h-110 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 mb-4">
          <div className="flex flex-col gap-6 ">
            <SearchInput />
            <QuickSearchButtons />
          </div>
          <Image
            src={banner}
            alt="Agende agora!"
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-fit relative rounded-lg"
          />
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-full"
        >
          <CarouselContent className="-ml-4">
            {recommendedBarbershops.map((barbershop) => (
              <CarouselItem key={barbershop.id} className="pl-4 basis-auto">
                <div className="w-[300px]">
                  <BarbershopItem barbershop={barbershop} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* O shadcn já posiciona os botões automaticamente se você quiser */}
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-full"
        >
          <CarouselContent>
            {popularBarbershops.map((barbershop) => (
              <CarouselItem key={barbershop.id} className="pl-4 basis-auto">
                <div className="w-[300px]">
                  <BarbershopItem barbershop={barbershop} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* O shadcn já posiciona os botões automaticamente se você quiser */}
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default Home;
