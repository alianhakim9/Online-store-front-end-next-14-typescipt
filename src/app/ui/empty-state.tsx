import ImageLoad from "@/app/ui/image-load";
import React from "react";

interface IEmptyState {
  title: string;
  mode: "graphic" | "text";
  children?: React.ReactNode;
}

const EmptyState = ({ title, mode, children }: IEmptyState) => {
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
      {children}
    </div>
  );
};

export default EmptyState;
