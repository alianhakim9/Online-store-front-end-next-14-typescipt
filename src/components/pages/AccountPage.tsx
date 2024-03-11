"use client";

import { useSession } from "next-auth/react";
import { Separator } from "../ui/separator";

const AccountPage = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-col gap-2 w-full">
        <h1 className="text-2xl font-semibold">Profil Saya</h1>
        <p className="text-sm">
          Kelola informasi profil Anda untuk mengontrol, melindungi dan
          mengamankan akun
        </p>
        <Separator />
      </div>
      <h3 className="font-semibold text-1xl">{session?.user.name}</h3>
      <p className="text-sm text-gray-600">{session?.user.email}</p>
    </div>
  );
};

export default AccountPage;
