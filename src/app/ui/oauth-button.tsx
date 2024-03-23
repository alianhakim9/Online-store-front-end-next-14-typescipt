"use client";

import { IoLogoGoogle } from "react-icons/io5";
import { MotionButton } from "./motion-button";

interface IOAuthButton {
  onClick: () => void;
  title: string;
  isLoading?: boolean;
}

const OAuthButton = ({ onClick, title, isLoading }: IOAuthButton) => {
  return (
    <MotionButton
      type="button"
      className="self-stretch rounded-lg shadow-lg"
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      whileTap={{
        scale: 0.9,
      }}
    >
      <IoLogoGoogle size={20} className="mr-4" /> {title} Dengan Google
    </MotionButton>
  );
};

export default OAuthButton;
