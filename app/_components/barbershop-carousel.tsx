"use client";

import { Swiper, SwiperSlide } from "swiper/react";
// O import do CSS é obrigatório para o Swiper renderizar na tela
import "swiper/css";
import BarbershopItem from "./barbershop-item";
import { Barbershop } from "@/generated/prisma/client";

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
        <SwiperSlide key={barbershop.id} className="w-75">
          <BarbershopItem barbershop={barbershop} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BarbershopCarousel;
