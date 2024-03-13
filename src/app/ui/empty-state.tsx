import ImageLoad from "@/app/ui/image-load";

interface IEmptyState {
  title: string;
  mode: "graphic" | "text";
}

const EmptyState = ({ title, mode }: IEmptyState) => {
  return (
    <div>
      {mode === "graphic" ? (
        <div className="flex items-center flex-col justify-center">
          <ImageLoad
            src="/images/empty-state.png"
            alt="empty-state"
            className="h-52 w-52"
          />
          <p>{title}</p>
        </div>
      ) : (
        <p className="text-sm">{title}</p>
      )}
    </div>
  );
};

export default EmptyState;
