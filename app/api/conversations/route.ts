import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { profileTwoId } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const conversation = await db.conversation.create({
      data: {
        profileOneId: profile.id,
        profileTwoId,
        channels: {
          create: [{ name: "general" }],
        },
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.log("[SERVER_POST]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
