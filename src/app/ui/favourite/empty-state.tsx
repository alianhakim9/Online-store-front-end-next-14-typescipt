import ImageLoad from "@/app/ui/image-load";

export function EmptyState() {
  return (
    <div className="flex items-center justify-center">
      <ImageLoad
        src="/images/empty-state.png"
        className="w-80 h-80"
        alt="empty state favourite image"
      />
    </div>
  );
}
