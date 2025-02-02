import { Story } from "@/types";
import { useState } from "react";
import { AddStoryButton } from "./add-story-button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export function StoryManager() {
  const [stories, setStories] = useState<Story[]>([]);

  const handleAddStory = (imageUrl: string) => {
    const newStory: Story = {
      id: Date.now().toString(),
      imageUrl,
      timestamp: Date.now(),
    };

    const nextStories = [...stories, newStory];
    setStories(nextStories);
  };

  return (
    <ScrollArea className="whitespace-nowrap">
      <div className="flex w-max items-center gap-4 pb-4">
        <AddStoryButton onUpload={handleAddStory} />
        <Separator orientation="vertical" className="h-14" />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
