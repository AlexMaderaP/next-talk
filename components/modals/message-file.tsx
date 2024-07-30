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
import { Dispatch, SetStateAction } from "react";
import { Plus } from "lucide-react";
import { Badge } from "@nextui-org/badge";

import FileUpload from "../file-upload";

type MessageFileProps = {
  fileUrl: string;
  setFileUrl: Dispatch<SetStateAction<string>>;
};
export default function MessageFile({ fileUrl, setFileUrl }: MessageFileProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Badge
        className={`${fileUrl === "" && "hidden"} `}
        color="success"
        content={1}
      >
        <Button isIconOnly color="primary" onPress={onOpen}>
          <Plus />
        </Button>
      </Badge>
      <Modal
        className="self-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Add an attachment</ModalHeader>
              <ModalBody className="flex justify-center items-center">
                <FileUpload
                  endpoint="serverImage"
                  value={fileUrl}
                  onChange={setFileUrl}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
