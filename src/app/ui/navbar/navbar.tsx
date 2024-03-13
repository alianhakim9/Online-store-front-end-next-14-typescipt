import { Brand } from "@/app/ui/navbar/brand";
import { TopNavbar } from "@/app/ui/navbar/top-navbar";
import dynamic from "next/dynamic";
import { SearchProduct } from "@/app/ui/product/search";

const NavbarContent = dynamic(() => import("@/app/ui/navbar/navbar-content"), {
  ssr: false,
});

export function Navbar() {
  return (
    <div className="bg-white border-b border-gray-200 w-full top-0 fixed z-50">
      <TopNavbar />
      <div className="container flex justify-between items-center gap-5 p-5 ">
        <Brand />
        <SearchProduct />
        <NavbarContent />
      </div>
    </div>
  );
}
