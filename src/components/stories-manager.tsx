import { Story } from "@/types";
import { Grid2X2PlusIcon } from "lucide-react";
import { useState } from "react";
import { AddStoryButton } from "./add-story-button";
import { EmptyState } from "./empty-state";
import { StoriesViewer } from "./stories-viewer";
import { StoryItem } from "./story-item";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export function StoriesManager() {
  const [stories, setStories] = useState<Story[]>([]);

  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null,
  );

  const handleAddStory = (imageUrl: string) => {
    const newStory: Story = {
      id: Date.now().toString(),
      imageUrl,
      timestamp: Date.now(),
    };

    const nextStories = [...stories, newStory];
    setStories(nextStories);
  };

  const markStoryAsViewed = (index: number) => {
    setStories((stories) => {
      return stories.map((story) =>
        story.id === stories[index].id ? { ...story, viewed: true } : story,
      );
    });
  };

  const selectStory = (index: number) => {
    setSelectedStoryIndex(index);
    setStories((stories) => {
      return stories.map((story, storyIndex) =>
        storyIndex === index && !story.viewed
          ? { ...story, viewed: true }
          : story,
      );
    });
  };

  return (
    <div className="space-y-8">
      {selectedStoryIndex !== null ? (
        <StoriesViewer
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          onStoryView={markStoryAsViewed}
          onClose={() => setSelectedStoryIndex(null)}
        />
      ) : null}
      <ScrollArea className="whitespace-nowrap">
        <div className="flex w-max items-start gap-4 pb-4">
          <AddStoryButton onUpload={handleAddStory} />
          <Separator orientation="vertical" className="mt-3 h-10" />
          {stories.map((story, index) => (
            <StoryItem
              key={index}
              story={story}
              index={index}
              onClick={() => selectStory(index)}
            />
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
