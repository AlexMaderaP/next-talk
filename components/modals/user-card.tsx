import { Avatar } from "@nextui-org/avatar";
import { Card, CardHeader } from "@nextui-org/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

import { User } from "@/types";

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  const router = useRouter();

  async function handleStartConversation() {
    try {
      await axios.post("/api/conversations", { profileTwoId: user.id });
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card
      fullWidth
      isHoverable
      isPressable={true}
      onPress={handleStartConversation}
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={user.imageUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h5 className="text-medium font-semibold leading-none text-default-600">
              {user.email}
            </h5>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
