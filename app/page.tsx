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
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Home = async () => {
  const recommendedBarbershops = await getRecommendedBarbershops();
  const popularBarbershops = await getPopularBarbershops();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="mt-16">
      <PageContainer>
        <Header />

        <div className="container mx-auto rounded-lg mt-4 lg:max-h-110 overflow-hidden grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">
                Olá,{" "}
                <span className=" uppercase">
                  {session?.user?.name?.split(" ")[0]}👋
                </span>
              </h1>
              <p>
                <span className="capitalize">
                  {format(new Date(), "EEEE, dd", { locale: ptBR })}
                </span>
                <span>&nbsp;de&nbsp;</span>
                <span className="capitalize">
                  {format(new Date(), "MMMM", { locale: ptBR })}
                </span>
              </p>
            </div>
            <SearchInput />
            <QuickSearchButtons />
          </div>
          <Image
            src={banner}
            alt="Agende agora!"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <PageSectionTitle>Recomendados</PageSectionTitle>
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

        <PageSectionTitle>Populares</PageSectionTitle>
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
