"use client";

import "@uploadthing/react/styles.css";
import { Dispatch, SetStateAction } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { Image } from "@nextui-org/image";
import { X } from "lucide-react";
import NextImage from "next/image";

type FileUploadProps = {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export default function FileUpload({
  endpoint,
  value,
  onChange,
}: FileUploadProps) {
  const fileType = value.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative">
        <Image
          as={NextImage}
          width={300}
          height={200}
          alt="uploaded-image"
          src={value}
        />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm z-30"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </>
  );
}
