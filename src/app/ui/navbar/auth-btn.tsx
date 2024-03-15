"use client";

import { guestNavbarMenus } from "@/app/lib/menus";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export default function AuthButton({ className }: Props) {
  const router = useRouter();
  return (
    <>
      {guestNavbarMenus.map((menu, index) => (
        <div key={index} className={`${className}`}>
          <Button
            variant={menu.variant ? "default" : "outline"}
            size="sm"
            onClick={() => router.push(menu.url)}
            className="rounded-lg"
          >
            {menu.title}
          </Button>
        </div>
      ))}
    </>
  );
}
