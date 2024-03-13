import SidebarAccordion from "@/app/ui/sidebar-accordion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BiNotification } from "react-icons/bi";
import { IoPersonCircle } from "react-icons/io5";
import { MdEventNote } from "react-icons/md";
import { HiTicket } from "react-icons/hi2";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="my-4 flex gap-4 min-h-[50vh]">
      <div className="flex gap-8">
        <div className="flex flex-col gap-1 min-w-[250px]">
          <SidebarAccordion
            value="akun"
            trigger="Akun Saya"
            icon={<IoPersonCircle />}
          >
            <div className="flex flex-col gap-2">
              <Link href="/user/account">Profil</Link>
              <Link href="/user/address">Alamat saya</Link>
            </div>
          </SidebarAccordion>
          <SidebarAccordion
            value="notifikasi"
            trigger="Notifikasi"
            icon={<BiNotification />}
          >
            <div className="flex flex-col gap-2">
              <Link href="/user/account">Status Pesanan</Link>
              <Link href="/user/address">Promo Olshop</Link>
              <Link href="/user/address">Info Olshop</Link>
            </div>
          </SidebarAccordion>
          <div className="mt-2 flex flex-col gap-4">
            <Link
              href="/user/address"
              className="text-sm font-medium flex items-center gap-2"
            >
              <MdEventNote /> Pesanan Saya
            </Link>
            <Link
              href="/user/address"
              className="text-sm font-medium flex items-center gap-2"
            >
              <HiTicket /> Voucher Saya
            </Link>
          </div>
        </div>
        <Separator orientation="vertical" />
      </div>
      <div className="rounded-lg bg-zinc-50 p-4 w-full">{children}</div>
    </div>
  );
}
