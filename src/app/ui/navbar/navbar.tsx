import { authOptions } from "@/app/(route)/api/auth/[...nextauth]/auth-options";
import { Brand } from "@/app/ui/navbar/brand";
import { TopNavbar } from "@/app/ui/navbar/top-navbar";
import { SearchProduct } from "@/app/ui/product/search";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const NavbarContent = dynamic(() => import("@/app/ui/navbar/navbar-content"), {
  ssr: false,
});

const MobileSheet = dynamic(() => import("@/app/ui/navbar/mobile-sheet"), {
  ssr: false,
});

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId.toString();
  return (
    <div className="bg-white border-b border-gray-200 w-full top-0 fixed z-50">
      <TopNavbar />
      <div className="container flex justify-between items-center gap-2 md:gap-5 p-5 ">
        <div className="flex md:block gap-2 md:gap-0">
          <MobileSheet userId={userId} />
          <Brand />
        </div>
        <div className="hidden md:flex w-full">
          <SearchProduct />
        </div>
        <NavbarContent session={session} />
      </div>
    </div>
  );
}
