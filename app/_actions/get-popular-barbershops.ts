import { prisma } from "@/lib/prisma";

const getPopularBarbershops = async () => {
  return await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
};

export default getPopularBarbershops;
