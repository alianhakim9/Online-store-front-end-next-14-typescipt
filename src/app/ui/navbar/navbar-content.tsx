"use client";

import { isLoginNavbarMenus } from "@/app/lib/menus";
import { Button } from "@/components/ui/button";

import { CartBadge } from "@/app/ui/navbar/cart-badge";
import LogoutButton from "@/app/ui/navbar/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoNotificationsOutline } from "react-icons/io5";
import AuthButton from "@/app/ui/navbar/auth-btn";

interface Props {
  session?: Session | null;
}

export default function NavbarContent({ session }: Props) {
  const router = useRouter();

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
              className={`rounded-full ${
                menu.title === "Favorit" && "hidden md:block"
              }`}
              key={index}
              onClick={() => router.push(menu.url)}
            >
              {<menu.icon size={24} />}
            </Button>
          ))}
          <LogoutButton className="hidden md:block" />
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
                <Link href="/user/orders">Pesanan saya</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <AuthButton className="items-center justify-end w-min-[200px] hidden md:flex" />
      )}
    </div>
  );
}
