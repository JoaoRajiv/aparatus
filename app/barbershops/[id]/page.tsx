import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { ServiceItem } from "@/app/_components/service-item";
import { PhoneItem } from "@/app/_components/phone-item";
import Footer from "@/app/_components/footer";
import { Card } from "@/app/_components/ui/card";

const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <>
      <div className="flex size-full flex-col items-start gap-6 mt-20 lg:py-10 mb-18 lg:grid container mx-auto lg:grid-cols-[1.5fr_1fr]">
        <div className="h-full lg:h-100 w-full">
          {/* Hero Section com Imagem */}
          <div className="relative rounded-2xl overflow-hidden h-full w-full">
            {/* IMAGEM   */}
            <Image
              src={barbershop.imageUrl || ""}
              alt="Imagem da barbearia"
              width={1200}
              height={600}
              quality={100}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="
              w-full h-auto object-contain 
              lg:absolute lg:h-full lg:w-full lg:object-cover lg:object-center
            "
              priority
            />
            {/* BOTÃO DE VOLTAR  */}
            <div className="absolute top-0 left-0 flex  px-5 pt-6">
              <Button
                size="icon"
                variant="outline"
                className="overflow-clip rounded-full"
                asChild
              >
                <Link href="/">
                  <ChevronLeft className="size-5" />
                </Link>
              </Button>
            </div>
          </div>
          <Card className="m-6 lg:m-0 lg:mt-10 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
            <div>
              <div className="flex w-full items-center gap-1.5 px-5 pb-0 rounded-t-lg">
                <div className="flex flex-col items-start gap-1 rounded-t-lg">
                  <div className="flex items-start gap-1.5 ">
                    <div className="relative size-7.5 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={barbershop.imageUrl || ""}
                        alt={barbershop.name}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-foreground text-xl font-bold">
                      {barbershop.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground text-sm">
                        {barbershop.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="px-0 py-4">
                <Separator />
              </div>

              {/* Sobre Nós */}
              <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
                <div className="flex items-center justify-center gap-2.5">
                  <p className="text-foreground text-xs font-bold uppercase">
                    SOBRE NÓS
                  </p>
                </div>
                <p className="text-foreground w-full text-sm">
                  {barbershop.description}
                </p>
              </div>
            </div>
            <div className="px-0 py-4 ">
              <Separator />
            </div>

            {/* Contato */}
            <div className="flex w-full flex-col items-start gap-3 px-5">
              <div className="flex items-center justify-center gap-2.5">
                <p className="text-foreground text-xs font-bold uppercase">
                  CONTATO
                </p>
              </div>
              <div className="flex flex-col w-full gap-3">
                {barbershop.phones.map((phone, index) => (
                  <PhoneItem key={index} phone={phone} />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Container Principal */}
        <div className="bg-background w-full flex-1 rounded-tl-3xl rounded-tr-3xl lg:mt-4 rounded-b-3xl">
          {/* Divider */}
          <div className="px-0 py-6 block lg:hidden">
            <Separator />
          </div>

          {/* Serviços */}
          <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
            <div className="flex items-center justify-center gap-2.5">
              <p className="text-foreground text-xs font-bold uppercase">
                SERVIÇOS
              </p>
            </div>
            <div className="flex w-full flex-col gap-3">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={{ ...service, barbershop }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default BarbershopPage;
