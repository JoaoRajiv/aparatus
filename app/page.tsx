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
import { PageContainer, PageSectionTitle } from "./_components/ui/page";
import QuickSearchButtons from "./_components/quick-search-buttons";
import getRecommendedBarbershops from "./_actions/get-recommended-barbershops copy";
import getPopularBarbershops from "./_actions/get-popular-barbershops";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import BookingItem from "./_components/booking-item";
import { prisma } from "@/lib/prisma";

const Home = async () => {
  const recommendedBarbershops = await getRecommendedBarbershops();
  const popularBarbershops = await getPopularBarbershops();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      service: true,
      barbershop: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const now = new Date();

  const confirmedBookings = bookings.filter(
    (booking) => !booking.cancelled && new Date(booking.date) >= now,
  );

  return (
    <main className="mt-16">
      <PageContainer>
        <Header />

        <div className="container mx-auto rounded-lg mt-4 lg:h-150  grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 mb-4">
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
            <PageSectionTitle>Seus agendamentos</PageSectionTitle>
            {confirmedBookings.length > 0 ? (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-full"
              >
                <CarouselContent className="">
                  {confirmedBookings.map((booking) => (
                    <CarouselItem key={booking.id} className="pl-4 ">
                      <BookingItem key={booking.id} booking={booking} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
              </Carousel>
            ) : (
              <p className="text-muted-foreground">
                Você não tem agendamentos confirmados.
              </p>
            )}
          </div>
          <div className="lg:relative rounded-lg overflow-hidden">
            <Image
              src={banner}
              alt="Agende agora!"
              // Sem o fill, o Next.js exige width e height para evitar Layout Shift.
              // Coloque as dimensões aproximadas reais do seu arquivo banner.png
              width={1200}
              height={600}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="
              w-full h-auto object-contain 
              lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-contain lg:object-center
            "
              priority
            />
          </div>
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
