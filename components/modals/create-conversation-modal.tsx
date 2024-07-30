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
import { useEffect, useState } from "react";

import UserCard from "./user-card";

import { User } from "@/types";

export default function CreateConversation() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();

        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Start a conversation!
      </Button>
      <Modal
        className="self-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Start a conversation</ModalHeader>
              <ModalBody className="flex justify-center items-center">
                {loading
                  ? "Loading"
                  : users.map((user) => <UserCard key={user.id} user={user} />)}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>{" "}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
