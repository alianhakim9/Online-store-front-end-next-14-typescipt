import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  let skeletons = [];
  for (let i = 0; i < 10; i++) {
    skeletons.push(<ProductCardSkeleton key={i} />);
  }
  if (skeletons.length > 1) {
    return <div className="grid grid-cols-5 gap-4 w-full">{skeletons}</div>;
  }
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-2">
      <Skeleton className="h-52 w-full" />
      <Skeleton className="h-[12px] w-[50px]" />
      <Skeleton className="h-[12px] w-full" />
      <Skeleton className="h-[20px] w-full" />
      <Skeleton className="h-[12px] w-[50px]" />
      <Skeleton className="h-[32px] w-[100px] self-center justify-self-center" />
    </div>
  );
}
