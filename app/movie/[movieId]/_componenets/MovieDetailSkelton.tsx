import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetailSkeleton() {
  return (
    <section className="w-270 mt-10 space-y-6">
      <Skeleton className="h-10 w-[400px]" />
      <Skeleton className="h-6 w-[250px]" />

      <div className="flex gap-6">
        <Skeleton className="w-[290px] h-[428px] rounded-lg" />
        <Skeleton className="w-[760px] h-[428px] rounded-lg" />
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>

      <div className="space-y-2 max-w-[900px]">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </section>
  );
}
