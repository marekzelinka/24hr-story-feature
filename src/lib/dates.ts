export function formatDistanceToNow(timestamp: number): string {
  const timeDiff = Date.now() - timestamp;
  const minutes = Math.floor(timeDiff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days > 1 ? "days" : "day"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes > 1 ? "minutes" : "minute"} ago`;
  } else {
    return "Just now";
  }
}
