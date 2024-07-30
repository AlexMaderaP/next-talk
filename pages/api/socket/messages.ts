import { NextApiRequest } from "next";

import { NextApiResponseServerIO } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { conversationId, content, fileUrl } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unathorized" });
    }

    if (!conversationId) {
      return res.status(400).json({ error: "Conversation ID missing" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content ID missing" });
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [{ profileOneId: profile.id }, { profileTwoId: profile.id }],
      },
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not Found" });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        conversationId,
        profileId: profile.id,
      },
    });

    const conversationKey = `conversation:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(conversationKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);

    return res.status(500).json({ message: "Internal Error" });
  }
}
