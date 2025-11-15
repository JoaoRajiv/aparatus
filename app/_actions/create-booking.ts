"use server";

import { z } from "zod";
import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const inputSchema = z.object({
  serviceId: z.uuid(),
  date: z.date(),
});

export const createBooking = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      returnValidationErrors(inputSchema, {
        _errors: ["Usuário não autenticado"],
      });
    }
    const service = await prisma.barbershopService.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      returnValidationErrors(inputSchema, {
        _errors: ["Serviço não encontrado"],
      });
    }
    // verificar disponibilidade, usuário, etc...
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbershopId,
        date,
      },
    });
    if (existingBooking) {
      console.log("Horário não disponível:", date);
      returnValidationErrors(inputSchema, {
        _errors: ["Horário não disponível"],
      });
    }
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date,
        userId: session.user.id,
        barbershopId: service.barbershopId,
      },
    });
    return booking;
  });
