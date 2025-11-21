import Image from "next/image";
import { Barbershop } from "@/generated/prisma/client";
import Link from "next/link";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Link
      href={`/barbershops/${barbershop.id}`}
      className="relative flex-none rounded-xl min-w-[300px] min-h-[200px]"
    >
      <div className="bg-linear-to-t from-black to-transparent h-full w-full absolute top-0 left-0 z-10 rounded-lg" />
      <Image
        src={barbershop.imageUrl || ""}
        alt={barbershop.name}
        fill
        sizes="(max-width: 768px) 100vw, 300px"
        className="object-cover rounded-xl"
      />
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <h3 className="text-background text-lg font-semibold">
          {barbershop.name}
        </h3>
        <p className="text-background text-xs">{barbershop.address}</p>
      </div>
    </Link>
  );
};

export { BarbershopItem };
export default BarbershopItem;
