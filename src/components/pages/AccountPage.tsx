"use client";

import { useSession } from "next-auth/react";

const AccountPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="font-semibold text-2xl">{session?.user.name}</h1>
      <p className="text-sm text-gray-600">{session?.user.email}</p>
    </div>
  );
};

export default AccountPage;
