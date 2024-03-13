import { RootState } from "@/app/lib/redux/store";
import ImageLoad from "@/app/ui/image-load";
import { useSelector } from "react-redux";

export default function EmptyCart() {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <ImageLoad
        alt="empty-cart"
        src="/images/empty-cart.png"
        className="h-80 w-80"
      />
    </div>
  );
}
