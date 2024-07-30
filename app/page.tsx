import { redirect } from "next/navigation";

import { title } from "@/components/primitives";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import CreateConversation from "@/components/modals/create-conversation-modal";

export default async function Home() {
  const profile = await initialProfile();

  const conversation = await db.conversation.findFirst({
    where: {
      OR: [{ profileOneId: profile.id }, { profileTwoId: profile.id }],
    },
  });

  if (conversation) {
    return redirect(`/conversations`);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Hello</h1>
        <h1 className={title({ color: "cyan" })}> NextTalk</h1>
        <div className="mt-4">
          <CreateConversation />
        </div>
      </div>
    </section>
  );
}
