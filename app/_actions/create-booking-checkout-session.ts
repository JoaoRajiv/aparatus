"use server";
import { actionClient } from "@/lib/action-client";
import { auth } from "@/lib/auth";
import { returnValidationErrors } from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

const inputSchema = z.object({
  serviceId: z.uuid(),
  date: z.date(),
});

export const createBookingCheckoutSession = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    console.log("\n=== CREATE BOOKING CHECKOUT SESSION ===");
    console.log("ServiceId:", serviceId);
    console.log("Date:", date);

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set");
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    console.log("User session:", session?.user?.id);

    if (!session?.user) {
      console.error("Unauthorized - no user session");
      returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }
    const service = await prisma.barbershopService.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        barbershop: true,
      },
    });
    console.log("Service found:", service?.id, service?.name);

    if (!service) {
      console.error("Service not found:", serviceId);
      returnValidationErrors(inputSchema, {
        _errors: ["Service not found"],
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-11-17.clover",
    });

    const metadata = {
      serviceId: service.id,
      barbershopId: service.barbershopId,
      userId: session.user.id,
      date: date.toISOString(),
    };

    console.log(
      "Creating Stripe checkout session with metadata:",
      JSON.stringify(metadata, null, 2)
    );

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/bookings`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      metadata,
      line_items: [
        {
          price_data: {
            currency: "brl",
            unit_amount: service.priceInCents,
            product_data: {
              name: `${service.barbershop.name} - ${service.name} em ${format(date, "dd/MM/yyyy HH:mm")}`,
              description: service.description,
              images: [service.barbershop.imageUrl || ""],
            },
          },
          quantity: 1,
        },
      ],
    });

    console.log("Checkout session created:", checkoutSession.id);
    console.log("Redirect URL:", checkoutSession.url);
    console.log("===\n");

    // Retornar apenas os dados serializáveis necessários
    return {
      id: checkoutSession.id,
      url: checkoutSession.url,
    };
  });
