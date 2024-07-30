import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";

import SocketIndicator from "../socket-indicator";

interface ChatHeaderProps {
  name: string;
  imageUrl?: string;
}

export default function ChatHeader({ name, imageUrl }: ChatHeaderProps) {
  return (
    <>
      <div className="text-md font-semibold py-8 px-4 flex items-center justify-between h-12 ">
        <Avatar name={name} radius="full" size="md" src={imageUrl} />
        <p className="font-semibold text-md text-black dark:text-white">
          {name}
        </p>
        <SocketIndicator />
      </div>
      <Divider />
    </>
  );
}
