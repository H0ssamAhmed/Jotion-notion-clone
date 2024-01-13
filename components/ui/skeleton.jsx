import { cn } from "../../lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary mb-2", className)}
      {...props}
    ></div>
  );
}

export { Skeleton };
