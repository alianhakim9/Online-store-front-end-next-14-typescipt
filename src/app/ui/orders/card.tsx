import { Order } from "@/app/lib/definitions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  return (
    <Card>
      <CardContent className="text-sm flex flex-col justify-center pt-4">
        <p>Order id : {order.order_id}</p>
        <p>Total : {order.total_price}</p>
      </CardContent>
    </Card>
  );
}
