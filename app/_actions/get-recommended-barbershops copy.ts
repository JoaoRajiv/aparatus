import { prisma } from "@/lib/prisma";

const getRecommendedBarbershops = async () => {
  return await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export default getRecommendedBarbershops;
