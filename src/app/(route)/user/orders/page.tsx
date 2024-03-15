import { fetchOrderByUserId } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { authOptions } from "../../api/auth/[...nextauth]/auth-options";

const AllOrder = dynamic(() => import("@/app/ui/orders/all-order"), {
  ssr: false,
});

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.userId.toString();
  const orders = await fetchOrderByUserId(userId || "");
  return <AllOrder orders={orders} />;
}
