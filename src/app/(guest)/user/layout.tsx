import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="my-4 flex gap-4 min-h-[50vh]">
      <div className="flex gap-8">
        <div className="flex flex-col gap-1 min-w-[250px]">
          <Link href="/user/account">My Account</Link>
          <Link href="/user/address">Address</Link>
        </div>
        <Separator orientation="vertical" />
      </div>
      <div>{children}</div>
    </div>
  );
}
