"use client";

import { guestNavbarMenus, isLoginNavbarMenus } from "@/app/lib/menus";
import { onSignOut } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoLogOut, IoNotificationsOutline } from "react-icons/io5";
import { CartBadge } from "@/app/ui/navbar/cart-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function NavbarContent() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-2 justify-end">
      <CartBadge />
      {session ? (
        <>
          <Popover>
            <PopoverTrigger>
              <Button variant="ghost" size="icon" className="rounded-full">
                <IoNotificationsOutline size={24} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-30">
              <p>Notifikasi kosong</p>
            </PopoverContent>
          </Popover>
          {isLoginNavbarMenus.map((menu, index) => (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              key={index}
              onClick={() => router.push(menu.url)}
            >
              {<menu.icon size={24} />}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSignOut()}
            className="rounded-full"
          >
            <IoLogOut size={24} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={
                    session.user.image
                      ? session.user.image
                      : "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/user/account">Akun</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/user/account">Pesanan saya</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        guestNavbarMenus.map((menu, index) => (
          <div
            key={index}
            className="flex items-center justify-end w-min-[200px]"
          >
            <Button
              variant={menu.variant ? "default" : "outline"}
              size="sm"
              onClick={() => router.push(menu.url)}
              className="rounded-lg"
            >
              {menu.title}
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
