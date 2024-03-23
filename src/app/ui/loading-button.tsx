import { MotionButton } from "@/app/ui/motion-button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AiOutlineLoading } from "react-icons/ai";

interface Props {
  onClick?: () => void;
  isLoading: boolean;
  title: string;
  type: "button" | "reset" | "submit";
  className?: string;
}

const LoadingButton = ({
  onClick,
  isLoading = false,
  title,
  type,
  className,
}: Props) => {
  return (
    <MotionButton
      variant="default"
      onClick={onClick}
      disabled={isLoading}
      type={type}
      className={className}
    >
      {title}
      {isLoading && <AiOutlineLoading className="animate-spin ml-2" />}
      {title === "Checkout?" && <ArrowRightIcon className="ml-2" />}
    </MotionButton>
  );
};

export default LoadingButton;
