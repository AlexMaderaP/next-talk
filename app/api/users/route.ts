import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const users = await db.profile.findMany({
      where: {
        id: {
          not: profile.id,
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[GET_USERS]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
