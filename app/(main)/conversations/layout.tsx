import { Divider } from "@nextui-org/divider";
import React from "react";

async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex m-5 bg-slate-100 dark:bg-gray-700 h-5/6 rounded-xl">
        <div className="hidden sm:block sm:w-1/5 p-4">
          Here I will load conversations that belongs to the user
        </div>
        <Divider className="hidden sm:block" orientation="vertical" />
        {children}
      </div>
    </>
  );
}

export default ConversationsLayout;
