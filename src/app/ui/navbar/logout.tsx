"use client";

import { onSignOut } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { IoLogOut } from "react-icons/io5";

interface Props {
  isMobile?: boolean;
  className?: string;
}

export default function LogoutButton({ isMobile, className }: Props) {
  return (
    <Button
      variant={isMobile ? "default" : "ghost"}
      size={isMobile ? "sm" : "icon"}
      onClick={() => onSignOut()}
      className={`${className}`}
    >
      <IoLogOut size={24} />
      {isMobile && <span>Logout</span>}
    </Button>
  );
}
