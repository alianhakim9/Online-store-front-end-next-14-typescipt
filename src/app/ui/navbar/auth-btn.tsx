"use client";

import { guestNavbarMenus } from "@/app/lib/menus";
import { useRouter } from "next/navigation";
import { MotionButton } from "../motion-button";

interface Props {
  className?: string;
}

export default function AuthButton({ className }: Props) {
  const router = useRouter();
  return (
    <>
      {guestNavbarMenus.map((menu, index) => (
        <div key={index} className={`${className}`}>
          <MotionButton
            variant={menu.variant ? "default" : "outline"}
            size="sm"
            onClick={() => router.push(menu.url)}
            className="rounded-lg"
            whileTap={{
              scale: 0.9,
            }}
          >
            {menu.title}
          </MotionButton>
        </div>
      ))}
    </>
  );
}
