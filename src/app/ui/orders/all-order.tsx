"use client";

import { Order } from "@/app/lib/definitions";
import EmptyState from "@/app/ui/empty-state";
import OrderTabs from "@/app/ui/orders/tabs";

interface Props {
  orders: Order[];
}

export default function AllOrder({ orders }: Props) {
  if (orders.length === 0) {
    return <EmptyState title="Pesanan masih kosong" mode="graphic" />;
  }
  return (
    <div className="w-full">
      <OrderTabs orders={orders} />
      {/* {orders.map((order) => (
        <p key={order.order_id}>{order.order_id}</p>
      ))} */}
    </div>
  );
}
