import { Input } from "@/components/ui/input";
import { Brand } from "@/app/ui/navbar/brand";
import { NavbarContent } from "@/app/ui/navbar/navbar-content";
import { TopNavbar } from "@/app/ui/navbar/top-navbar";

export function Navbar() {
  return (
    <div className="bg-white border-b border-gray-200 w-full top-0 fixed z-50">
      <TopNavbar />
      <div className="container flex justify-between items-center gap-5 p-5 ">
        <Brand />
        <Input placeholder="Cari Produk..." />
        <NavbarContent />
      </div>
    </div>
  );
}
