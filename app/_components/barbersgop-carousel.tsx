"use client";

import { Swiper, SwiperSlide } from "swiper/react";
// O import do CSS é obrigatório para o Swiper renderizar na tela
import "swiper/css";
import BarbershopItem from "./barbershop-item";
import { Barbershop } from "@/generated/prisma";

// Tipagem correta baseada no seu Prisma
interface BarbershopCarouselProps {
  barbershops: Barbershop[];
}

const BarbershopCarousel = ({ barbershops }: BarbershopCarouselProps) => {
  // Evita quebrar caso a lista venha vazia
  if (!barbershops || barbershops.length === 0) return null;

  return (
    <Swiper spaceBetween={16} slidesPerView="auto" className="w-full">
      {barbershops.map((barbershop) => (
        // A SOLUÇÃO ESTÁ AQUI:
        // Trocamos o "!w-auto" por "w-[300px]".
        // Como o seu BarbershopItem tem "min-w-[300px]", o SwiperSlide precisa
        // ter exatamente essa largura para o cálculo do slidesPerView="auto" funcionar.
        <SwiperSlide key={barbershop.id} className="w-[300px]">
          <BarbershopItem barbershop={barbershop} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BarbershopCarousel;
