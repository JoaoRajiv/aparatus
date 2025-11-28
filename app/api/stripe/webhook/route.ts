import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Desabilitar o body parser do Next.js para webhooks do Stripe
export const runtime = "nodejs";

export const POST = async (request: Request) => {
  console.log("\n=== STRIPE WEBHOOK RECEIVED ===");

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Missing STRIPE_SECRET_KEY");
    return NextResponse.json({ error: "Configuration error" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await request.text();

  let event: Stripe.Event;

  // Em desenvolvimento, se não houver webhook secret, parse manualmente
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn(
      "WARNING: STRIPE_WEBHOOK_SECRET not set - skipping signature verification (DEV ONLY)"
    );
    try {
      event = JSON.parse(body) as Stripe.Event;
      console.log("Event parsed without verification, type:", event.type);
    } catch (err) {
      console.error("Failed to parse event body:", err);
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
  } else {
    // Em produção, sempre verificar a assinatura
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      console.error("Missing stripe-signature header");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("Event verified successfully, type:", event.type);
    } catch (err) {
      console.error(
        "Webhook signature verification failed:",
        err instanceof Error ? err.message : err
      );
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }
  }
  if (event.type === "checkout.session.completed") {
    console.log("Processing checkout.session.completed event");
    const session = event.data.object;
    console.log("Session ID:", session.id);
    console.log("Session metadata:", session.metadata);

    const date = session.metadata?.date
      ? new Date(session.metadata.date)
      : null;
    const serviceId = session.metadata?.serviceId;
    const barbershopId = session.metadata?.barbershopId;
    const userId = session.metadata?.userId;

    console.log("Extracted data:", { date, serviceId, barbershopId, userId });

    if (!date || !serviceId || !barbershopId || !userId) {
      console.error("Missing required metadata", {
        date: !!date,
        serviceId: !!serviceId,
        barbershopId: !!barbershopId,
        userId: !!userId,
      });
      return NextResponse.json(
        { error: "Missing required metadata" },
        { status: 400 }
      );
    }

    // Retrieve session with expanded payment_intent to get chargeId
    const expandedSession = await stripe.checkout.sessions.retrieve(
      session.id,
      {
        expand: ["payment_intent"],
      }
    );

    // Extract chargeId from payment_intent
    const paymentIntent =
      expandedSession.payment_intent as Stripe.PaymentIntent;
    const chargeId =
      typeof paymentIntent?.latest_charge === "string"
        ? paymentIntent.latest_charge
        : paymentIntent?.latest_charge?.id;

    console.log("Payment Intent ID:", paymentIntent?.id);
    console.log("Charge ID:", chargeId);

    try {
      const booking = await prisma.booking.create({
        data: {
          barbershopId,
          serviceId,
          date,
          userId,
          stripeChargeId: chargeId || null,
        },
      });
      console.log("Booking created successfully:", booking.id);
    } catch (error) {
      console.error("Error creating booking:", error);
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }
  } else {
    console.log("Ignoring event type:", event.type);
  }

  revalidatePath("/bookings");
  console.log("Webhook processed successfully\n");
  return NextResponse.json({ received: true });
};
