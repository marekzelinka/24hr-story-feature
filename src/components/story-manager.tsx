import { Story } from "@/types";
import { Grid2X2PlusIcon } from "lucide-react";
import { useState } from "react";
import { AddStoryButton } from "./add-story-button";
import { EmptyState } from "./empty-state";
import { StoryItem } from "./story-item";
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
    <div className="space-y-8">
      <ScrollArea className="whitespace-nowrap">
        <div className="flex w-max items-start gap-4 pb-4">
          <AddStoryButton onUpload={handleAddStory} />
          <Separator orientation="vertical" className="mt-2 h-12" />
          {stories.map((story) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {stories.length === 0 ? (
        <EmptyState
          icon={<Grid2X2PlusIcon aria-hidden />}
          title="No stories yet."
          description="Click the + button above to add your first story!"
        />
      ) : null}
    </div>
  );
}
