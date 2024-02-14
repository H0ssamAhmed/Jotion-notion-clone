"use client";
import { Button } from "../../../../components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { ModeToggleSimple } from "../../../../components/mode-toggle";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const router = useRouter();
  document.title = `${user.firstName}'s Jotion | workspace`;

  const onClick = () => {
    const promise = create({ title: "untitle", userId: user.id })
      .then((documentId) =>
        router.push(`/documents/${documentId}`)
      );

    toast.promise(promise, {
      loading: "Creating new note",
      success: "New note created!",
      error: "There is Error",
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Image
        src="/empty.png"
        width={300}
        height={300}
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        width={300}
        height={300}
        alt="Empty"
        className="hidden  dark:block"
      />
      <h2 className="text-lg text-center font-medium my-5">
        welcome to , {user.firstName}&apos;s NoteHub
      </h2>
      <Button onClick={onClick}>
        <PlusCircleIcon className="h-4 w-4 mr-2" />
        create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
