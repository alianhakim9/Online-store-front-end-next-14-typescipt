import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";
import LogoutButton from "@/app/ui/navbar/logout";
import AuthButton from "@/app/ui/navbar/auth-btn";
import { SearchProduct } from "@/app/ui/product/search";

interface Props {
  userId?: string;
}

export default function MobileSheet({ userId }: Props) {
  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger>
          <Button size="icon" className="flex md:hidden">
            <HiMenuAlt1 size={12} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col mt-5 gap-4">
            <SearchProduct />
            {userId ? (
              <>
                <Link href="/user/account">Akun Saya</Link>
                <Link href="/favourite">Produk Favorit</Link>
                <Link href="/user/orders">Pesanan Saya</Link>
                <LogoutButton isMobile />
              </>
            ) : (
              <AuthButton className="flex flex-col gap-2" />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
