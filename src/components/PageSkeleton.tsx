import { forwardRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="animate-fade-in">
      {/* Hero skeleton */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-5 w-32 mx-auto rounded-full" />
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
          <div className="flex justify-center gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12 space-y-3">
          <Skeleton className="h-4 w-28 mx-auto" />
          <Skeleton className="h-10 w-96 mx-auto" />
          <Skeleton className="h-5 w-2/3 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-8 space-y-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

PageSkeleton.displayName = "PageSkeleton";

export default PageSkeleton;
