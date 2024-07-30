import { db } from "@/lib/db";

export async function getOrCreateConversation(
  profileOneId: string,
  profileTwoId: string,
) {
  let conversation =
    (await findConversation(profileOneId, profileTwoId)) ||
    (await findConversation(profileTwoId, profileOneId));

  if (!conversation) {
    conversation = await createNewConversation(profileOneId, profileTwoId);
  }

  return conversation;
}

async function findConversation(profileOneId: string, profileTwoId: string) {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ profileOneId: profileOneId }, { profileTwoId: profileTwoId }],
      },
      include: {
        profileOne: true,
        profileTwo: true,
      },
    });
  } catch {
    null;
  }
}

async function createNewConversation(
  profileOneId: string,
  profileTwoId: string,
) {
  try {
    return await db.conversation.create({
      data: {
        profileOneId,
        profileTwoId,
        channels: {
          create: [{ name: "general" }],
        },
      },
      include: {
        profileOne: true,
        profileTwo: true,
      },
    });
  } catch {
    null;
  }
}
