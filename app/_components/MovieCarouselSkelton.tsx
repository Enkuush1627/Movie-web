import { Skeleton } from "@/components/ui/skeleton";

export function MovieCarouselSkeleton() {
  return (
    <section className="w-full relative">
      <div className="relative w-full h-[600px] overflow-hidden">
        <Skeleton className="absolute inset-0" />

        <div className="absolute left-16 bottom-24 max-w-lg space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-4 w-20" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          <Skeleton className="h-10 w-40 rounded-sm" />
        </div>
      </div>
    </section>
  );
}
