"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Divider } from "@nextui-org/divider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Send } from "lucide-react";
import axios from "axios";
import { useState } from "react";

import MessageFile from "../modals/message-file";

type ChatInputProps = {
  conversationId: string;
};

const formSchema = z.object({
  content: z.string().min(1),
});

export default function ChatInput({ conversationId }: ChatInputProps) {
  const [fileUrl, setFileUrl] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/socket/messages", {
        conversationId,
        content: values.content,
        fileUrl,
      });
      form.reset();
      setFileUrl("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Divider />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex p-4 pb-6 items-center gap-1">
          <MessageFile fileUrl={fileUrl} setFileUrl={setFileUrl} />
          <Input
            {...form.register("content")}
            disabled={isLoading}
            placeholder="Enter your Message"
            variant="bordered"
          />
          <Button isIconOnly color="primary" type="submit">
            <Send />
          </Button>
        </div>
      </form>
    </>
  );
}
