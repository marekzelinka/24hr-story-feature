import { uploadImage } from "@/lib/upload";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { useRef, useTransition, type ChangeEvent } from "react";
import { ImageUploadInput } from "./image-upload-input";
import { Button } from "./ui/button";

export function AddStoryButton({
  onUpload,
}: {
  onUpload: (imageUrl: string) => void;
}) {
  const [isUploading, startUpload] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    startUpload(async () => {
      try {
        const file = event.target.files?.[0];
        if (!file) {
          return;
        }
        if (!file.type.startsWith("image/")) {
          throw new Error("Please select an image file");
        }

        const imageUrl = await uploadImage(file);
        onUpload(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert(error instanceof Error ? error.message : "Error uploading image");
      } finally {
        resetInput();
      }
    });
  };

  const handleClick = () => fileInputRef.current?.click();

  return (
    <div className="group relative flex flex-col items-center gap-1">
      <ImageUploadInput
        ref={fileInputRef}
        disabled={isUploading}
        onChange={handleChange}
      />
      <Button
        type="button"
        size="icon"
        disabled={isUploading}
        onClick={handleClick}
        className={clsx(
          // Reset some default styling
          "text-primary bg-transparent hover:bg-transparent",
          "border-primary hover:bg-primary-foreground size-16 rounded-full border-2 border-dashed",
        )}
        aria-label="Add new story"
      >
        <span className="absolute inset-x-0 -top-px bottom-0" />
        <PlusIcon />
      </Button>
      <span
        className={clsx(
          "text-muted-foreground min-w-18 text-center text-xs",
          isUploading ? "opacity-50" : "group-hover:text-foreground",
        )}
      >
        {isUploading ? "Uploading…" : "Add Story"}
      </span>
    </div>
  );
}
