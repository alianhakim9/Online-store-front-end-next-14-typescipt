import { Skeleton } from "@/components/ui/skeleton";

export function SideCategorySkeleton() {
  return (
    <div className="h-[100px] w-[200px] flex flex-col gap-2">
      <Skeleton className="h-[12px] w-full" />
      <Skeleton className="h-[12px] w-full" />
      <Skeleton className="h-[12px] w-full" />
      <Skeleton className="h-[12px] w-full" />
      <Skeleton className="h-[12px] w-full" />
    </div>
  );
}
