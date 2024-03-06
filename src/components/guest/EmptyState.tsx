import ImageLoad from "./ImageLoad";

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
            className="h-80 w-80"
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
