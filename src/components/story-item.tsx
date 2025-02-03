import { formatDistanceToNow } from "@/lib/dates";
import type { Story } from "@/types";
import clsx from "clsx";
import { Button } from "./ui/button";

export function StoryItem({ story }: { story: Story }) {
  return (
    <div className="group relative flex flex-col items-center gap-1">
      <Button
        type="button"
        size="icon"
        className={clsx(
          // Reset some default styling
          "bg-transparent hover:bg-transparent",
          "size-16 rounded-full border-2 border-dashed",
          story.viewed ? "border-border" : "border-primary",
        )}
        aria-label="View story"
      >
        <span className="absolute inset-x-0 -top-px bottom-0" />
        <img
          src={story.imageUrl}
          alt=""
          className={clsx(
            "aspect-square rounded-full object-cover transition-transform",
            // Make the image smaller to create a offset
            // Scale by 108% to fill the offset on button hover
            "size-14 group-hover:scale-108",
          )}
        />
      </Button>
      <span className="text-muted-foreground group-hover:text-foreground text-xs">
        {formatDistanceToNow(story.timestamp)}
      </span>
    </div>
  );
}
