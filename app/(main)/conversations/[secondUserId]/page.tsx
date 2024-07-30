import ChatHeader from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { getOrCreateConversation } from "@/lib/lib";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatInput from "@/components/chat/chat-input";

type ConversationPageProps = {
  params: {
    secondUserId: string;
  };
};

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  const conversation = await getOrCreateConversation(
    profile.id,
    params.secondUserId
  );

  if (!conversation) {
    return redirect("/");
  }

  const { profileOne, profileTwo } = conversation;
  const otherProfile = profile.id === profileOne.id ? profileTwo : profileOne;

  return (
    <div className="flex flex-col h-full flex-grow">
      <ChatHeader name={otherProfile.email} />
      <div className="flex-1">Future Messages</div>
      <ChatInput conversationId={conversation.id} />
    </div>
  );
}
