"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import FileUpload from "../file-upload";

const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required" }),
});

export default function InitalModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const { setValue } = form;
  const isLoading = form.formState.isSubmitting;
  const { errors } = form.formState;

  useEffect(() => {
    setValue("imageUrl", imageUrl);
  }, [imageUrl, setValue]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Create Server
      </Button>
      <Modal
        className="self-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader>Create your Server</ModalHeader>
              <ModalBody className="flex justify-center items-center">
                <FileUpload
                  endpoint="serverImage"
                  value={imageUrl}
                  onChange={setImageUrl}
                />
                <Input
                  {...form.register("name")}
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                  label="Name"
                  placeholder="Enter your server name"
                  variant="bordered"
                />
                <Input
                  disabled
                  readOnly
                  errorMessage={errors.imageUrl?.message}
                  isInvalid={!!errors.imageUrl}
                  label="Image"
                  placeholder="Choose file or drag to box"
                  value={imageUrl}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" disabled={isLoading} type="submit">
                  Create
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
