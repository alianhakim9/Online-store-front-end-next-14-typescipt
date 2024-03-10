import PaymentPage from "@/components/pages/PaymentPage";
import { cookies } from "next/headers";

export default function Page() {
  const cookie = cookies();
  const tsToken = cookie.get("ts-token")?.value;
  return <PaymentPage tsToken={tsToken} />;
}
