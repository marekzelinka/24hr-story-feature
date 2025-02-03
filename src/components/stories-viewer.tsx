import { formatDistanceToNow } from "@/lib/dates";
import type { Story } from "@/types";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export function StoriesViewer({
  stories,
  initialStoryIndex,
  onStoryView,
  onClose,
}: {
  stories: Story[];
  initialStoryIndex: number;
  onStoryView: (index: number) => void;
  onClose: () => void;
}) {
  const [api, setApi] = useState<CarouselApi>();

  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Jump to selected story index on mount
    api.scrollTo(initialStoryIndex, true);
  }, [api, initialStoryIndex]);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Mark story as viewed when index changes
    api.on("select", ({ selectedScrollSnap }) => {
      const selectedStoryIndex = selectedScrollSnap();
      setCurrentIndex(selectedStoryIndex);
      onStoryView(selectedStoryIndex);
    });
  }, [api, initialStoryIndex, onStoryView]);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogTitle className="sr-only">View stories</DialogTitle>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {stories.map((story, index) => (
              <CarouselItem key={index}>
                <img
                  src={story.imageUrl}
                  alt={`Story ${index + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <span className="text-muted-foreground text-sm">
          {formatDistanceToNow(stories[currentIndex].timestamp)}
        </span>
      </DialogContent>
    </Dialog>
  );
}
