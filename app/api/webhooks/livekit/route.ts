import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
    try {
        
        const body = await req.text();
        const headerPayload = headers();
        const authorization = headerPayload.get("Authorization");
      
        if (!authorization) {
          return new Response("No authorization header", { status: 400 });
        }
      
        const event = receiver.receive(body, authorization);
      
        if (event.event === "ingress_started") {
          await db.stream.update({
            where: {
              ingressId: event.ingressInfo?.ingressId,
            },
            data: {
              isLive: true,
            },
          });
        }
      
        if (event.event === "ingress_ended") {
          await db.stream.update({
            where: {
              ingressId: event.ingressInfo?.ingressId,
            },
            data: {
              isLive: false,
            },
          });
        }
      
        return new Response("Webhook received and processed", { status: 200 });
    } catch (error) {
        console.log("Error livkit Webhook:",error)
        return new Response("Internal server error", { status: 500 });
    }

}